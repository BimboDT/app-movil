import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/logo.png")} style={styles.logo} />
      <Text style={styles.text}>Bimbo Scan</Text>
      <Image
        source={require("@/assets/images/osito.png")}
        style={styles.osito}
      />
      <View style={styles.footerContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  text: {
    fontSize: 20,
    color: "#000000",
    marginBottom: 20,
  },
  footerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  input: {
    fontSize: 20,
    height: 40,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 10,
    width: 300,
    textAlign: "center",
    color: "black",
  },
  osito: {
    marginBottom: 20,
  },
  logo: {
    marginTop: 20,
    height: 100,
    width: 100,
  },
});
