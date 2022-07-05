import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DB_URL } from "../Constants/auth";

const initialState = {
  value: {
    carrito: [],
    favoritos: [],
    cantidadCarrito: {
      id_1: "",
      id_2: "",
      id_3: "",
      id_4: "",
      id_5: "",
      id_6: "",
      id_7: "",
      id_8: "",
    },
    loading: false,
    error: "",
  },
};

export const addFavs = createAsyncThunk(
  "add/addFavoritos",
  async (data, asyncThunk) => {
    const res = await fetch(`${DB_URL}favoritos.json`, {
      method: "POST",
      body: JSON.stringify({
        producto: data.producto,
        userId: data.userId,
      }),
    });
  }
);

export const addCart = createAsyncThunk(
  "add/addCarrito",
  async (data, asyncThunk) => {
    const res = await fetch(`${DB_URL}carrito.json`, {
      method: "POST",
      body: JSON.stringify({
        producto: data.producto,
        userId: data.userId,
      }),
    });
  }
);

export const getProductosCarrito = createAsyncThunk(
  "add/getProductoCarrito",
  async (userId, asyncThunk) => {
    const res = await fetch(`${DB_URL}carrito.json`);
    const dataDb = Object.values(await res.json());
    const data = dataDb.filter((id) => id.userId === userId);
    return data;
  }
);

export const getProductosFavoritos = createAsyncThunk(
  "add/getProductoFavorito",
  async (userId, asyncThunk) => {
    const res = await fetch(`${DB_URL}favoritos.json`);
    const dataDb = Object.values(await res.json());
    const data = dataDb.filter((id) => id.userId === userId);
    return data;
  }
);

export const addSlice = createSlice({
  name: "add",
  initialState,
  reducers: {
    añadirACarrito: (state, { payload }) => {
      //   state.value.carrito = payload;
      state.value.loading = true;
      //   state.value.carrito.push(payload);
    },
  },
  extraReducers: {
    [getProductosCarrito.pending]: (state, { payload }) => {
      state.value.loading = true;
    },
    [getProductosCarrito.fulfilled]: (state, { payload }) => {
      let carritoMap = payload.map((producto) => {
        return [JSON.stringify(producto), producto];
      });
      let carritoMapArr = new Map(carritoMap);

      let unicos = [...carritoMapArr.values()];

      let id1 = [];
      let id2 = [];
      let id3 = [];
      let id4 = [];
      let id5 = [];
      let id6 = [];
      let id7 = [];
      let id8 = [];

      payload.forEach((dbData) => {
        if (dbData.producto.id === 1) {
          id1.push(dbData.producto);
        } else if (dbData.producto.id === 2) {
          id2.push(dbData.producto);
        } else if (dbData.producto.id === 3) {
          id3.push(dbData.producto);
        } else if (dbData.producto.id === 4) {
          id4.push(dbData.producto);
        } else if (dbData.producto.id === 5) {
          id5.push(dbData.producto);
        } else if (dbData.producto.id === 6) {
          id6.push(dbData.producto);
        } else if (dbData.producto.id === 7) {
          id7.push(dbData.producto);
        } else if (dbData.producto.id === 8) {
          id8.push(dbData.producto);
        }
      });

      state.value.cantidadCarrito.id_1 = id1.length;
      state.value.cantidadCarrito.id_2 = id2.length;
      state.value.cantidadCarrito.id_3 = id3.length;
      state.value.cantidadCarrito.id_4 = id4.length;
      state.value.cantidadCarrito.id_5 = id5.length;
      state.value.cantidadCarrito.id_6 = id6.length;
      state.value.cantidadCarrito.id_7 = id7.length;
      state.value.cantidadCarrito.id_8 = id8.length;
      state.value.carrito = unicos;
    },
    [getProductosCarrito.rejected]: (state, { payload }) => {},
    [getProductosFavoritos.pending]: (state, { payload }) => {
      state.value.loading = true;
    },
    [getProductosFavoritos.fulfilled]: (state, { payload }) => {
      let favoritosMap = payload.map((producto) => {
        return [JSON.stringify(producto), producto];
      });
      let favoritosMapArr = new Map(favoritosMap);
      let unicos = [...favoritosMapArr.values()];

      state.value.favoritos = unicos;
    },
    [getProductosFavoritos.rejected]: (state, { payload }) => {},
  },
});

export const { añadirACarrito } = addSlice.actions;
export default addSlice.reducer;
