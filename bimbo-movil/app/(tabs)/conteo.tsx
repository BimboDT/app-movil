// Ventana de conteo manual, por si el usuario detecta fallas con el conteo automático.
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { useSelectedID } from "@/context/SelectedIDContext";
import { useUser } from "@/context/UserContext";
import Constants from "expo-constants";
import { useState } from "react";
const SERVER = Constants.expoConfig?.extra?.SERVER ?? "";
const { width, height } = Dimensions.get("window");

export default function ConteoScreen() {
  // Contexto del ID seleccionado por el usuario para tomar la foto
  const { selectedID, pallets, idProd, boxes } = useSelectedID();
  // Contexto del usuario que está realizando el conteo
  const { employeeNumber } = useUser();
  // Estado para el conteo manual
  const [manualBoxes, setManualBoxes] = useState(0);
  // Estado para la diferencia entre el conteo manual y el conteo del sistema
  const [difManual, setDifManual] = useState(0);

  const router = useRouter();

  // Manejo del conteo manual
  const handleManualCount = () => {
    updateManualCount();
    markAsCounted(selectedID);
  };

  // Llamado para actualizar con el conteo manual
  const updateManualCount = async (): Promise<void> => {
    try {
      const currentDate: Date = new Date();
      const expirationDate: Date = new Date(currentDate);
      expirationDate.setMonth(expirationDate.getMonth() + 1);

      const response: Response = await fetch(
        `http://${SERVER}/conteo/crearConteo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Pallets: pallets,
            FechaCad: expirationDate,
            FechaConteo: currentDate,
            CajasSistema: boxes,
            CajasFisico: manualBoxes,
            DifCajas: difManual,
            IdPos: selectedID,
            IdRack: selectedID[0],
            IdProducto: idProd,
            NumEmpleado: employeeNumber,
          }),
        }
      );

      if (response.ok) {
        Alert.alert("Éxito", "El conteo fue registrado exitosamente.");
        router.push("/");
      } else {
        const error: string = await response.text();
        Alert.alert("Error", `No se pudo registrar el conteo: ${error}`);
      }
    } catch (error) {
      console.error("Error al marcar como contado:", error);
      Alert.alert(
        "Error",
        "Ocurrió un problema al registrar el conteo. Inténtalo de nuevo."
      );
    }
  };

  // Función para marcar una ubicación como contada
  async function markAsCounted(selectedID: string) {
    try {
      const response = await fetch(`http://${SERVER}/conteo/actualizarPos`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idPos: selectedID,
          contado: true,
        }),
      });

      if (response.ok) {
        Alert.alert("Éxito", "El conteo fue registrado exitosamente.");
        router.push("/");
      } else {
        const error = await response.text();
        Alert.alert("Error", `No se pudo registrar el conteo: ${error}`);
      }
    } catch (error) {
      console.error("Error al marcar como contado:", error);
      Alert.alert(
        "Error",
        "Ocurrió un problema al registrar el conteo. Inténtalo de nuevo."
      );
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.text}>Conteo screen</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese Conteo Manual"
          placeholderTextColor="gray"
          keyboardType="numeric"
          onChangeText={(text) => {
            setManualBoxes(parseInt(text));
            setDifManual(Math.abs(boxes - parseInt(text)));
          }}
        />
        <TouchableOpacity onPress={handleManualCount}>
          <Button label="Confirmar" />
        </TouchableOpacity>
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
