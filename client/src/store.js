import { configureStore } from "@reduxjs/toolkit";
import auth from "./store/auth";
import shows from "./store/show";

const store = configureStore({
  reducer: {
    auth,
    shows,
  }
});
export default store;