// Ventana de inicio de la aplicación, donde se selecciona la letra de la posición a contar
// y se muestra la lista de posiciones disponibles para contar.
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
import { useSelectedID } from "@/context/SelectedIDContext"; // Usar el contexto de SelectedID
import Constants from "expo-constants";

const { width, height } = Dimensions.get("window");

// Definir el tipo de dato para las posiciones
type Position = {
  IdPos: string;
  Contado: boolean;
};

const SERVER = Constants.expoConfig?.extra?.SERVER ?? "";

export default function Index() {
  const router = useRouter();
  // Contexto del usuario que está realizando el conteo
  const { employeeName } = useUser();
  // Contexto del ID seleccionado por el usuario para tomar la foto
  const { selectedID, setSelectedID } = useSelectedID();
  // Letra seleccionada por el usuario para el conteo
  const [selectedLetter, setSelectedLetter] = useState("A");
  // Lista de posiciones disponibles para contar
  const [positions, setPositions] = useState<Position[]>([]);
  // Estado para mostrar el dropdown
  const [open, setOpen] = useState(false);
  // Lista de letras para el dropdown
  const [items, setItems] = useState(
    Array.from("ABCDEFGHIJKLMNO").map((letter) => ({
      label: letter,
      value: letter,
    }))
  );

  // Función para obtener las posiciones disponibles para contar
  const fetchPositions = async (letter: string) => {
    try {
      const response = await fetch(
        `http://${SERVER}/conteo/posicionesNoContadas/${letter}`
      );
      const data = await response.json();

      const filteredPositions = data.uncountedPositions.filter(
        (pos: Position) => pos.IdPos.startsWith(letter)
      );

      setPositions(filteredPositions);
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
  };

  // Cargar las posiciones disponibles para contar
  useEffect(() => {
    fetchPositions(selectedLetter);
  }, [selectedLetter]);

  // Mostrar el ID seleccionado
  useEffect(() => {
    console.log("selectedID actualizado:", selectedID);
  }, [selectedID]);

  // Función para manejar el acceso a la cámara
  const handleCameraAccess = (item: Position) => {
    if (!item.Contado) {
      setSelectedID(item.IdPos);
      router.push("../camara2");
    }
  };

  // Renderizar cada posición en la lista
  const renderItem = ({ item }: { item: Position }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => handleCameraAccess(item)}
      disabled={item.Contado}
    >
      <Text style={[styles.itemText, item.Contado && styles.checked]}>
        {item.IdPos}
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
        keyExtractor={(item) => item.IdPos}
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
