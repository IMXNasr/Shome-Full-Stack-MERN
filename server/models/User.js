import mongoose from "mongoose";

const User = new mongoose.Schema({
  name: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  admin: {type: Boolean},
  date_joined: {type: Date, default: Date.now}
});

const model = mongoose.model('User', User);
export default model;