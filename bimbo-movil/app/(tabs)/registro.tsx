// Ventana de inicio de la página. Aquí se muestra el logo de la empresa y el acceso de usuario.
// Se importa el componente Access para el acceso de usuario.
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import Access from "@/components/Access";

const { width, height } = Dimensions.get("window");

export default function Registro() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/logo_t.png")}
          style={styles.logotx}
          resizeMode="contain"
        />
        <Text style={styles.text}>Acceso de Usuario</Text>

        <Access label="Acceder" />
        <Image
          source={require("@/assets/images/osito.png")}
          style={styles.osito}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: width * 0.05,
    color: "#000000",
    margin: width * 0.05,
    fontFamily: "CenturyGothicBold",
  },
  input: {
    fontSize: width * 0.05,
    height: height * 0.05,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 10,
    width: width * 0.8,
    textAlign: "center",
    color: "black",
    fontFamily: "CenturyGothic",
  },
  osito: {
    margin: height * 0.05,
  },
  logotx: {
    marginTop: height * 0.001,
    width: width * 0.4,
    height: undefined,
    aspectRatio: 1,
  },
});
