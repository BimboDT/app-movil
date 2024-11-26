import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useRouter } from "expo-router";
import { useUser } from "@/context/UserContext";

const { width, height } = Dimensions.get("window");

type Item = {
  id: number;
  name: string;
};

export default function Index() {
  const router = useRouter();
  const { employeeName } = useUser();

  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [selectedLetter, setSelectedLetter] = useState("A");
  const [positions, setPositions] = useState<Item[]>([]);
  const [open, setOpen] = useState(false); 
  const [items, setItems] = useState(
    Array.from("ABCDEFGHIJKLMNO").map((letter) => ({
      label: letter,
      value: letter,
    }))
  );

  const fetchPositions = async (letter: string) => {
    try {
      const response = await fetch(`http://10.48.109.35:8080/conteo/posicionesNoContadas/${letter}`);
      const data = await response.json();

      const filteredPositions = data.positions
        .filter((pos: string) => pos.startsWith(letter))
        .map((pos: string, index: number) => ({
          id: index + 1,
          name: pos, 
        }));

      setPositions(filteredPositions);
      setCheckedItems(new Array(filteredPositions.length).fill(false));
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
  };

  useEffect(() => {
    fetchPositions(selectedLetter);
  }, []);

  const handleCameraAccess = (index: number) => {
    setCheckedItems((prev) => {
      const updatedItems = [...prev];
      updatedItems[index] = true;
      return updatedItems;
    });

    router.push("../camara2");
  };

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
      <Text style={styles.text}>Bienvenido, {employeeName}...</Text>
      <Text style={styles.subtext}>Selecciona una letra para comenzar:</Text>

      <DropDownPicker
        open={open}
        value={selectedLetter}
        items={items}
        setOpen={setOpen}
        setValue={setSelectedLetter}
        setItems={setItems}
        onChangeValue={(value) => {
          if (value) fetchPositions(value);
        }}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        textStyle={styles.dropdownText}
      />

      <FlatList
        data={positions}
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
    marginTop: height * 0.03,
    width: "80%",
    justifyContent: "space-between",
  },
  listItem: {
    padding: height * 0.02,
    backgroundColor: "#F0F0F0",
    marginVertical: height * 0.01,
    borderRadius: 5,
    textAlign: "center",
    justifyContent: "space-between",
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
  dropdown: {
    width: "80%",
    backgroundColor: "#F0F0F0",
    borderRadius: 5,
    borderColor: "#CCCCCC",
    alignSelf: "center",
  },
  dropdownContainer: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderColor: "#CCCCCC",
    alignSelf: "center",
  },
  dropdownText: {
    fontSize: width * 0.05,
    color: "#000000",
    fontFamily: "CenturyGothic",
    textAlign: "center",
  },
});
