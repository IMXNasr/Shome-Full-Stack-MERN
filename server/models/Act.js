import mongoose from "mongoose";

const Act = new mongoose.Schema({
  actor: {type: mongoose.Schema.Types.ObjectId, ref: 'Actor', required: true},
  show: {type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true},
  act_as: {type: String},
});

const model = mongoose.model('Act', Act);
export default model;