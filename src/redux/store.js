import { configureStore } from "@reduxjs/toolkit";
import { vaccineReducer } from "./vaccine";
import { batchDetailReducer } from "./batchDetail";
import { vaccinePackageReducer } from "./vaccinePackage";
import { orderReducer } from "./Order";


export const store = configureStore({
    reducer: {
      vaccine: vaccineReducer,
      batchDetail: batchDetailReducer,
      vaccinePackage: vaccinePackageReducer,
      order: orderReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
  });