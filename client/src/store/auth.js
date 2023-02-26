import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "../utils/constants";
import jwtDecode from "jwt-decode";

export const login = createAsyncThunk(
  'auth/login',
  async (body, {fulfillWithValue, rejectWithValue}) => {
    const {data} = await axios.post(`${URL}/login`, body);
    if(data.success && data.token){
      return fulfillWithValue(data.token);
    }else{
      return rejectWithValue(data.error);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (body, {fulfillWithValue, rejectWithValue, dispatch}) => {
    const {data} = await axios.post(`${URL}/register`, body);
    if(data.success){
      dispatch(login(body));
      return fulfillWithValue(data.success);
    }else{
      return rejectWithValue(data.error);
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    userInfo: localStorage.getItem('userInfo') ? jwtDecode(localStorage.getItem('userInfo')) : null
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userInfo');
      state.loading = false;
      state.error = null;
      state.userInfo = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.userInfo = null;
    });
    builder.addCase(login.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.userInfo = jwtDecode(payload);
      localStorage.setItem('userInfo', payload);
    });
    builder.addCase(login.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload;
      state.userInfo = null;
    });
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.userInfo = null;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(register.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload;
      state.userInfo = null;
    });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;