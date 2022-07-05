import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";

const Stack = createNativeStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registro" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default Auth;
