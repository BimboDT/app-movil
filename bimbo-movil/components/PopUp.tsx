// Popup que muestra el conteo obtenido de las cajas.
import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import { useRouter } from "expo-router";
import { useSelectedID } from "@/context/SelectedIDContext";
import Constants from "expo-constants";

const { width, height } = Dimensions.get("window");

const SERVER = Constants.expoConfig?.extra?.SERVER ?? "";

// Propiedades del componente
interface PopupProps {
  isVisible: boolean;
  onClose: () => void;
  imageUrl: string;
  boxCount: number;
}

// Componente de Popup
const Popup: React.FC<PopupProps> = ({
  isVisible,
  onClose,
  imageUrl,
  boxCount,
}) => {
  // Obtener el ID seleccionado
  const { selectedID } = useSelectedID();

  const router = useRouter();

  // Función para marcar la posición como contada
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
        onClose();
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

  // Función para cerrar el Popup
  const handleClose = () => {
    onClose();
    markAsCounted(selectedID);
    router.push("/");
  };

  // Función para registrar el conteo manualmente
  const handleManualCount = () => {
    onClose();
    router.push(`/conteo`);
  };

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.container}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text style={styles.Text}>
          {boxCount !== null
            ? `Se detectaron ${boxCount} caja${
                boxCount > 1 || boxCount == 0 ? "s" : ""
              }`
            : "Detectando..."}
        </Text>
        <TouchableOpacity onPress={handleManualCount} style={styles.button}>
          <Text style={styles.buttonText}>Registrar Conteo Manual</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClose} style={styles.button}>
          <Text style={styles.buttonText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    padding: width * 0.05,
  },
  image: {
    width: width * 0.9,
    height: height * 0.4,
    borderRadius: 10,
  },
  button: {
    marginTop: height * 0.02,
    padding: height * 0.02,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    fontFamily: "CenturyGothic",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: width * 0.04,
    fontFamily: "CenturyGothic",
  },
  Text: {
    color: "#FFFFFF",
    fontSize: width * 0.06,
    marginTop: height * 0.03,
    fontWeight: "bold",
    fontFamily: "CenturyGothic",
  },
});

export default Popup;
