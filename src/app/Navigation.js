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
import QuickSubHomeScreen from '../screens/QuickSubHomeScreen';

//services screens
import AirtimeScreen from '../screens/services/AirtimeScreen';
import DataScreen from '../screens/services/DataScreen';
import ElectricityScreen from '../screens/services/ElectricityScreen';
import CableScreen from '../screens/services/CableScreen';
import ScratchCardScreen from '../screens/services/ScratchCardScreen';

//util screens
import NetworkProvidersScreen from '../screens/services/NetworkProvidersScreen';
import TransactionReviewScreen from '../screens/TransactionReviewScreen';
import BankTransferScreen from '../screens/BankTransferScreen';

import tw from '../lib/tailwind';
import { Image } from 'react-native';

//Create Navigation Stack
const Stack = createNativeStackNavigator();

//App Icon 
const AppIcon = () => <Image source={require('../../assets/white_icon.png')} style={{width:35,height:35}}/>

// function to generate options object for any screen,
// constructing its `title` prop based on route `params` passed to it and setting it to a given default title otherwise.
const generateProvidersParams = (defaultTitle) => ({route}) => ({title:(route ?. params ?. headerTitle) || defaultTitle})

/** @type {import('@react-navigation/native').Theme} */
const theme = {
  colors: {
    "background": "rgb(242, 242, 242)",
    "border": "rgb(216, 216, 216)",
    "card": tw.color('primary'),
    "notification": tw.color('accent'),
    "primary": tw.color('primary'),
    "text": tw.color('light'),
  },
  "dark": false,
}

const Navigation = () => {
  const isSignedIn = useSelector(state => state.user.isSignedIn);
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{animation:'slide_from_right'}}>
        {
          isSignedIn ? (
            <Stack.Screen name="UserScreen" component={UserScreen} options={{headerShown:false}}/>
          ) : (
            <Stack.Group screenOptions={{headerShown:false}}>
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
            headerTitleStyle:tw`text-center font-sans-semibold text-lg text-light`,
            headerTintColor:tw.color('light'),//back icon doesn't change to white unless this property is set
            statusBarStyle:'light',
            headerRight:AppIcon,
            animationTypeForReplace:'push'
          }}
        >
          <Stack.Screen name="NetworkProviders" component={NetworkProvidersScreen} options={generateProvidersParams('Network Providers')}/>
          <Stack.Screen name="AirtimeScreen" component={AirtimeScreen} options={generateProvidersParams('Airtime Top-Up')}/>
          <Stack.Screen name="DataScreen" component={DataScreen} options={generateProvidersParams('Data Top-Up')}/>
          <Stack.Screen name="ElectricityScreen" component={ElectricityScreen} options={{headerTitle:'Electricity Recharge'}}/>
          <Stack.Screen name="CableScreen" component={CableScreen} options={{headerTitle:'Cable Subscription'}}/>
          <Stack.Screen name="ScratchCardScreen" component={ScratchCardScreen} options={{headerTitle:'Buy Scratch Cards'}}/>
          <Stack.Screen name="TransactionReviewScreen" component={TransactionReviewScreen} options={{headerTitle:'Transaction Review'}}/>
          <Stack.Screen name="BankTransferScreen" component={BankTransferScreen} options={{headerTitle:'Bank Transfer Payment'}}/>
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
