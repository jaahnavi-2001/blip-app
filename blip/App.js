import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import FeedScreen from './src/screens/FeedScreen';
import CommunitiesScreen from './src/screens/CommunitiesScreen';
import CommunityFeedScreen from './src/screens/CommunityFeedScreen';
import CreateScreen from './src/screens/CreateScreen';
import MapScreen from './src/screens/MapScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import BlipDetailScreen from './src/screens/BlipDetailScreen';
import { colors } from './src/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colors.dark, card: colors.dark, border: 'transparent', text: colors.white },
};

// SVG-style icons using Text (no extra library needed)
const icons = {
  Feed: ({ focused }) => <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.35 }}>🏠</Text>,
  Map: ({ focused }) => <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.35 }}>📍</Text>,
  Create: () => (
    <View style={styles.createIconWrap}>
      <Text style={{ fontSize: 20, color: colors.white }}>+</Text>
    </View>
  ),
  Communities: ({ focused }) => <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.35 }}>👥</Text>,
  Profile: ({ focused }) => <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.35 }}>👤</Text>,
};

// Feed stack (Feed + BlipDetail)
function FeedStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen name="BlipDetail" component={BlipDetailScreen} />
    </Stack.Navigator>
  );
}

// Communities stack
function CommStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Communities" component={CommunitiesScreen} />
      <Stack.Screen name="CommunityFeed" component={CommunityFeedScreen} />
    </Stack.Navigator>
  );
}

function TabLabel({ focused, label }) {
  return (
    <Text style={[styles.tabLabel, focused && { color: label === 'Create' ? colors.white : colors.pink }]}>
      {label}
    </Text>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer theme={navTheme}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: styles.tabBar,
            tabBarShowLabel: true,
            tabBarActiveTintColor: colors.pink,
            tabBarInactiveTintColor: colors.muted,
            tabBarLabelStyle: styles.tabLabel,
          }}
        >
          <Tab.Screen
            name="FeedTab"
            component={FeedStack}
            options={{
              tabBarLabel: ({ focused }) => <TabLabel focused={focused} label="Feed" />,
              tabBarIcon: ({ focused }) => icons.Feed({ focused }),
            }}
          />
          <Tab.Screen
            name="MapTab"
            component={MapScreen}
            options={{
              tabBarLabel: ({ focused }) => <TabLabel focused={focused} label="Map" />,
              tabBarIcon: ({ focused }) => icons.Map({ focused }),
            }}
          />
          <Tab.Screen
            name="CreateTab"
            component={CreateScreen}
            options={{
              tabBarLabel: () => <TabLabel focused={true} label="Blip" />,
              tabBarIcon: () => icons.Create({}),
            }}
          />
          <Tab.Screen
            name="CommTab"
            component={CommStack}
            options={{
              tabBarLabel: ({ focused }) => <TabLabel focused={focused} label="Communities" />,
              tabBarIcon: ({ focused }) => icons.Communities({ focused }),
            }}
          />
          <Tab.Screen
            name="ProfileTab"
            component={ProfileScreen}
            options={{
              tabBarLabel: ({ focused }) => <TabLabel focused={focused} label="Profile" />,
              tabBarIcon: ({ focused }) => icons.Profile({ focused }),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.dark2,
    borderTopWidth: 1,
    borderTopColor: colors.dark4,
    height: 72,
    paddingTop: 6,
    paddingBottom: 10,
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: colors.muted,
    letterSpacing: 0.3,
    marginTop: 2,
  },
  createIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.pink,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    shadowColor: colors.pink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
});
