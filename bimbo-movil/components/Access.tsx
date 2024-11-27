import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import Constants from "expo-constants";

const { width, height } = Dimensions.get("window");

const SERVER = Constants.expoConfig?.extra?.SERVER ?? "";

interface AccessProps {
  label: string;
}

export default function Access({ label }: AccessProps) {
  const router = useRouter();
  const { setEmployeeName } = useUser();
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleAccess = async () => {
    try {
      const response = await fetch(
        `http://${SERVER}/conteo/consultaUsuario/${employeeNumber}`
      );
      const data = await response.json();
  
      if (data) {
        console.log(data);
        setEmployeeName(data);
        router.replace("/(tabs)");
      } else {
        alert("Por favor, ingresa un número de empleado válido.");
      }
    } catch (error) {
      //console.error("Error fetching name:", error);
      alert("Por favor, ingresa un número de empleado válido.");
    }
  };
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Número de empleado"
          value={employeeNumber}
          placeholderTextColor="gray"
          onChangeText={setEmployeeNumber}
          keyboardType="numeric"
        />
        <TouchableWithoutFeedback onPress={handleAccess}>
          <View
            style={[styles.button, isHovered && styles.buttonHovered]}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
            onTouchCancel={() => setIsHovered(false)}
          >
            <Text style={styles.buttonText}>{label}</Text>
          </View>
        </TouchableWithoutFeedback>
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
  title: {
    fontSize: width * 0.06,
    margin: height * 0.05,
  },
  button: {
    margin: height * 0.03,
    padding: height * 0.02,
    backgroundColor: "#263576",
    borderRadius: 5,
    fontFamily: "CenturyGothic",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  buttonHovered: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    elevation: 8,
    backgroundColor: "#b2171f",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "CenturyGothic",
  },
});
