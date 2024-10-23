import { TextInput, Text, View, StyleSheet } from 'react-native';
import Button from '@/components/Button';

export default function ConteoScreen() {
  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#000000',
    margin: 100,
    fontWeight: "bold",
  },
  input: {
    fontSize: 20,
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
    width: 300,
    textAlign: 'center',
    color: 'black',
  },
});
