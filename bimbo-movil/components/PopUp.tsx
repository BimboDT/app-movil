import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Modal from 'react-native-modal';

interface PopupProps {
  isVisible: boolean;
  onClose: () => void;
  imageUrl: string;
  boxCount: number;
}

const Popup: React.FC<PopupProps> = ({ isVisible, onClose, imageUrl, boxCount }) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.container}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text style={styles.Text}>
          {boxCount !== null ? `Se detectaron ${boxCount} caja${boxCount > 1 || boxCount == 0  ? 's' : ''}` : 'Detectando...'}
        </Text>
        <TouchableOpacity onPress={onClose} style={styles.button}>
          <Text style={styles.buttonText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 20,
  },
  image: {
    width: '100%',
    height: '80%',
    borderRadius: 10,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  Text: {
    color: '#FFFFFF',
    fontSize: 25,
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default Popup;
