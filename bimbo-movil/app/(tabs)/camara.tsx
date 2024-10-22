import { CameraView, CameraType, useCameraPermissions, CameraPictureOptions, CameraCapturedPicture } from 'expo-camera';
import { useState, useRef } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Alert, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function CamaraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);;
  const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
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
        Alert.alert('Photo taken!', `URI: ${photo.uri}`);
      } else {
        Alert.alert('Error', 'Failed to take picture');
      }
    }
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Entypo name="cycle" size={40} color="white" />
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Entypo name="camera" size={40} color="white" />
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      {photo && (
        <Image
          source={{ uri: `data:image/jpg;base64,${photo.base64}` }} // Muestra la imagen en base64
          style={styles.preview}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
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
  preview: {
    width: '100%',
    height: 300,
    marginTop: 20,
  },
});