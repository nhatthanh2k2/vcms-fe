import { batchDetailService } from "@/services";
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchDetailOfSampleBatch = createAsyncThunk(
    'batchDetail/fetchDetailOfSampleBatch',
    async (_, thunkAPI) => {
      try {
        const response = await batchDetailService.getDetailOfSampleBatch();
        return response.data.result
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );