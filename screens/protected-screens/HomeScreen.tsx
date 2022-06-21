import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Services from "../../components/Services";
import Header from "../../components/Header";
import { Alert, View } from "react-native";
import tw from "../../lib/tailwind";
import { DrawerLayout, ScrollView } from "react-native-gesture-handler";
import Drawer, { DrawerItemType } from "../../components/Drawer";
import { RootState, RootTabScreenProps } from "../../types";
import SafeArea from "../../components/CustomSafeAreaView";
import checkAppUpdates from "../../utils/checkAppUpdates";
import WalletCard from "../../components/WalletCard";
import FadeInView from "../../components/FadeInView";
import { signOut } from "../../store/slices/userSlice";
import Layout from "../../constants/Layout";
import syncProfile from "../../utils/keepProfileInSync";
import { useNetInfo } from "@react-native-community/netinfo";
import { balanceSelector } from "../../store/slices/walletSlice";
import fetchDataPlans from "../../utils/fetchDataPlans";
import { StatusBar } from "expo-status-bar";

const HomeScreen = ({ navigation }: RootTabScreenProps<"Home">) => {
  //profile selector
  const profile = useSelector((state: RootState) => state.user?.profile);
  const balance = useSelector(balanceSelector);
  const dispatch = useDispatch();
  const netinfo = useNetInfo();

  // if you dont have a profile, you dont deserve to be here
  if (!profile) return null;

  React.useEffect(() => {
    // check for and download app updates
    checkAppUpdates();
    // try get data plans
    fetchDataPlans();
  }, []);

  // Update local user profile details with server profile details
  React.useEffect(() => {
    if (netinfo.isInternetReachable) {
      syncProfile();
    }
  }, [netinfo]);

  // register refs
  const screenWidth = React.useRef(Layout.window.width).current;
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
      { iconName: "ios-call", label: "Contact Us", onItemPress: () => null },
      {
        iconName: "md-help-circle",
        label: "Help/Feedback",
        onItemPress: () => null,
      },
      {
        iconName: "exit",
        label: "Sign-Out",
        onItemPress() {
          handleSignOut();
        },
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

  /** callback to be invoked when user presses on sign out*/
  const handleSignOut = () => {
    Alert.alert("Sign out", "Are you sure you want to sign out of the app", [
      { text: "NO", style: "cancel" },
      {
        text: "SIGN OUT",
        onPress: () => {
          dispatch(signOut());
        },
      },
    ]);
  };

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
    <SafeArea
      scrollable={false}
      style={{
        height: "100%",
        padding: 0,
        backgroundColor: tw.color("primary-dark"),
      }}
    >
      <StatusBar style="light" backgroundColor={tw.color("primary-dark")} />
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
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={{
            backgroundColor: tw.color("background"),
            paddingTop: 5,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}
        >
          <FadeInView delay={400} slideUp>
            <Header
              onAvatarPress={onAvatarPressCb}
              onMenuPress={openDrawer}
              accessibilityLabel="home-screen header"
              style={{ zIndex: 999 }}
            />
          </FadeInView>
          <FadeInView slideUp delay={600}>
            <WalletCard
              balance={balance}
              style={{ marginTop: 10 }}
              onAddCallback={walletAddCallback}
            />
          </FadeInView>
          <Services />
        </ScrollView>
      </DrawerLayout>
    </SafeArea>
  );
};

export default HomeScreen;
