import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { colors } from "../Styles/colores";
import { DB_URL } from "../Constants/auth";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Reducers/auth";

const PerfilScreen = ({ navigation, route }) => {
  const [imagePerfil, setimagePerfil] = useState("");
  const { params } = route;

  const { user } = useSelector((state) => state.auth.value);
  const { dataUser } = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const getPermission = async () => {
    const { status } = await ImagePicker.getCameraPermissionsAsync();

    console.log(status);
    if (status !== "granted") {
      return false;
    }
    return true;
  };

  const editarFoto = async () => {
    const isVerified = getPermission();
    if (!isVerified) {
      return;
    }

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    setimagePerfil(image.uri);

    const res = await fetch(`${DB_URL}usuarios.json`, {
      method: "POST",
      body: JSON.stringify({
        imagenPerfil: image.uri,
        userId: user.userId,
      }),
    });
  };

  const editarUbicacion = () => {
    navigation.navigate("Ubicacion");
  };

  const salir = () => {
    dispatch(logout());
  };

  console.log("data user dirreccion", dataUser.direccion);

  return (
    <View style={styles.container}>
      {imagePerfil !== "" ? (
        <Image style={styles.image} source={{ uri: imagePerfil }} />
      ) : dataUser.imagen !== undefined ? (
        <Image style={styles.image} source={{ uri: dataUser?.imagen }} />
      ) : (
        <Image style={styles.image} source={require("../assets/avatar.jpg")} />
      )}
      <Text style={styles.textNombre}>{user.email}</Text>
      {params ? (
        <Text style={styles.textUbicacion}>{params.direccion}</Text>
      ) : dataUser.direccion !== undefined ? (
        <Text style={styles.textUbicacion}>{dataUser.direccion}</Text>
      ) : (
        <Text style={styles.textUbicacion}>Direccion</Text>
      )}
      <View style={styles.containerEditar}>
        <TouchableOpacity onPress={editarFoto}>
          <Text style={styles.textEdicion}>Editar foto de perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={editarUbicacion}>
          <Text style={styles.textEdicion}>Editar ubicacion</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={salir}>
          <Text style={styles.textEdicion}>Salir de la aplicacion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PerfilScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.rojoOscuro,
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderRadius: 100,
    marginTop: 50,
  },
  textNombre: {
    fontFamily: "Poppins500",
    color: colors.blanco,
    marginTop: 20,
    fontSize: 15,
  },
  textUbicacion: {
    fontFamily: "Poppins300",
    color: colors.blanco,
    marginTop: 10,
    textAlign: "center",
    fontSize: 10,
  },
  containerEditar: {
    marginTop: 30,
  },
  textEdicion: {
    fontFamily: "Poppins300",
    color: colors.marronClaro,
    marginTop: 30,
    textAlign: "center",
    fontSize: 15,
  },
});
