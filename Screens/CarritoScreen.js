import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import CardOrden from "../Components/CardOrden";
import { colors } from "../Styles/colores";
import { MaterialIcons } from "@expo/vector-icons";
import { DB_URL } from "../Constants/auth";

const CarritoScreen = () => {
  const { carrito, cantidadCarrito } = useSelector((state) => state.add.value);

  const renderItem = (producto) => (
    <CardOrden producto={producto} cantidadCarrito={cantidadCarrito} />
  );

  return (
    <View style={styles.list}>
      <FlatList
        data={carrito}
        keyExtractor={(producto) => producto.producto.id}
        renderItem={renderItem}
        style={styles.flat}
      />
      <View style={styles.total}>
        {cantidadCarrito !== undefined ? (
          <Text style={styles.textTotal}>
            Total: $
            {800 * cantidadCarrito.id_1 +
              500 * cantidadCarrito.id_2 +
              4800 * cantidadCarrito.id_3 +
              3500 * cantidadCarrito.id_4 +
              7300 * cantidadCarrito.id_5 +
              6100 * cantidadCarrito.id_6 +
              2100 * cantidadCarrito.id_7 +
              3400 * cantidadCarrito.id_8}
          </Text>
        ) : null}
        {/* <TouchableOpacity style={styles.btnPagar} >
          <MaterialIcons name="payment" size={24} color={colors.blanco} />
          <Text style={styles.pagar}>Pagar</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};
export default CarritoScreen;

const styles = StyleSheet.create({
  list: {
    backgroundColor: colors.piel,
    height: "85%",
  },
  flat: {
    width: "100%",
    height: "85%",
  },
  total: {
    backgroundColor: colors.rojoOscuro,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingRight: 0,
  },
  btnPagar: {
    backgroundColor: colors.rojoClaro,
    height: 50,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  pagar: {
    color: colors.blanco,
    fontFamily: "Poppins500",
  },
  textTotal: {
    fontFamily: "Poppins500",
    color: colors.blanco,
    fontSize: 20,
  },
});
