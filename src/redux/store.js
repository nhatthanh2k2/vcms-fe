import { configureStore } from "@reduxjs/toolkit";
import { vaccineReducer } from "./vaccine";
import { batchDetailReducer } from "./batchDetail";

export const store = configureStore({
    reducer: {
      vaccine: vaccineReducer,
      batchDetail: batchDetailReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
  });