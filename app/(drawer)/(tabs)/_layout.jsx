import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const TabsBar = () => {
  return (
    <>
      <StatusBar
        backgroundColor="#000" // Set background color
        style="light" // Set text color (light-content for dark text, dark-content for light text) 
        hidden={false} // Show or hide the status bar (true to hide)
        translucent={false} // Set to true for semi-transparent status bar 
      />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#fff',
            height: 60,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={24}
                color={focused ? '#0984e3' : 'gray'}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            drawerLabel: 'Profile',
            title: 'Profile',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={24}
                color={focused ? '#0984e3' : 'gray'}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsBar;