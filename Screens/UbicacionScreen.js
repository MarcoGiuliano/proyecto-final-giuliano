import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { API_KEY } from "../Constants/googleApi";
import { DB_URL } from "../Constants/auth";
import { useSelector } from "react-redux";
import { colors } from "../Styles/colores";

//https://developers.google.com/maps/documentation/maps-static/start DOC API
//https://developers.google.com/maps/documentation/maps-static/start#Markers Markers DOC

const UbicacionScreen = ({ navigation }) => {
  const [ubicacion, setubicacion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [direccion, setdireccion] = useState(null);
  const [photo, setPhoto] = useState(null);
  const { user } = useSelector((state) => state.auth.value);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        console.log("Trata de obtener location");
        let ubicacion = await Location.getCurrentPositionAsync({});
        console.log(ubicacion);
        setubicacion({
          lat: ubicacion.coords.latitude,
          lng: ubicacion.coords.longitude,
        });
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  useEffect(() => {
    if (ubicacion?.lat) {
      (async () => {
        setPhoto(
          `https://maps.googleapis.com/maps/api/staticmap?center=${ubicacion.lat},${ubicacion.lng}&zoom=13&size=600x600&maptype=roadmap&markers=color:red%7Clabel:C%7C${ubicacion.lat},${ubicacion.lng}&key=${API_KEY}`
        );
        //Reverse geocode
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${ubicacion.lat},${ubicacion.lng}&key=${API_KEY}`
        );
        const reverseGeocode = await response.json();
        console.log(reverseGeocode);
        const direccion = reverseGeocode.results[0].formatted_address;
        setdireccion(direccion);
      })();
    }
  }, [ubicacion]);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (ubicacion) {
    text = JSON.stringify(ubicacion);
  }

  const handleConfirmLocation = async () => {
    const res = await fetch(`${DB_URL}usuarios.json`, {
      method: "POST",
      body: JSON.stringify({
        direccion: direccion,
        userId: user.userId,
      }),
    });
    navigation.navigate("Perfil", { direccion });
  };

  console.log(ubicacion);

  return (
    <View style={styles.container}>
      <View>
        {photo ? (
          <Image source={{ uri: photo }} style={{ width: 500, height: 500 }} />
        ) : null}
        {direccion ? (
          <>
            <Text style={styles.textDireccion}>{direccion}</Text>
            <TouchableOpacity
              onPress={handleConfirmLocation}
              style={styles.btn}
            >
              <Text style={styles.txtBtn}>Confirmar direccion</Text>
            </TouchableOpacity>
          </>
        ) : null}
      </View>
    </View>
  );
};

export default UbicacionScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.rojoOscuro,
  },
  btn: {
    backgroundColor: colors.rojoClaro,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  textDireccion: {
    color: colors.blanco,
    fontFamily: "Poppins600",
    color: colors.blanco,
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  txtBtn: {
    color: colors.blanco,
    fontFamily: "Poppins600",
    color: colors.blanco,
    fontSize: 16,
  },
});
