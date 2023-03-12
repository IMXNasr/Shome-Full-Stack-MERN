import { configureStore } from "@reduxjs/toolkit";
import auth from "./store/auth";
import shows from "./store/show";
import actors from "./store/actor";
import act from "./store/act";

const store = configureStore({
  reducer: {
    auth,
    shows,
    actors,
    act
  }
});
export default store;