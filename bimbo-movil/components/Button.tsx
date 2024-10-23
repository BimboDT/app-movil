import { StyleSheet, View, Pressable, Text } from 'react-native';

type Props = {
  label: string;
};

export default function Button({ label }: Props) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={() => alert('Conteo registrado exitosamente.')}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    margin: 70,
  },
  button: {
    borderRadius: 20,
    width: '60%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00427A',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});
