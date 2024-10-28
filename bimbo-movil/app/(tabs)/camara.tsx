import { CameraView, useCameraPermissions, CameraPictureOptions, CameraCapturedPicture } from 'expo-camera';
import { useState, useRef } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Popup from '@/components/PopUp';
import Constants from 'expo-constants';

const SERVER = Constants.expoConfig?.extra?.SERVER ?? '';

export default function CamaraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);;
  const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);
  const [BoxCount, setBoxCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePopup = () => {
    setIsVisible(!isVisible);
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to use the camera</Text>
        <View style={styles.permission}>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      </View>
    );
  }

  async function takePicture() {
    if (cameraRef.current) {
      const photoOptions : CameraPictureOptions = {
        skipProcessing: false,
        base64: true,
        exif: true,
      };

      const photo = await cameraRef.current.takePictureAsync(photoOptions);
      if (photo) {
        setPhoto(photo);
        setLoading(true);
        // Alert.alert('Photo taken!', `URI: ${photo.uri}`);
        await uploadPicture(photo);
      } else {
        Alert.alert('Error', 'Failed to take picture');
      }
    }
  }

  async function uploadPicture(photo: CameraCapturedPicture | null) {
    if (!photo) return "No hay una foto para subir";

    try {
      const response = await fetch(`http://${SERVER}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: photo.base64
        }),
      });

      const responseData = await response.json();
      setBoxCount(responseData.detections);
      // Alert.alert('Upload Success', `Response: ${responseData.detections}`);
      togglePopup();
    } catch (err) {
      Alert.alert('Upload Failed', `Error: ${err}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef}>
        <View style={styles.buttonContainer}>
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
        imageUrl={photo ? photo.uri : ''}
        boxCount={BoxCount}
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
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
  },
  loadingText: {
    marginTop: 10,
    color: 'white',
  },
});