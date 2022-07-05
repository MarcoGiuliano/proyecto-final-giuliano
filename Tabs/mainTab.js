import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";
import CarritoScreen from "../Screens/CarritoScreen";
import PerfilScreen from "../Screens/PerfilScreen";
import FavoritosScreen from "../Screens/FavoritosScreen";
import UbicacionScreen from "../Screens/UbicacionScreen";
import { useDispatch, useSelector } from "react-redux";
import { getDataUser } from "../Reducers/user";
import { Feather } from "@expo/vector-icons";
import { colors } from "../Styles/colores";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const BottomTabs = createBottomTabNavigator();

const MainTab = () => {
  const { user } = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataUser(user.userId));
  }, []);

  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <BottomTabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.item}>
                <Feather name="home" size={24} color={colors.rojoOscuro} />
                <Text style={styles.text}>Home</Text>
              </View>
            );
          },
        }}
      />
      <BottomTabs.Screen
        name="Carrito"
        component={CarritoScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.item}>
                <Feather
                  name="shopping-cart"
                  size={24}
                  color={colors.rojoOscuro}
                />
                <Text style={styles.text}>Carrito</Text>
              </View>
            );
          },
        }}
      />
      <BottomTabs.Screen
        name="Favoritos"
        component={FavoritosScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.item}>
                <Octicons name="heart" size={24} color={colors.rojoOscuro} />
                <Text style={styles.text}>Favs</Text>
              </View>
            );
          },
        }}
      />
      <BottomTabs.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.item}>
                <AntDesign name="user" size={24} color={colors.rojoOscuro} />
                <Text style={styles.text}>Perfil</Text>
              </View>
            );
          },
        }}
      />
      <BottomTabs.Screen
        name="Ubicacion"
        component={UbicacionScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.item}>
                <Ionicons
                  name="location-outline"
                  size={24}
                  color={colors.rojoOscuro}
                />
                <Text style={styles.text}>Ubicacion</Text>
              </View>
            );
          },
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default MainTab;

const styles = StyleSheet.create({
  tabBar: {
    // shadowColor: colors .shadowTab,
    // shadowOffset: { width: 0, height: 10 },
    // shadowOpacity: 0.25,
    // shadowRadius: 0.25,
    elevation: 15,
    position: "absolute",
    height: 80,
    width: "100%",
  },
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.rojoOscuro,
    fontFamily: "PoppinsBold",
    fontSize: 12,
  },
});
