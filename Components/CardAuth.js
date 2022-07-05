import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../Styles/colores";

const CardAuth = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default CardAuth;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.marron,
    padding: 20,
    paddingBottom: 0,
    borderRadius: 10,
    marginTop: 10,
  },
});
