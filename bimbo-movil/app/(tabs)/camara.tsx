// Pantalla de la cámara para el área de picking.
import {
  CameraView,
  useCameraPermissions,
  CameraPictureOptions,
  CameraCapturedPicture,
} from "expo-camera";
import { useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import Popup from "@/components/PopUp";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { useSelectedID } from "@/context/SelectedIDContext";
const { width, height } = Dimensions.get("window");

const SERVER = Constants.expoConfig?.extra?.SERVER ?? "";

export default function CamaraScreen() {
  const router = useRouter();
  // Hook para obtener los permisos de la cámara
  const [permission, requestPermission] = useCameraPermissions();
  // Referencia a la cámara
  const cameraRef = useRef<CameraView | null>(null);
  // Para guardar la foto tomada
  const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);
  // Para guardar el conteo de cajas
  const [boxCount, setBoxCount] = useState(0);
  // Para mostrar el popup
  const [isVisible, setIsVisible] = useState(false);
  // Para cargar el loading
  const [loading, setLoading] = useState(false);
  // Para el flash de la cámara
  const [cameraTorch, setCameraTorch] = useState<boolean>(false);
  // Para el URL de la imagen
  const { setImageUrl, setUrlContado } = useSelectedID();

  // Función para mostrar u ocultar el popup
  const togglePopup = () => {
    setIsVisible(!isVisible);
  };

  if (!permission) {
    return <View />;
  }

  // Si no tiene los permisos otorgados, se muestra un mensaje
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to use the camera
        </Text>
        <View style={styles.permission}>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      </View>
    );
  }

  // Función para tomar la foto
  async function takePicture() {
    if (cameraRef.current) {
      const photoOptions: CameraPictureOptions = {
        skipProcessing: false,
        base64: true,
        exif: true,
      };

      const photo = await cameraRef.current.takePictureAsync(photoOptions);
      if (photo) {
        setPhoto(photo);
        setLoading(true);
        await uploadPicture(photo);
      } else {
        Alert.alert("Error", "Failed to take picture");
      }
    }
  }

  // Función para regresar a la ventana inicial
  const handleBack = () => {
    const isRegistered = true;
    if (isRegistered) {
      router.push("/");
    } else {
      router.push("/registro");
    }
  };

  // Función para subir la imagen al bucket
  async function uploadPicture(photo: CameraCapturedPicture | null) {
    if (!photo) return "No hay una foto para subir";

    try {
      const response = await fetch(`http://10.48.103.123:8082/uploadImage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageBase64: photo.base64,
        }),
      });

      const responseData = await response.json();
      setImageUrl(responseData.url);
      console.log(responseData.url);
      getBoxCount(responseData.url);
    } catch (err) {
      Alert.alert("Upload Failed", `Error: ${err}`);
    } finally {
      setLoading(false);
    }
  }

  // Función para obtener el conteo de cajas
  async function getBoxCount(imageUrl: string) {
    try {
      const response = await fetch(`http://10.48.103.123:8082/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: imageUrl,
        }),
      });

      const responseData = await response.json();
      setBoxCount(responseData.detecciones_caja);
      setUrlContado(responseData.url);
      console.log(responseData.url);
      togglePopup();
    } catch (err) {
      Alert.alert("Prediction Failed", `Error: ${err}`);
    }
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        ref={cameraRef}
        enableTorch={cameraTorch}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Entypo name="chevron-thin-left" size={40} color="white" />
            <Text style={styles.text}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setCameraTorch(!cameraTorch)}
          >
            <Entypo name="flash" size={40} color="white" />
            <Text style={styles.text}>Flash</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Entypo name="camera" size={40} color="white" />
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </CameraView>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Uploading...</Text>
        </View>
      )}

      <Popup
        isVisible={isVisible}
        onClose={togglePopup}
        imageUrl={photo ? photo.uri : ""}
        boxCount={boxCount}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "CenturyGothic",
  },
  message: {
    textAlign: "center",
    paddingBottom: height * 0.03,
    fontWeight: "bold",
    fontFamily: "CenturyGothic",
    fontSize: width * 0.05,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  backButton: {
    position: "absolute",
    top: height * 0.02,
    left: width * 0.02,
    flexDirection: "row",
    alignItems: "center",
    fontFamily: "CenturyGothic",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    margin: height * 0.05,
  },
  text: {
    fontSize: width * 0.04,
    fontWeight: "bold",
    color: "white",
    fontFamily: "CenturyGothic",
  },
  permission: {
    alignItems: "center",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  loadingText: {
    marginTop: height * 0.02,
    color: "white",
    fontFamily: "CenturyGothic",
    fontSize: width * 0.04,
  },
});
