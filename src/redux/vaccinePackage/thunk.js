import { vaccinePackageService } from "@/services";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchAllDefaultPackages = createAsyncThunk(
    'vaccinePackage/fetchAllDefaultPackages',
    async (_, thunkAPI) => {
      try {
        const response = await vaccinePackageService.getDefaultPackages();
        return response.data.result
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );