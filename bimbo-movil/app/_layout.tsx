import { useRouter } from "expo-router";
import React, { Suspense, useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Text } from "react-native";

const LoadFonts = () => {
  const [fontsLoaded] = useFonts({
    CenturyGothic: require("@/assets/fonts/centurygothic.ttf"),
    CenturyGothicBold: require("@/assets/fonts/centurygothic_bold.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  return null;
};

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const isRegistered = false;

    if (isRegistered) {
      router.replace("/");
    } else {
      router.replace("/(tabs)/registro");
    }
  }, [router]);

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <LoadFonts />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </Suspense>
  );
}
