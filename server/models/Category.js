import mongoose from "mongoose";

const Category = new mongoose.Schema({
  name: {type: String, unique: true, required: true},
  date_added: {type: Date, default: Date.now},
  movies: {type: mongoose.Schema.Types.ObjectId, ref: 'Show'}
});

const model = mongoose.model('Category', Category);
export default model;