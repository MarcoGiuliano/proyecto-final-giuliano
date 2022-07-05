import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL_LOGIN, URL_REGISTRO } from "../Constants/auth";

const initialState = {
  value: {
    user: {
      userId: "",
      email: "",
      token: "",
    },
    loading: false,
    error: "",
  },
};

export const registro = createAsyncThunk(
  "auth/registro",
  async (emailAndPassword, asyncThunk) => {
    try {
      const res = await fetch(`${URL_REGISTRO}`, {
        method: "POST",
        body: JSON.stringify({
          email: emailAndPassword.email,
          password: emailAndPassword.password,
          returnSecureToken: true,
        }),
      });
      const data = await res.json();
      return data;
    } catch (e) {
      return rejectWithValue("Error");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (emailAndPassword, asyncThunk) => {
    console.log("login", emailAndPassword);
    try {
      const res = await fetch(`${URL_LOGIN}`, {
        method: "POST",
        body: JSON.stringify({
          email: emailAndPassword.email,
          password: emailAndPassword.password,
          returnSecureToken: true,
        }),
      });
      const data = await res.json();
      return data;
    } catch (e) {
      return rejectWithValue("Error");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, _) => {
      state.value = initialState.value;
    },
  },
  extraReducers: {
    [registro.pending]: (state, { payload }) => {
      state.value.loading = true;
    },
    [registro.fulfilled]: (state, { payload }) => {
      if (payload.error) {
        state.value.error = payload.error.message;
      }
      state.value.loading = false;
      state.value.user.userId = payload.localId;
      state.value.user.email = payload.email;
      state.value.user.token = payload.idToken;
    },
    [registro.rejected]: (state, { payload }) => {
      state.value.loading = false;
      state.value.error = "Error al registrarse";
    },
    [login.pending]: (state) => {
      state.value.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      if (payload.error) {
        state.value.error = payload.error.message;
      }
      state.value.loading = false;
      state.value.user.userId = payload.localId;
      state.value.user.email = payload.email;
      state.value.user.token = payload.idToken;
    },
    [login.rejected]: (state, { payload }) => {
      state.value.loading = false;
      state.value.error = "Error al loguearse";
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
