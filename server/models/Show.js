import mongoose from "mongoose";

const Show = new mongoose.Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  genres: {type: Array},
  description: {type: String},
  released_date: {type: Date},
  rating: {type: Number, default: 0},
  num_episodes: {type: Number},
  trailer_link: {type: String},
  runtime: {type: Number},
  country: {type: String},
  image: {type: String},
  featured: {type: Boolean},
  cover: {type: String},
  date_added: {type: Date, default: Date.now},
});

const model = mongoose.model('Show', Show);
export default model;