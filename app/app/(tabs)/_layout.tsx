import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/config/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerShown: false,
        tabBarButton: HapticTab,
        // tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: Colors.white,
          },
          default: {
            backgroundColor: Colors.white,
          },
        }),
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name='house.circle' color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name='transactions'
        options={{
          title: 'Transacciones',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name='paperplane.circle' color={color} />
          ),
        }}
      />

            <Tabs.Screen
        name='profile'
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name='person.circle' color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
