import { fetchOrderDetailList } from "./thunk";
import { createSlice } from "@reduxjs/toolkit";

export const { actions: orderActions, reducer: orderReducer } = createSlice({
    name: 'order',
    initialState: {
      orderDetailList: [],
      loading: false,
      error: null,
    },
    reducers: {
      
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchOrderDetailList.pending, (state) => {
          state.loading = true; 
          state.error = null;  
        })
        .addCase(fetchOrderDetailList.fulfilled, (state, action) => {
          state.loading = false; 
          state.orderDetailList = action.payload; 
        })
        .addCase(fetchOrderDetailList.rejected, (state, action) => {
          state.loading = false; 
          state.error = action.payload; 
        })
    },
  });