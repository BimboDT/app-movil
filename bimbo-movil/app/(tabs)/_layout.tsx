// Código para la implementación de un layout de pestañas en la aplicación móvil de Bimbo.
// Este layout se compone de tres pestañas: "Home", "Picking" y "Conteo". La pestaña "Home"
// muestra la pantalla principal de la aplicación, la pestaña "Picking" muestra la pantalla de
// captura de imágenes para el área de picking y la pestaña "Conteo" muestra la pantalla de
// conteo de pallets. La pestaña "Conteo" solo se muestra si el usuario ha iniciado sesión en la
// aplicación.

import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";

export default function TabLayout() {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#00427A",
        headerStyle: {
          backgroundColor: "#263576",
        },
        headerShadowVisible: true,
        headerTintColor: "#FFFFFF",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
        },
      }}
    >
      {!isRegistered && (
        <Tabs.Screen
          name="registro"
          options={{
            title: "Registro",
            headerTitleStyle: { display: "none" },
            tabBarButton: () => null,
            tabBarStyle: { display: "none" },
          }}
        />
      )}

      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={25}
            />
          ),
          tabBarStyle: { display: "flex" },
        }}
      />
      <Tabs.Screen
        name="camara"
        options={{
          title: "Picking",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "camera" : "camera-outline"}
              color={color}
              size={25}
            />
          ),
          tabBarStyle: { display: "flex" },
        }}
      />
      <Tabs.Screen
        name="conteo"
        options={{
          title: "Conteo",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={
                focused ? "information-circle" : "information-circle-outline"
              }
              color={color}
              size={25}
            />
          ),
          tabBarButton: () => null,
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
}
