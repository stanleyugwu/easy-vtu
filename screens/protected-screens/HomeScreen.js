import React from "react";
import { useSelector } from "react-redux";
import Services from "../../components/Services";
import Header from "../../components/Header";
import {
  ScrollView,
  StatusBar,
  View,
  Dimensions,
  SafeAreaView,
  GestureResponderEvent,
  ImageBackground,
} from "react-native";
import tw from "../../lib/tailwind";
import { DrawerLayout } from "react-native-gesture-handler";
import Drawer from "../../components/Drawer";

/**
 * @typedef {Object} DrawerItemType
 * @property {string} iconName Name of `Ionicon` icon to display for item
 * @property {string} label Text label for item
 * @property {(event: GestureResponderEvent) => void} onPress Function to be called when the item in slected
 * @property {(route: navigationRouteString) => void} _navigate This function is dynamically injected to each item object.
 * It adds logic to navigate screens from any item method when called with a route name.
 */

/**
 * @type {array[import("../../components/Drawer").DrawerItemProp]} Array of upper drawer items of `Drawer` component
 */
const upperDrawerItems = [
  {
    iconName: "home",
    label: "Home",
    onPress: function () {
      this._navigate("Home");
    },
  },
  {
    iconName: "person",
    label: "Profile",
    onPress: function () {
      this._navigate("Profile");
    },
  },
  {
    iconName: "wallet-sharp",
    label: "Wallet",
    onPress() {
      this._navigate("Wallet");
    },
  },
  {
    iconName: "ios-swap-horizontal",
    label: "Transactions",
    onPress() {
      this._navigate("Home");
    },
  },
  { iconName: "ios-call", label: "Contact Us", onPress: () => null },
  {
    iconName: "ios-share-social",
    label: "Tell a friend",
    onPress: () => null,
  },
  {
    iconName: "md-help-circle",
    label: "Help/Feedback",
    onPress: () => null,
  },
];

const HomeScreen = ({ navigation }) => {
  //profile selector
  const profile = useSelector((state) => state.user.profile);

  // register refs
  const screenWidth = React.useRef(Dimensions.get("window").width).current;
  var drawerRef = React.useRef(null);

  /** memoized function to open side drawer*/
  const openDrawer = React.useCallback(() => {
    drawerRef.current.openDrawer();
  });

  /** memoized function to close side drawer*/
  const closeDrawer = React.useCallback(() => {
    drawerRef.current.closeDrawer();
  });

  // Drawer items array are defined differently, and the onPress method of each object in the array
  // need to be able to navigate to another screen from within, so it needs to be given the `navigate`
  // method from `navigator`.
  // => SOLUTION: loop through the array, and `bind` the `onPress` method of every object to an object
  // that has the appropriate `this` binding of the `onPress`, plus a `_navigate` method that will take care
  // of navigating screens and closing the drawer. A new array would be generated and used instead of normal
  let drawerUpItems = React.useMemo(() => upperDrawerItems.map((item) => {
    return {
      ...item,
      //redefine onPress with new binding
      onPress: item?.onPress?.bind({
        ...item, // include appropriate this bind
        _navigate(route) {
          navigation?.navigate?.(route);
          closeDrawer?.();
        },
      }),
    };
  }));

  /** callback passed to `Header` to navigate to wallet screen to add money */
  const walletAddCallback = React.useCallback(() => {
    navigation.navigate("Wallet");
  });

  /** callback passed to `Drawer` to be invoked when wallet add button is pressed*/
  const onAvatarPressCb = React.useCallback(() =>
    navigation.navigate("Profile")
  );

  /** memoized Drawer component */
  const drawer = React.useCallback(() => (
      <View style={tw`bg-white h-full w-full`}>
        <Drawer
          upperItems={drawerUpItems}
          avatarUri={profile.image}
          onAvatarPress={onAvatarPressCb}
          headerTitle={profile.username || "Welcome"}
          headerSubTitle={profile.email || "easyvtu"}
        />
      </View>
  ),[profile.image, profile.username, profile.email])

  return (
    <ImageBackground
      source={require("../../assets/images/drawer_bg.jpg")}
      style={tw`h-full w-full`}
    >
      <SafeAreaView
        style={[{ backgroundColor: "#192F5EDD", height: "100%", zIndex: 99 }]}
      >
        <StatusBar backgroundColor={"#192F5EDD"} animated={true} />
        <DrawerLayout
          renderNavigationView={drawer}
          statusBarAnimation="fade"
          drawerWidth={screenWidth / 2 + 130}
          overlayColor="#0009"
          enableTrackpadTwoFingerGesture={true}
          drawerBackgroundColor={tw.color("white")}
          drawerPosition={DrawerLayout.positions.Left}
          drawerType="side"
          ref={drawerRef}
        >
          <Header
            onWalletAddCb={walletAddCallback}
            onMenuPress={openDrawer}
            accessibilityLabel="home-screen header"
            wrapperStyle={{ zIndex: 999 }}
          />
          <ScrollView
            contentContainerStyle={tw.style(`h-full pt-16`, {
              backgroundColor: "#f1f1f1",
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
            })}
          >
            <Services navigation={navigation} />
          </ScrollView>
        </DrawerLayout>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default React.memo(HomeScreen);
