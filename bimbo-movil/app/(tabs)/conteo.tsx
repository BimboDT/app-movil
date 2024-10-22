import { Text, View, StyleSheet } from 'react-native';

export default function ConteoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Conteo screen</Text>
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
    color: '#000000',
  },
});
