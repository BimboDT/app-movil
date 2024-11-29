import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard, Dimensions
} from "react-native";
import Button from "@/components/Button";

const { width, height } = Dimensions.get('window');

export default function ConteoScreen() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.text}>Conteo screen</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese Conteo Manual"
          placeholderTextColor="gray"
          keyboardType="numeric"
        />
        <Button label="Confirmar" />
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
    fontFamily: "CenturyGothic",
  },
  text: {
    fontSize: width * 0.05,
    color: "#000000",
    margin: width * 0.1,
    fontWeight: "bold",
    fontFamily: "CenturyGothic",
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
});
