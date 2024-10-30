import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Access from "@/components/Access";

export default function RegistroScreen() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.text}>Bienvenido</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su número de empleado"
          placeholderTextColor="darkgray"
        />
        <Access label="Acceder" />
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
    fontSize: 20,
    color: "#000000",
    margin: 100,
    fontWeight: "bold",
  },
  input: {
    fontSize: 20,
    height: 40,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 10,
    width: 300,
    textAlign: "center",
    color: "black",
  },
});
