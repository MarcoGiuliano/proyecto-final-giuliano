import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../Styles/colores";
import { Octicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addCart,
  addFavs,
  añadirACarrito,
  getProductosCarrito,
  getProductosFavoritos,
} from "../Reducers/add";

const CardProducto = ({ productos }) => {
  const { user } = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();
  const [statecarrito, setstatecarrito] = useState(false);
  const [statefavoritos, setstatefavoritos] = useState(false);

  const añadirFavoritos = (data) => {
    setstatefavoritos(!statefavoritos);
    dispatch(addFavs({ producto: data, userId: user.userId }));
  };

  useEffect(() => {
    dispatch(getProductosFavoritos(user.userId));
  }, [statefavoritos]);

  const añadirCarrito = (data) => {
    setstatecarrito(!statecarrito);
    dispatch(addCart({ producto: data, userId: user.userId }));
    // dispatch(añadirACarrito({ producto: data }));
  };

  useEffect(() => {
    dispatch(getProductosCarrito(user.userId));
  }, [statecarrito]);

  return (
    <View style={styles.cardProducto}>
      <Image style={styles.image} source={{ uri: productos.item.image }} />
      <View style={styles.containerBottomCard}>
        <Text style={styles.nombreProducto}>{productos.item.nombre}</Text>
        <Text style={styles.nombreCategoria}>{productos.item.categoria}</Text>
        <Text style={styles.nombreDescripcion}>
          {productos.item.descripcion}
        </Text>
        <View style={styles.containerPrecioCarrito}>
          <View>
            <Text style={styles.textPrecio}>${productos.item.precio}</Text>
          </View>
          <View style={styles.containerFavCart}>
            <TouchableOpacity onPress={() => añadirFavoritos(productos.item)}>
              <Octicons
                name="heart"
                size={24}
                color={colors.rojoOscuro}
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => añadirCarrito(productos.item)}>
              <Feather
                name="shopping-cart"
                size={24}
                color={colors.rojoOscuro}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardProducto;

const styles = StyleSheet.create({
  cardProducto: {
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.blanco,
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: 130,
    borderWidth: 2,
    borderRadius: 10,
    resizeMode: "contain",
  },
  containerBottomCard: {
    width: "100%",
  },
  containerFavCart: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  nombreProducto: {
    color: "#000",
    fontFamily: "PoppinsBold",
    fontSize: 20,
    marginTop: 10,
  },
  nombreCategoria: {
    color: "grey",
    fontFamily: "PoppinsBold",
  },
  nombreDescripcion: {
    color: "grey",
    fontFamily: "Poppins400",
  },
  containerPrecioCarrito: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textPrecio: {
    fontFamily: "PoppinsBold",
    color: colors.marronClaro,
  },
});
