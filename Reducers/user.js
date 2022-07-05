import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DB_URL } from "../Constants/auth";

const initialState = {
  value: {
    dataUser: {
      userId: "",
      direccion: "",
      imagen: "",
    },
    loading: false,
    error: "",
  },
};

export const getDataUser = createAsyncThunk(
  "user/dataUser",
  async (userId, asyncThunk) => {
    const res = await fetch(`${DB_URL}usuarios.json`);
    const dataDb = Object.values(await res.json());
    const data = dataDb.filter((id) => id.userId === userId);
    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [getDataUser.pending]: (state, { payload }) => {
      state.value.loading = true;
    },
    [getDataUser.fulfilled]: (state, { payload }) => {
      state.value.loading = false;
      let imgPerfil;
      let direccionDb;
      payload.map((item) => {
        item.imagenPerfil !== undefined
          ? (imgPerfil = item.imagenPerfil)
          : imgPerfil;
        item.direccion !== undefined
          ? (direccionDb = item.direccion)
          : direccionDb;
        // state.value.user.imagen =
        //   item.imagenPerfil !== undefined ? item.imagenPerfil : null;
        state.value.dataUser.userId = item.userId;
      });
      state.value.dataUser.imagen = imgPerfil;
      state.value.dataUser.direccion = direccionDb;
      //   state.value.loading = false;
      //   state.value.user.userId = payload.localId;
      //   state.value.user.email = payload.email;
      //   state.value.user.token = payload.idToken;
    },
    [getDataUser.rejected]: (state, { payload }) => {
      //   state.value.error = payload.error;
    },
  },
});

export default userSlice.reducer;
