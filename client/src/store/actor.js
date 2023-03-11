import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../utils/constants";

export const getActors = createAsyncThunk(
  'actor/getActors',
  async () => {
    const {data} = await axios.get(`${URL}/actors`);
    return data;
  }
);

export const addActor = createAsyncThunk(
  'actor/addActor',
  async (formData) => {
    const {data} = await axios.post(`${URL}/admin/actors/add`, formData);
    return data;
  }
);

const actorSlice = createSlice({
  name: "actor",
  initialState: {
    loading: false,
    error: null,
    actors: [],
    success: null
  },
  reducers: {},
  extraReducers: builder => {
    // getActors
    builder.addCase(getActors.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.actors = null;
      state.success = null;
    });
    builder.addCase(getActors.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.actors = payload;
      state.success = null;
    });
    builder.addCase(getActors.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload;
      state.actors = [];
      state.success = null;
    });
    // addActor
    builder.addCase(addActor.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(addActor.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.success = payload.success;
    });
    builder.addCase(addActor.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload;
      state.success = null;
    });
  }
});

export default actorSlice.reducer;