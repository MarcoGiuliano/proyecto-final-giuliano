import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import CardOrden from "../Components/CardOrden";
import { colors } from "../Styles/colores";

const FavoritosScreen = () => {
  const { favoritos } = useSelector((state) => state.add.value);

  const renderItem = (producto) => <CardOrden producto={producto} />;

  return (
    <View style={styles.list}>
      <FlatList
        data={favoritos}
        keyExtractor={(producto) => producto.producto.id}
        renderItem={renderItem}
        style={styles.flat}
      />
    </View>
  );
};
export default FavoritosScreen;

const styles = StyleSheet.create({
  list: {
    backgroundColor: colors.piel,
  },
  flat: {
    width: "100%",
    height: "85%",
  },
});
