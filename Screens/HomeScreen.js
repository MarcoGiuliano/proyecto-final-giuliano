import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import CardProducto from "../Components/CardProducto";
import { PRODUCTOS } from "../Data/productos";
import { colors } from "../Styles/colores";

const HomeScreen = () => {
  const renderItem = (productos) => <CardProducto productos={productos} />;

  return (
    <View style={styles.list}>
      <FlatList
        numColumns={1}
        data={PRODUCTOS}
        keyExtractor={(producto) => producto.id}
        renderItem={renderItem}
        style={styles.flat}
        // columnWrapperStyle={{ flex: 1, justifyContent: "space-around" }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: colors.piel,
  },
  flat: {
    width: "100%",
    padding: 30,
  },
});
