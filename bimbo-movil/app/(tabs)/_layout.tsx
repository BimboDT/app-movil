// tabs/_layout.tsx
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';

export default function TabLayout() {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#00427A',
        headerStyle: {
          backgroundColor: '#263576',
        },
        headerShadowVisible: false,
        headerTintColor: '#FFFFFF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      {!isRegistered && (
        <Tabs.Screen
          name="registro"
          options={{
            title: 'Registro',
            headerTitleStyle: { display: 'none' }, 
            tabBarStyle: { display: 'none' },
          }}
        />
      )}
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={25} />
          ),
          tabBarStyle: { display: 'none' }
        }}
      />
      <Tabs.Screen
        name="conteo"
        options={{
          title: 'Conteo',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={25} />
          ),
          tabBarStyle: { display: 'none' }
        }}
      />
      <Tabs.Screen
        name="camara"
        options={{
          title: 'Camara',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'camera' : 'camera-outline'} color={color} size={25} />
          ),
          tabBarStyle: { display: 'none' }
        }}
        
      />
    </Tabs>
  );
}
