import { CameraView, CameraType, useCameraPermissions, CameraPictureOptions, CameraCapturedPicture } from 'expo-camera';
import { useState, useRef } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Alert, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Popup from '@/components/PopUp';
import Constants from 'expo-constants';

const SERVER = Constants.expoConfig?.extra?.SERVER ?? '';

export default function CamaraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);;
  const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const togglePopup = () => {
    setIsVisible(!isVisible);
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to use the camera</Text>
        <View style={styles.permission}>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePicture() {
    if (cameraRef.current) {
      const photoOptions : CameraPictureOptions = {
        skipProcessing: false, // Cambiar a true si no necesitas procesar la imagen
        base64: true, // Esto incluye la imagen en base64
        exif: true, // Esto incluye los datos EXIF
      };

      const photo = await cameraRef.current.takePictureAsync(photoOptions);
      if (photo) {
        setPhoto(photo);
        togglePopup();
        // Alert.alert('Photo taken!', `URI: ${photo.uri}`);
        await uploadPicture();
      } else {
        Alert.alert('Error', 'Failed to take picture');
      }
    }
  }

  async function uploadPicture() {
    if (!photo) return "Hola Foto";

    const jsonData = {
      image: photo.base64
    }

    try {
      const response = await fetch(`http://${SERVER}/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      const responseData = await response.json();
      Alert.alert('Upload Success', `Response: ${responseData.message}`);
    } catch (err) {
      Alert.alert('Upload Failed', `Error: ${err}`);
    }
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Entypo name="camera" size={40} color="white" />
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      <Popup
        isVisible={isVisible}
        onClose={togglePopup}
        imageUrl={photo ? photo.uri : ''}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  },
  message: {
    textAlign: 'center',
    paddingBottom: 20,
    fontWeight: "bold",
  },
  camera: {
    flex: 1,
    width: "100%"
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 40,
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  permission: {
    alignItems: "center",
  }
});