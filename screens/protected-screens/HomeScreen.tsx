import React from "react";
import { useSelector } from "react-redux";
import Services from "../../components/Services";
import Header from "../../components/Header";
import {
  ScrollView,
  StatusBar,
  View,
  Dimensions,
  ImageBackground,
} from "react-native";
import tw from "../../lib/tailwind";
import { DrawerLayout } from "react-native-gesture-handler";
import Drawer, { DrawerItemType } from "../../components/Drawer";
import { RootState, RootTabScreenProps } from "../../types";
import SafeArea from "../../components/CustomSafeAreaView";
import Announcement from "../../components/Announcement";
import checkAppUpdates from '../../utils/checkAppUpdates';

// Assets
const drawerBg = require("../../assets/images/moving_bg.gif");

const HomeScreen = ({ navigation }: RootTabScreenProps<"Home">) => {
  //profile selector
  const profile = useSelector((state: RootState) => state.user?.profile);

  // if you dont have a profile, you dont deserve to be here
  if (!profile) return null;

  React.useEffect(() => {
    // check for and download app updates
    checkAppUpdates();
  },[])

  // register refs
  const screenWidth = React.useRef(Dimensions.get("window").width).current;
  var drawerRef = React.useRef<DrawerLayout>(null);

  /** memoized function to open side drawer*/
  const openDrawer = React.useCallback(() => {
    drawerRef.current?.openDrawer?.();
  }, []);

  /** memoized function to close side drawer*/
  const closeDrawer = React.useCallback(() => {
    drawerRef.current?.closeDrawer?.();
  }, []);

  const upperDrawerItems: DrawerItemType[] = React.useMemo(
    () => [
      {
        iconName: "home",
        label: "Home",
        onItemPress: function () {
          navigation.navigate("Home");
        },
      },
      {
        iconName: "person",
        label: "Profile",
        onItemPress: function () {
          navigation.navigate("Profile");
        },
      },
      {
        iconName: "wallet-sharp",
        label: "Wallet",
        onItemPress() {
          navigation.navigate("Wallet");
        },
      },
      {
        iconName: "ios-swap-horizontal",
        label: "Transactions",
        onItemPress() {
          navigation.navigate("Home");
        },
      },
      { iconName: "ios-call", label: "Contact Us", onItemPress: () => null },
      {
        iconName: "ios-share-social",
        label: "Tell a friend",
        onItemPress: () => null,
      },
      {
        iconName: "md-help-circle",
        label: "Help/Feedback",
        onItemPress: () => null,
      },
    ],
    []
  );

  /** callback passed to `Header` to navigate to wallet screen to add money */
  const walletAddCallback = React.useCallback(() => {
    navigation.navigate("Wallet");
  }, []);

  /** callback passed to `Drawer` to be invoked when wallet add button is pressed*/
  const onAvatarPressCb = React.useCallback(
    () => navigation.navigate("Profile"),
    []
  );

  /** memoized Drawer component */
  const drawer = React.useCallback(
    () => (
      <View style={tw`bg-surface h-full w-full`}>
        <Drawer
          upperItems={upperDrawerItems}
          // @ts-ignore issue with dependency
          avatarUri={profile.image}
          onAvatarPress={onAvatarPressCb}
          headerTitle={profile.username || "Welcome"}
          headerSubTitle={profile.email || "easyvtu"}
        />
      </View>
    ),
    [profile.image, profile.username, profile.email]
  );

  return (
    <ImageBackground
      source={drawerBg}
      style={tw`h-full w-full`}
      resizeMode="cover"
      resizeMethod="resize"
    >
      <StatusBar backgroundColor={"#192F5EBB"} />
      <SafeArea
        style={[
          {
            backgroundColor: "#192F5EBB",
            height: "100%",
            zIndex: 99,
            padding: 0,
          },
        ]}
      >
        <DrawerLayout
          renderNavigationView={drawer}
          statusBarAnimation="fade"
          drawerWidth={screenWidth / 2 + 130}
          overlayColor="#0009"
          enableTrackpadTwoFingerGesture={true}
          drawerBackgroundColor={tw.color("surface")}
          drawerPosition={DrawerLayout.positions.Left as "left"}
          drawerType="slide"
          onDrawerClose={closeDrawer}
          ref={drawerRef}
        >
          <Header
            onWalletAddCb={walletAddCallback}
            onAvatarPress={() => null}
            onNotificationPress={() => null}
            onMenuPress={openDrawer}
            accessibilityLabel="home-screen header"
            style={{ zIndex: 999 }}
          />
          <ScrollView
            contentContainerStyle={tw.style(`h-full pt-16`, {
              backgroundColor: "#f1f1f1",
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
            })}
          >
            <Services />
            <Announcement />
          </ScrollView>
        </DrawerLayout>
      </SafeArea>
    </ImageBackground>
  );
};

export default HomeScreen;
