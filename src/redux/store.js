import { configureStore } from "@reduxjs/toolkit";
import { vaccineReducer } from "./vaccine";
import { batchDetailReducer } from "./batchDetail";
import { vaccinePackageReducer } from "./vaccinePackage";


export const store = configureStore({
    reducer: {
      vaccine: vaccineReducer,
      batchDetail: batchDetailReducer,
      vaccinePackage: vaccinePackageReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
  });