import { createSlice } from "@reduxjs/toolkit";
import { fetchDetailOfSampleBatch } from "./thunk";


export const { actions: batchDetailActions, reducer: batchDetailReducer } = createSlice({
    name: 'batchDetail',
    initialState: {
      batchDetailList: [],
      loading: false,
      error: null,
    },
    reducers: {

    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchDetailOfSampleBatch.pending, (state) => {
          state.loading = true; 
          state.error = null;  
        })
        .addCase(fetchDetailOfSampleBatch.fulfilled, (state, action) => {
          state.loading = false; 
          state.batchDetailList = action.payload;
        })
        .addCase(fetchDetailOfSampleBatch.rejected, (state, action) => {
          state.loading = false; 
          state.error = action.payload;
        });
    },
  });