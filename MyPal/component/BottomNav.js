import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Setting from '../screens/Setting';
import Status from '../screens/Status';
import User from '../screens/User';
import * as native from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomNav = () => {
  return (
    <Tab.Navigator tabBarOptions={{showLabel: false, style: {height: 40}}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <native.NativeBaseProvider>
              <native.Box
                h="100%"
                // bg="red.300"
                alignItems="center"
                justifyContent="center">
                <FontAwesome
                  name="home"
                  size={24}
                  color={
                    focused ? 'rgba(45, 52, 54,1.0)' : 'rgba(99, 110, 114,1.0)'
                  }
                />
              </native.Box>
            </native.NativeBaseProvider>
          ),
        }}
      />

      <Tab.Screen
        name="Status"
        component={Status}
        options={{
          tabBarIcon: ({focused}) => (
            <native.NativeBaseProvider>
              <native.Box
                h="100%"
                // bg="red.300"
                alignItems="center"
                justifyContent="center">
                <FontAwesome
                  name="bar-chart"
                  size={24}
                  color={
                    focused ? 'rgba(45, 52, 54,1.0)' : 'rgba(99, 110, 114,1.0)'
                  }
                />
              </native.Box>
            </native.NativeBaseProvider>
          ),
        }}
      />

      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: ({focused}) => (
            <native.NativeBaseProvider>
              <native.Box
                h="100%"
                // bg="red.300"
                alignItems="center"
                justifyContent="center">
                <FontAwesome
                  name="user"
                  size={24}
                  color={
                    focused ? 'rgba(45, 52, 54,1.0)' : 'rgba(99, 110, 114,1.0)'
                  }
                />
              </native.Box>
            </native.NativeBaseProvider>
          ),
        }}
      />

      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({focused}) => (
            <native.NativeBaseProvider>
              <native.Box
                h="100%"
                // bg="red.300"
                alignItems="center"
                justifyContent="center">
                <Ionicons
                  name="settings"
                  size={24}
                  color={
                    focused ? 'rgba(45, 52, 54,1.0)' : 'rgba(99, 110, 114,1.0)'
                  }
                />
              </native.Box>
            </native.NativeBaseProvider>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;
