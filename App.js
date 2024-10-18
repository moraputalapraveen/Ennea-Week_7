import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PresentTasksScreen from './components/PresentTasksScreen';
import PastTasksScreen from './components/PastTasksScreen';
import Icon from 'react-native-vector-icons/Ionicons'; 

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'PresentTasks') {
              iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
            } else if (route.name === 'PastTasks') {
              iconName = focused ? 'time' : 'time-outline';
            }

            
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#1E90FF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen 
          name="PresentTasks" 
          component={PresentTasksScreen} 
          options={{ title: 'Present Tasks' }} 
        />
        <Tab.Screen 
          name="PastTasks" 
          component={PastTasksScreen} 
          options={{ title: 'Past Tasks' }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
