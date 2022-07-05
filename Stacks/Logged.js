import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/HomeScreen";
import CarritoScreen from "../Screens/CarritoScreen";
import FavoritosScreen from "../Screens/FavoritosScreen";
import PerfilScreen from "../Screens/PerfilScreen";
import UbicacionScreen from "../Screens/UbicacionScreen";

const Stack = createNativeStackNavigator();

const Logged = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Carrito" component={CarritoScreen} />
      <Stack.Screen name="Favoritos" component={FavoritosScreen} />
      <Stack.Screen name="Perfil" component={PerfilScreen} />
      <Stack.Screen name="Ubicacion" component={UbicacionScreen} />
    </Stack.Navigator>
  );
};

export default Logged;
