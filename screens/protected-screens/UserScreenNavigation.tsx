import React from "react";
import { Ionicons as Icon } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import tw from "../../lib/tailwind";

//Screens
import HomeScreen from "./HomeScreen";
import Text, { View } from "../../components/Themed";
import ProfileScreen from "./ProfileScreen";
import ErrorBoundary from "../../components/ErrorBoundary";
import { Image } from "react-native";

//Images
//@ts-ignore
import Logo from "../../assets/images/white_icon.png";
//@ts-ignore
import WalletImage from "../../assets/images/wallet_img.png";
//@ts-ignore
import transactionsImg from "../../assets/images/transactions.png";
//@ts-ignore
import profileImg from "../../assets/images/profile.png";

import type { RootStackScreenProps, RootTabParamList } from "../../types";
import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import type { RouteProp } from "@react-navigation/native";

//list of screens that should have tab bars displayed at the bottom
const screensShouldShowTabBar = ["Home", "Wallet", "Transactions"];

//function to generate Screen option for disabling tabButton
const removeTabBtn = () => ({ tabBarButton: () => null });

//App Icon
const AppIcon = () => (
  <Image
    source={Logo}
    style={{ width: 35, height: 35, marginRight: 10, opacity: 0.8 }}
  />
);
const WalletIcon = () => (
  <Image
    source={WalletImage}
    style={{ width: 25, height: 25, marginLeft: 10 }}
  />
);
const ProfileIcon = () => (
  <Image
    source={profileImg}
    style={{ width: 35, height: 35, marginLeft: 10 }}
  />
);
const TransactionIcon = () => (
  <Image
    source={transactionsImg}
    style={{ width: 30, height: 30, marginLeft: 10 }}
  />
);

/**
 * Generates desired `Tab Navigator` screen options.
 *
 * Function extracted for readability
 * @returns {BottomTabNavigationOptions} screen options object
 */
const screenOptionGen = (
  route: RouteProp<RootTabParamList, keyof RootTabParamList>
): BottomTabNavigationOptions => ({
  headerShown: route.name == "Home" ? false : true, //only show header when not in HomeScreen
  tabBarHideOnKeyboard: true,
  headerStyle: tw`bg-primary`,
  headerTitleStyle: tw`text-on-primary font-sans-semibold`,
  headerRight: AppIcon,
  tabBarStyle: screensShouldShowTabBar.includes(route.name)
    ? tw.style(`bg-primary`, { height: 52 })
    : tw`hidden h-0`,

  //icons rendered in tab bar
  tabBarIcon: ({ focused, color, size }) => {
    let iconName: keyof typeof Icon.glyphMap | undefined;

    //set icon names
    if (route.name == "Home") iconName = "home";
    else if (route.name == "Wallet") iconName = "wallet";
    else if (route.name == "Transactions") iconName = "journal";
    else return (iconName = undefined);

    //change color on focus
    if (focused) {
      color = tw.color("secondary") as string;
      size = 25;
    } else {
      size = 22;
      color = tw.color("gray") as string;
    }

    return <Icon name={iconName} size={size} color={color} />;
  },
  tabBarLabelStyle: tw`text-gray`,
  tabBarAccessibilityLabel: "tab bar icon",
});

const WalletScreen = (props) => {
  return (
    <View>
      <Text>HELLO</Text>
    </View>
  );
};

const TransactionsScreen = (props) => {
  return (
    <View>
      <Text>Transac</Text>
    </View>
  );
};

//create tab navigator
const Tab = createBottomTabNavigator<RootTabParamList>();

const UserScreenNavigation = ({ navigation }: RootStackScreenProps<"UserScreenNavigation">) => {
  return (
    <ErrorBoundary>
      <Tab.Navigator screenOptions={({ route }) => screenOptionGen(route)}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen
          name="Wallet"
          component={WalletScreen}
          options={{ headerLeft: WalletIcon }}
        />
        <Tab.Screen
          name="Transactions"
          component={TransactionsScreen}
          options={{ headerLeft: TransactionIcon }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ ...removeTabBtn(), headerLeft: ProfileIcon }}
        />
      </Tab.Navigator>
    </ErrorBoundary>
  );
};

export default UserScreenNavigation;
