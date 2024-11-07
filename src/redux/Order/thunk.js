import { orderService } from "@/services";
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchOrderDetailList = createAsyncThunk(
    'order/fetchOrderDetailList',
    async (orderId, thunkAPI) => {
      try {
        const response = await orderService.getAllOrderDetailByOrderId(orderId);
        return response.data.result
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );