import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../Styles/colores";
import { AntDesign } from "@expo/vector-icons";

const CardOrden = ({ producto, cantidadCarrito }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerCard}>
        <Image
          style={styles.image}
          source={{ uri: producto.item.producto.image }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.nombreProducto}>
            {producto.item.producto.nombre}
          </Text>
          <Text style={styles.nombreCategoria}>
            {producto.item.producto.categoria}
          </Text>
          <Text style={styles.nombreDescripcion}>
            {producto.item.producto.descripcion}
          </Text>
          <Text style={styles.textPrecio}>
            ${producto.item.producto.precio}
          </Text>
          {cantidadCarrito !== undefined ? (
            <Text style={styles.textPrecio}>
              Cantidad:{" "}
              {producto.item.producto.id === 1
                ? cantidadCarrito.id_1
                : producto.item.producto.id === 2
                ? cantidadCarrito.id_2
                : producto.item.producto.id === 3
                ? cantidadCarrito.id_3
                : producto.item.producto.id === 4
                ? cantidadCarrito.id_4
                : producto.item.producto.id === 5
                ? cantidadCarrito.id_5
                : producto.item.producto.id === 6
                ? cantidadCarrito.id_6
                : producto.item.producto.id === 7
                ? cantidadCarrito.id_7
                : cantidadCarrito.id_8}
            </Text>
          ) : null}
        </View>
        <View style={styles.containerIconEliminar}>
          <AntDesign name="delete" size={24} color={colors.rojoOscuro} />
        </View>
      </View>
    </View>
  );
};

export default CardOrden;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerCard: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    backgroundColor: colors.blanco,
    borderRadius: 10,
    marginTop: 20,
    width: "90%",
    marginLeft: 10,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  nombreProducto: {
    color: "#000",
    fontFamily: "PoppinsBold",
    fontSize: 15,
    marginTop: 10,
  },
  nombreCategoria: {
    color: "grey",
    fontFamily: "PoppinsBold",
  },
  nombreDescripcion: {
    color: "grey",
    fontFamily: "Poppins400",
    width: "50%",
  },
  textPrecio: {
    fontFamily: "PoppinsBold",
    color: colors.marronClaro,
  },
  containerIconEliminar: {
    alignItems: "center",
    justifyContent: "center",
  },
});
