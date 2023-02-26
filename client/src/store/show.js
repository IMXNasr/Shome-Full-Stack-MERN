import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "../utils/constants";

export const getAllShows = createAsyncThunk(
  'show/getAllShows',
  async () => {
    const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return data;
  }
);

export const addShow = createAsyncThunk(
  'show/addShow',
  async (formData) => {
    const {data} = await axios.post(`${URL}/admin/add-show`, formData);
    return data;
  }
)

const showSlice = createSlice({
  name: "show",
  initialState: {
    loading: false,
    error: null,
    shows: [],
    success: null,
  },
  reducers: {

  },
  extraReducers: builder => {
    builder.addCase(getAllShows.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.shows = [];
    });
    builder.addCase(getAllShows.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.shows = payload;
    });
    builder.addCase(getAllShows.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload;
      state.shows = [];
    });
    builder.addCase(addShow.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.success = null;
    });
    builder.addCase(addShow.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = false;
      state.success = payload.success;
    });
    builder.addCase(addShow.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload;
      state.success = null;
    });
  }
});

export default showSlice.reducer;