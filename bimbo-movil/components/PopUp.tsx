import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

interface PopupProps {
  isVisible: boolean;
  onClose: () => void;
  imageUrl: string;
  boxCount: number;
}

const Popup: React.FC<PopupProps> = ({
  isVisible,
  onClose,
  imageUrl,
  boxCount,
}) => {
  const router = useRouter();
  
  const handleClose = () => {
    onClose();
    router.push('/');
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
