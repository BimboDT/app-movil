import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#00427A',
        headerStyle: {
          backgroundColor: '#00427A',
        },
        headerShadowVisible: false,
        headerTintColor: '#FFFFFF',
        tabBarStyle: {
        backgroundColor: '#FFFFFF',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="conteo"
        options={{
          title: 'Conteo',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={25}/>
          ),
        }}
      />
      <Tabs.Screen
        name="camara"
        options={{
          title: 'Camara',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'camera' : 'camera-outline'} color={color} size={25} />
          ),
        }}
      />
    </Tabs>
  );
}
