import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

type Item = {
  id: number;
  name: string;
};

export default function Index() {
  const router = useRouter();

  const [checkedItems, setCheckedItems] = useState<boolean[]>([false, false, false, false, false]);

  const handleCameraAccess = (index: number) => {
    setCheckedItems((prev) => {
      const updatedItems = [...prev];
      updatedItems[index] = true;
      return updatedItems;
    });

    router.push("/camara");
  };

  const items: Item[] = [
    { id: 1, name: "C 03 12 02" },
    { id: 2, name: "F 06 05 01" },
    { id: 3, name: "F 06 07 01" },
    { id: 4, name: "I 09 14 03" },
    { id: 5, name: "K 11 02 02" },
  ];

  const renderItem = ({ item, index }: { item: Item; index: number }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => handleCameraAccess(index)}
      disabled={checkedItems[index]}
    >
      <Text style={[styles.itemText, checkedItems[index] && styles.checked]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.text}>Bienvenido, Juan Carlos...</Text>
      <Text style={styles.subtext}>Posiciones a escanear hoy:</Text>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
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
    paddingBottom: height * 0.05,
    fontFamily: "CenturyGothic",
  },
  text: {
    fontSize: width * 0.05,
    color: "#000000",
    margin: height * 0.05,
    fontFamily: "CenturyGothicBold",
  },
  subtext: {
    fontSize: width * 0.04,
    color: "#000000",
    margin: height * 0.005,
    fontFamily: "CenturyGothic",
  },
  footerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: height * 0.05,
  },
  logo: {
    marginTop: height * 0.02,
    height: height * 0.15,
    width: width * 0.25,
  },
  listContainer: {
    width: "80%",
  },
  listItem: {
    padding: height * 0.02,
    backgroundColor: "#F0F0F0",
    marginVertical: height * 0.01,
    borderRadius: 5,
    textAlign: "center",
    alignItems: "center",
  },
  itemText: {
    fontSize: width * 0.05,
    color: "#000000",
    fontFamily: "CenturyGothic",
  },
  checked: {
    textDecorationLine: "line-through",
    color: "#888888",
  },
});
