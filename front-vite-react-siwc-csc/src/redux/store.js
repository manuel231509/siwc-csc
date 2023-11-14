import { configureStore } from "@reduxjs/toolkit";
import sessionSliceReducer from "./states/ssessionSlice";
import { logger } from "./middlewares/middlewares";
import thunk from "redux-thunk";

const StoreRedux = configureStore({
  reducer: {
    ssession: sessionSliceReducer,
  },
  middleware: [thunk, logger],
  devTools: process.env.NODE_ENV !== "production",
});

export default StoreRedux;
