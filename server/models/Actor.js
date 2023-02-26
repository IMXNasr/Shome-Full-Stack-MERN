import mongoose from "mongoose";

const Actor = new mongoose.Schema({
  name: {type: String, required: true},
  photo: {type: String},
  movies: {type: mongoose.Schema.Types.ObjectId, ref: 'Show'}
});

const model = mongoose.model('Actor', Actor);
export default model;