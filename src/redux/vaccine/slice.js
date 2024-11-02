import { createSlice } from "@reduxjs/toolkit";
import { fetchAllVaccines, fetchAllVaccinesOfDisease } from "./thunk";

export const { actions: vaccineActions, reducer: vaccineReducer } = createSlice({
    name: 'vaccine',
    initialState: {
      vaccineList: [],
      vaccineOfDiseaseList: [],
      loading: false,
      error: null,
    },
    reducers: {
      
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllVaccines.pending, (state) => {
          state.loading = true; 
          state.error = null;  
        })
        .addCase(fetchAllVaccines.fulfilled, (state, action) => {
          state.loading = false; 
          state.vaccineList = action.payload; 
        })
        .addCase(fetchAllVaccines.rejected, (state, action) => {
          state.loading = false; 
          state.error = action.payload; 
        })
        .addCase(fetchAllVaccinesOfDisease.pending, (state) => {
          state.loading = true; 
          state.error = null;  
        })
        .addCase(fetchAllVaccinesOfDisease.fulfilled, (state, action) => {
          state.loading = false; 
          state.vaccineOfDiseaseList = action.payload;
        })
        .addCase(fetchAllVaccinesOfDisease.rejected, (state, action) => {
          state.loading = false; 
          state.error = action.payload; 
        });
    },
  });