import { configureStore } from "@reduxjs/toolkit";
import auth from "./store/auth";
import shows from "./store/show";
import actors from "./store/actor";

const store = configureStore({
  reducer: {
    auth,
    shows,
    actors
  }
});
export default store;