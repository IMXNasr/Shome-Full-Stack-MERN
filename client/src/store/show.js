import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "../utils/constants";

export const getShows = createAsyncThunk(
  'show/getShows',
  async (type) => {
    const {data} = await axios.get(`${URL}/shows?type=${type}`);
    return data;
  }
);

export const getFeaturedShows = createAsyncThunk(
  'show/getFeaturedShows',
  async () => {
    const {data} = await axios.get(`${URL}/shows?featured=true`);
    return data;
  }
);

export const getOneShow = createAsyncThunk(
  'show/getOneShow',
  async (id, {fulfillWithValue, rejectWithValue}) => {
    const {data} = await axios.get(`${URL}/show/${id}`);
    if(data.success){
      return fulfillWithValue(data);
    }else{
      return rejectWithValue(data.error);
    }
  }
)

export const addShow = createAsyncThunk(
  'show/addShow',
  async (formData) => {
    const {data} = await axios.post(`${URL}/admin/add-show`, formData);
    return data;
  }
);

const showSlice = createSlice({
  name: "show",
  initialState: {
    loading: false,
    error: null,
    shows: [],
    show: {},
    success: null,
  },
  reducers: {

  },
  extraReducers: builder => {
    //  getShows
    builder.addCase(getShows.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.shows = [];
    });
    builder.addCase(getShows.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.shows = payload;
    });
    builder.addCase(getShows.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload;
      state.shows = [];
    });
    //  getFeaturedShows
    builder.addCase(getFeaturedShows.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.shows = [];
    });
    builder.addCase(getFeaturedShows.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.shows = payload;
    });
    builder.addCase(getFeaturedShows.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload;
      state.shows = [];
    });
    // addShow
    builder.addCase(addShow.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(addShow.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.success = payload.success;
    });
    builder.addCase(addShow.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload;
      state.success = null;
    });
    // getOneShow
    builder.addCase(getOneShow.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.show = null;
      state.success = null;
    });
    builder.addCase(getOneShow.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.show = payload.show;
      state.success = payload.success;
    });
    builder.addCase(getOneShow.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload;
      state.show = null;
      state.success = null;
    });
  }
});

export default showSlice.reducer;