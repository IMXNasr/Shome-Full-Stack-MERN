import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../utils/constants";

export const addActing = createAsyncThunk(
  'act/addActing',
  async (body, {fulfillWithValue, rejectWithValue}) => {
    const {data} = await axios.post(`${URL}/admin/acting`, body);
    if(data.success){
      console.log(data.success);
      return fulfillWithValue(data);
    }else{
      return rejectWithValue(data);
    }
  }
);

export const getActingForShow = createAsyncThunk(
  'act/getActingForShow',
  async (id) => {
    const {data} = await axios.get(`${URL}/admin/acting/${id}?for=show`);
    return data;
  }
);

export const getActingForActor = createAsyncThunk(
  'act/getActingForActor',
  async (id) => {
    const {data} = await axios.get(`${URL}/admin/acting/${id}?for=actor`);
    return data;
  }
);

const actSlice = createSlice({
  name: "act",
  initialState: {
    loading: false,
    error: null,
    success: null,
    acts: []
  },
  reducers: {},
  extraReducers: builder => {
    // addActing
    builder.addCase(addActing.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(addActing.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.success = payload.success;
    });
    builder.addCase(addActing.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload.error;
      state.success = null;
    });
    // getActingForShow
    builder.addCase(getActingForShow.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
      state.acts = [];
    });
    builder.addCase(getActingForShow.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.success = null;
      state.acts = payload;
    });
    builder.addCase(getActingForShow.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload;
      state.success = null;
      state.acts = null;
    });
    // getActingForActor
    builder.addCase(getActingForActor.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
      state.acts = [];
    });
    builder.addCase(getActingForActor.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.success = null;
      state.acts = payload;
    });
    builder.addCase(getActingForActor.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload;
      state.success = null;
      state.acts = null;
    });
  }
});

export default actSlice.reducer;