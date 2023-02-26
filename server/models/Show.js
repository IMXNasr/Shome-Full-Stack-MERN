import mongoose from "mongoose";

const Show = new mongoose.Schema({
  name: {type: String, required: true},
  rating: {type: Number, default: 0},
  type: {type: String, required: true},
  categories: {type: Array},
  date_added: {type: Date, default: Date.now},
  image: {type: String},
  cover: {type: String},
  description: {type: String},
  released_date: {type: Date},
  actors: {type: mongoose.Schema.Types.ObjectId, ref: 'Actor'},
  num_episodes: {type: Number},
  trailer_link: {type: String},
  runtime: {type: Number},
  country: {type: String},
  featured: {type: Boolean}
});

const model = mongoose.model('Show', Show);
export default model;