import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import User from './models/User.js';
import { sha1 } from './utils/functions.js';
import jwtEncode from 'jwt-encode';
import formidable from 'formidable';
import fs from 'fs-extra';

const app = express();
app.use('/uploads/show', express.static('./uploads/show'));
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

app.post('/admin/add-show', (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    moveFile(files.image.filepath, './uploads/show/' + Date.now() + '_' + files.image.originalFilename);
    return res.json({"success": "Added successfully !!"});
  });
});

const PORT = 8000

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));