import { configureStore } from "@reduxjs/toolkit";
import hackathonsReducer from "./hackathonsSlice";

const store = configureStore({
  reducer: {
    hackathons: hackathonsReducer,
  },
});

export default store;
