import { createAsyncThunk } from "@reduxjs/toolkit"
import { vaccineService } from "@/services";

export const fetchAllVaccines = createAsyncThunk(
    'vaccine/fetchAllVaccines',
    async (_, thunkAPI) => {
      try {
        const response = await vaccineService.getAllVaccines();
        return response.data.result
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

export const fetchAllVaccinesOfDisease = createAsyncThunk(
  'vaccine/fetchAllVaccinesOfDisease',
  async (diseaseId, thunkAPI) => {
    try {
      const response = await vaccineService.getVaccinesOfDisease(diseaseId);
      return response.data.result
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

