import React from 'react';
import { StyleSheet, View } from 'react-native';
import Login from './screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import { SensorsProvider } from './contexts/SensorContext';
import { Sensor } from './types/Sensor';
import SensorView from './screens/SensorView';
import { NavigationStack } from './types/NavigationStack';
import Scanner from './screens/Scanner';

const Stack = createStackNavigator<NavigationStack>();

export default function App() {
  return (
    <SensorsProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <Stack.Navigator headerMode="none" initialRouteName="Login">
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="SensorView" component={SensorView}/>
            <Stack.Screen name="Scanner" component={Scanner}/>
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </SensorsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});