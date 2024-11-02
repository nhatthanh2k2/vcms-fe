import { createSlice } from "@reduxjs/toolkit";
import { fetchAllDefaultPackages } from "./thunk";


export const { actions: vaccinePackageActions, reducer: vaccinePackageReducer } = createSlice({
    name: 'vaccinePackage',
    initialState: {
      vaccinePackageList: [],
      loading: false,
      error: null,
    },
    reducers: {
      
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllDefaultPackages.pending, (state) => {
          state.loading = true; 
          state.error = null;  
        })
        .addCase(fetchAllDefaultPackages.fulfilled, (state, action) => {
          state.loading = false; 
          state.vaccinePackageList = action.payload; 
        })
        .addCase(fetchAllDefaultPackages.rejected, (state, action) => {
          state.loading = false; 
          state.error = action.payload; 
        });
    },
  });