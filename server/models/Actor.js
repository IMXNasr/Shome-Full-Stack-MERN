import mongoose from "mongoose";

const Actor = new mongoose.Schema({
  name: {type: String, required: true},
  gender: {type: String},
  biography: {type: String},
  birthday: {type: Date},
  place_of_birth: {type: String},
  photo: {type: String},
  date_added: {type: Date, default: Date.now}
});

const model = mongoose.model('Actor', Actor);
export default model;