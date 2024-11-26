import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Text, View } from "react-native";
import { UserProvider } from "../context/UserContext";

export default function RootLayout(): JSX.Element {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    CenturyGothic: require("@/assets/fonts/centurygothic.ttf"),
    CenturyGothicBold: require("@/assets/fonts/centurygothic_bold.ttf"),
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      setIsMounted(true);
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (isMounted) {
      const isRegistered = false;
      if (isRegistered) {
        router.replace("/");
      } else {
        router.replace("/(tabs)/registro");
      }
    }
  }, [isMounted, router]);

  if (!fontsLoaded || !isMounted) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <UserProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </UserProvider>
  );
}
