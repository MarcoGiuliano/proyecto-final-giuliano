import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import LoginScreen from "./Screens/LoginScreen";
import { Provider } from "react-redux";
import store from "./Store/store";
import MainNavigator from "./Stacks";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [loaded] = useFonts({
    Poppins300: require("./assets/Fonts/Poppins-Light.otf"),
    Poppins400: require("./assets/Fonts/Poppins-Regular.otf"),
    Poppins500: require("./assets/Fonts/Poppins-Medium.otf"),
    Poppins600: require("./assets/Fonts/Poppins-SemiBold.otf"),
    PoppinsBold: require("./assets/Fonts/Poppins-Bold.otf"),
  });

  if (!loaded) {
    return <ActivityIndicator />;
  }

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <Provider store={store}>
      <MainNavigator />
    </Provider>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
