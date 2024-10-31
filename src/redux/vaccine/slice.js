import { createSlice } from "@reduxjs/toolkit";
import { fetchAllVaccines } from "./thunk";

export const { actions: vaccineActions, reducer: vaccineReducer } = createSlice({
    name: 'vaccine',
    initialState: {
      vaccineList: [],
      loading: false,
      error: null,
    },
    reducers: {
      // Bạn có thể thêm các reducer tùy chỉnh ở đây nếu cần
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllVaccines.pending, (state) => {
          state.loading = true; // Bắt đầu tải dữ liệu
          state.error = null;   // Đặt lỗi về null
        })
        .addCase(fetchAllVaccines.fulfilled, (state, action) => {
          state.loading = false; // Kết thúc quá trình tải
          state.vaccineList = action.payload; // Lưu danh sách vắc xin vào state
        })
        .addCase(fetchAllVaccines.rejected, (state, action) => {
          state.loading = false; // Kết thúc quá trình tải
          state.error = action.payload; // Lưu lỗi vào state
        });
    },
  });