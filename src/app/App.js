import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

//Screens
import SignUpScreen from '../screens/SignUpScreen';
import SplashScreen from '../screens/SplashScreen/index';
import SignInScreen from '../screens/SignInScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import UserScreen from '../screens/protected-screens/UserScreen'
import QuickSubHomeScreen from '../screens/QuikSubHomeScreen';

//services screens
import AirtimeScreen from '../screens/services/AirtimeScreen';
import DataScreen from '../screens/services/DataScreen';
import ElectricityScreen from '../screens/services/ElectricityScreen';
import CableScreen from '../screens/services/CableScreen';
import ScratchCardScreen from '../screens/services/ScratchCardScreen';

import tw from '../lib/tailwind';
import { Image } from 'react-native';

//Create Navigation Stack
const Stack = createNativeStackNavigator();

const App = () => {
  const isSignedIn = useSelector(state => state.user.isSignedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        {
          isSignedIn ? (
            <Stack.Screen name="UserScreen" component={UserScreen}/>
          ) : (
            <Stack.Group>
              <Stack.Screen name="Splash" component={SplashScreen}/>
              <Stack.Screen name="Sign-Up" component={SignUpScreen}/>
              <Stack.Screen name="Sign-In" component={SignInScreen}/>
              <Stack.Screen name="Forgot-Password" component={ForgotPasswordScreen}/>
              <Stack.Screen name="QuickSub" component={QuickSubHomeScreen}/>
            </Stack.Group>
          )
        }
        <Stack.Group 
          screenOptions={{
            headerShown:true,
            headerStyle:tw`bg-white`,
            headerTitleStyle:tw`text-black text-center font-nunitobold`,
            statusBarStyle:'light',
            headerRight:() => <Image source={require('../../assets/icon.png')} style={{width:40,height:40}}/>
          }}
        >
          <Stack.Screen name="Airtime" component={AirtimeScreen} options={{headerTitle:'Airtime Top-Up'}}/>
          <Stack.Screen name="Data" component={DataScreen} options={{headerTitle:'Data Top-Up'}}/>
          <Stack.Screen name="Electricity" component={ElectricityScreen} options={{headerTitle:'Electricity Recharge'}}/>
          <Stack.Screen name="Cable" component={CableScreen} options={{headerTitle:'Cable Subscription'}}/>
          <Stack.Screen name="ScratchCard" component={ScratchCardScreen} options={{headerTitle:'Buy Scratch Cards'}}/>
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
