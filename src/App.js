import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import SignUpScreen from './screens/SignUpScreen';
import SplashScreen from './screens/SplashScreen/index';
import SignInScreen from './screens/SignInScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import { useSelector } from 'react-redux';
import QuickSubHomeScreen from './screens/QuikSubHomeScreen';

//Create Navigation Stack
const Stack = createNativeStackNavigator();

const App = () => {
  const signedIn = useSelector(state => state.user.signedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        {
          !signedIn ? (
            <>
              <Stack.Screen name="Splash" component={SplashScreen}/>
              <Stack.Screen name="Sign-Up" component={SignUpScreen}/>
              <Stack.Screen name="Sign-In" component={SignInScreen}/>
              <Stack.Screen name="Forgot-Password" component={ForgotPasswordScreen}/>
              <Stack.Screen name="QuickSub" component={QuickSubHomeScreen}/>
            </>
          ) : (
            <Stack.Screen name="Home" component={HomeScreen}/>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
