import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import User from './models/User.js';
import Show from './models/Show.js';
import { sha1 } from './utils/functions.js';
import jwtEncode from 'jwt-encode';
import formidable from 'formidable';
import fs from 'fs-extra';

export const app = express();
app.use('/uploads/show', express.static('./uploads/show'));
app.use('/uploads/cover', express.static('./uploads/cover'));
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/shome");

app.get('/', async (req, res) => {
  const allUsers = await User.find({});
  return res.json(allUsers);
});

app.post('/register', async (req, res) => {
  const user = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: sha1(req.body.password),
    admin: false
  };
  const checkUsername = await User.findOne({username: user.username});
  const checkEmail = await User.findOne({email: user.email});
  if(checkUsername){
    return res.json({"error": "There's a User with the same username"});
  }
  if(checkEmail){
    return res.json({"error": "There's a User with the same email"});
  }
  await User.create(user);
  return res.json({"success": "User created successfully !!"});
});

app.post('/login', async (req, res) => {
  const user = {
    email: req.body.email,
    password: sha1(req.body.password)
  };
  const checkEmail = await User.findOne({email: user.email});
  if(!checkEmail){
    return res.json({"error": "There's no user with this email"})
  }
  if (checkEmail.password === user.password){
    const token = jwtEncode(checkEmail, 'secret');
    return res.json({"success": "Logged !!", "token": token});
  }else{
    return res.json({"error": "Password wrong !!"})
  }
});

const moveFile = (oldPath, newPath) => {
  fs.move(oldPath, newPath)
}

app.get('/shows', async (req, res) => {
  let allShows;
  if(req.query.featured){
    allShows = await Show.find({featured: true}).sort({date_added: -1});
  }else if(req.query.type){
    if(req.query.type === 'all'){
      allShows = await Show.find({}).sort({date_added: -1});
    }else{
      allShows = await Show.find({type: req.query.type}).sort({date_added: -1});
    }
  }else{
    allShows = await Show.find({}).sort({date_added: -1});
  }
  return res.json(allShows);
});

// getOneShow
app.get('/show/:id', async (req, res) => {
  const oneShow = await Show.findOne({_id: req.params.id, type: req.query.type});
  if(oneShow){
    return res.json({"success": "Fetched Successfully !!", "show": oneShow});
  }else{
    return res.json({"error": "Can't find this show !!"});
  }
});

app.post('/admin/add-show', (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    const newImageName = Date.now() + '_' + files.image.originalFilename;
    const newCoverName = files.cover && Date.now() + '_' + files.cover.originalFilename;
    moveFile(files.image.filepath, './uploads/show/' + newImageName);
    if(files.cover){
      moveFile(files.cover.filepath, './uploads/cover/' + newCoverName);
    }
    const newShow = {
      name: fields.name,
      type: fields.type,
      genres: fields.genres.split(','),
      description: fields.description,
      released_date:fields.released_date === 'undefined' ? undefined : fields.released_date,
      rating: Number(fields.rating),
      num_episodes: Number(fields.num_episodes),
      runtime: Number(fields.runtime),
      trailer_link: fields.trailer_link,
      country: fields.country,
      image: newImageName,
      cover: newCoverName,
      featured: fields.featured === 'true' ? true : false,
    };
    await Show.create(newShow);
    return res.json({"success": "Added successfully !!"});
  });
});

const PORT = 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));