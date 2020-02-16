import React from 'react';
import { StyleSheet, View } from 'react-native';
import Login from './screens/Login';
import { UserProvider } from './contexts/UserContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import { SensorsProvider } from './contexts/SensorContext';

const Stack = createStackNavigator();

// I shouldn't have to do this!!! Expo needs a little work.
export default function App() {
  return (
    <UserProvider>
      <SensorsProvider>
        <NavigationContainer>
          <View style={styles.container}>
            <Stack.Navigator headerMode="none" initialRouteName="Login">
              <Stack.Screen name="Login" component={Login}/>
              <Stack.Screen name="Home" component={Home}/>
            </Stack.Navigator>
          </View>
        </NavigationContainer>
      </SensorsProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});