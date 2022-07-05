import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../Styles/colores";
import CardAuth from "../Components/CardAuth";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { registro } from "../Reducers/auth";

const RegisterScreen = ({ navigation }) => {
  const [passwordValue, setpasswordValue] = useState("");
  const [correoValue, setcorreoValue] = useState("");

  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(registro({ email: correoValue, password: passwordValue }));
  };

  const { error } = useSelector((state) => state.auth.value);

  const navigationRegistro = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerCard}>
        <Text style={styles.textWelcome}>Registrate!</Text>
        <Text style={styles.textSubtitle}>
          Ingresa tus datos personales y registrate en la app.
        </Text>
        <CardAuth>
          <View>
            <Text style={styles.textLabels}>Correo</Text>
            <TextInput
              value={correoValue}
              style={styles.inputs}
              placeholder="escriba aqui su correo electronico ..."
              placeholderTextColor={colors.marronClaro}
              onChangeText={setcorreoValue}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.textLabels} s>
              Contraseña
            </Text>
            <TextInput
              value={passwordValue}
              style={styles.inputs}
              placeholder="escriba aqui su contraseña ..."
              placeholderTextColor={colors.marronClaro}
              onChangeText={setpasswordValue}
              secureTextEntry={true}
            />
            {error !== "" ? (
              <Text style={styles.textError2}>
                Correo o contraseña incorrecta.
              </Text>
            ) : null}
            <View style={styles.containerButton}>
              <TouchableOpacity
                onPress={handleLogin}
                style={styles.buttonLogin}
              >
                <Text style={styles.textButton}>REGISTRATE</Text>
                <FontAwesome name="long-arrow-right" size={18} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </CardAuth>
        <View style={styles.containerRegistrate}>
          <Text style={styles.textRegistrate}>¿Ya tenes una cuenta?</Text>
          <TouchableOpacity onPress={navigationRegistro}>
            <Text style={styles.textRegistrate}>Ingresá</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: colors.rojoOscuro,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  containerCard: {
    width: "90%",
  },
  textWelcome: {
    fontFamily: "Poppins500",
    color: colors.blanco,
    fontSize: 50,
  },
  textSubtitle: {
    fontFamily: "Poppins300",
    color: colors.blanco,
    marginTop: -20,
    fontSize: 15,
  },
  textLabels: {
    fontFamily: "Poppins500",
    color: colors.blanco,
  },
  inputs: {
    borderColor: colors.marronClaro,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    fontSize: 20,
    color: colors.blanco,
  },
  containerButton: {
    alignItems: "flex-end",
  },
  buttonLogin: {
    backgroundColor: colors.rojoClaro,
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    borderRadius: 12,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 10,
    padding: 10,
    marginRight: -20,
  },
  textButton: {
    fontFamily: "Poppins500",
    color: colors.blanco,
    fontSize: 12,
    marginRight: 10,
  },
  containerRegistrate: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  textRegistrate: {
    fontFamily: "Poppins400",
    color: colors.blanco,
    fontSize: 16,
    marginRight: 10,
  },
});
