// Componente de botón para la aplicación.
import { StyleSheet, View, Pressable, Text, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Propiedades del botón
type Props = {
  label: string;
};

export default function Button({ label }: Props) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.button}
        onPress={() => alert("Conteo registrado exitosamente.")}
      >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: width * 0.8,
    height: height * 0.08,
    alignItems: "center",
    justifyContent: "center",
    padding: height * 0.01,
    margin: height * 0.05,
  },
  button: {
    borderRadius: 20,
    width: "60%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#263576",
    fontFamily: "CenturyGothic",
  },
  buttonIcon: {
    paddingRight: width * 0.02,
    fontFamily: "CenturyGothic",
  },
  buttonLabel: {
    color: "#FFFFFF",
    fontSize: width * 0.05,
    fontFamily: "CenturyGothic",
  },
});
