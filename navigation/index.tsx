import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

//Screens
import SignUpScreen from "../screens/SignUpScreen";
import SplashScreen from "../screens/SplashScreen/index";
import SignInScreen from "../screens/SignInScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import UserScreenNavigation from "../screens/protected-screens/UserScreenNavigation";
import QuickSubHomeScreen from "../screens/QuickSubHomeScreen";

//services screens
import AirtimeScreen from "../screens/services/AirtimeScreen";
import DataScreen from "../screens/services/DataScreen";
import ElectricityScreen from "../screens/services/ElectricityScreen";
import CableScreen from "../screens/services/CableScreen";
import ScratchCardScreen from "../screens/services/ScratchCardScreen";

//util screens
import TransactionReviewScreen from "../screens/TransactionReviewScreen";
import BankTransferScreen from "../screens/BankTransferScreen";

import tw from "../lib/tailwind";
import { Image } from "react-native";
import * as ExpoNativeSplashScreen from 'expo-splash-screen';

import type { RootStackParamList, RootState } from "../types";
import { Theme } from "@react-navigation/native";

//Create Navigation Stack
const Stack = createNativeStackNavigator<RootStackParamList>();

//App Icon
const AppIcon = () => (
  <Image
    source={require("../assets/images/white_icon.png")}
    style={{ width: 35, height: 35 }}
  />
);

// function to generate options object for any screen,
// constructing its `title` prop based on route `params` passed to it and setting it to a given default title otherwise.
const generateProvidersParams =
  (defaultTitle: string) =>
  ({ route }: any) => ({ title: route?.params?.headerTitle || defaultTitle });

const theme: Theme = {
  colors: {
    background: "#F8F8F8",
    border: "rgb(216, 216, 216)",
    card: tw.color("primary") as string,
    notification: tw.color("secondary") as string,
    primary: tw.color("primary") as string,
    text: tw.color("on-background") as string,
  },
  dark: false,
};

const Navigation = () => {
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);

  React.useEffect(() => {
    /**
     * At this point, the native splash screen is still visible.
     * Because this component takes time to render, especially when user is logged in, 
     * we'll only hide the splash screen when this component's children are rendered
     */
    ExpoNativeSplashScreen.hideAsync();
  }, [])

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ animation: "slide_from_right" }}>
        {isSignedIn ? (
          <Stack.Screen
            name="UserScreenNavigation"
            component={UserScreenNavigation}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Sign-Up" component={SignUpScreen} />
            <Stack.Screen name="Sign-In" component={SignInScreen} />
            <Stack.Screen
              name="Forgot-Password"
              component={ForgotPasswordScreen}
              options={{
                headerShown: true,
                headerTitleStyle: tw`text-center font-sans-semibold text-xl text-on-primary`,
                headerTintColor: tw.color("on-primary"),
              }}
            />
            <Stack.Screen name="QuickSub" component={QuickSubHomeScreen} />
          </Stack.Group>
        )}
        <Stack.Group
          screenOptions={{
            headerShown: true,
            headerTitleStyle: tw`text-center font-sans-semibold text-xl text-on-primary`,
            headerTintColor: tw.color("on-primary"), //back icon doesn't change to white unless this property is set
            statusBarStyle: "dark",
            headerRight: AppIcon,
            animationTypeForReplace: "push",
          }}
        >
          <Stack.Screen
            name="AirtimeScreen"
            component={AirtimeScreen}
            options={generateProvidersParams("Airtime Top-Up")}
          />
          <Stack.Screen
            name="DataScreen"
            component={DataScreen}
            options={generateProvidersParams("Data Top-Up")}
          />
          <Stack.Screen
            name="ElectricityScreen"
            component={ElectricityScreen}
            options={{ headerTitle: "Electricity Recharge" }}
          />
          <Stack.Screen
            name="CableScreen"
            component={CableScreen}
            options={{ headerTitle: "Cable Subscription" }}
          />
          <Stack.Screen
            name="ScratchCardScreen"
            component={ScratchCardScreen}
            options={{ headerTitle: "Buy Scratch Cards" }}
          />
          <Stack.Screen
            name="TransactionReviewScreen"
            component={TransactionReviewScreen}
            options={{ headerTitle: "Transaction Review" }}
          />
          <Stack.Screen
            name="BankTransferScreen"
            component={BankTransferScreen}
            options={{ headerTitle: "Bank Transfer Payment" }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
