import React from "react";
import { ImageBackground, StatusBar } from "react-native";
import Text, { View } from "../../components/Themed";
import CurvedButton from "../../components/Button";
import FadeInView from "../../components/FadeInView";
import tw from "../../lib/tailwind";

// @ts-ignore
import splashBg from "../../assets/images/splash-bg.jpg";
import { ScrollView } from "react-native-gesture-handler";
import { RootStackScreenProps } from "../../types";

/**
 * Final splash screen that renders sign-up, sign-in and quick-sub buttons
 */
const LandingScreen = ({ navigation }: RootStackScreenProps<"Landing">) => {
  navigation.setOptions({ animation: "slide_from_left" });

  const signupCallback = React.useCallback(() => {
    navigation.navigate("Sign-Up");
  }, []);

  const signinCallback = React.useCallback(() => {
    navigation.navigate("Sign-In");
  }, []);

  const quicksubCallback = React.useCallback(() => {
    navigation.navigate("QuickSub");
  }, []);

  return (
    <ImageBackground
      source={splashBg}
      style={{ width: "100%", height: "100%" }}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          backgroundColor: "#2d3e61cc",
          justifyContent: "center",
        }}
      >
        <StatusBar
          translucent
          backgroundColor={"transparent"}
          barStyle="light-content"
        />
        <Text type="heading" style={tw`text-on-primary text-center`}>
          Start Topping Up Now!
        </Text>
        <Text type="title" style={tw`mb-6 text-on-primary text-center`}>
          Write Up Write Up
        </Text>

        <View style={tw`px-2 bg-transparent`}>
          <FadeInView delay={200} slideUp={true}>
            <CurvedButton
              bgColor={tw.color("on-primary")}
              labelColor={tw.color("primary")}
              label="CREATE ACCOUNT"
              dropShadow={false}
              style={tw.style(`my-4`)}
              leftIconName="person-add-outline"
              onPress={signupCallback}
            />
          </FadeInView>

          <FadeInView delay={300} slideUp={true}>
            <CurvedButton
              bgColor={tw.color("on-primary")}
              labelColor={tw.color("primary")}
              label="SIGN IN"
              dropShadow={false}
              leftIconName="enter-outline"
              style={tw.style("mb-4")}
              onPress={signinCallback}
            />
          </FadeInView>

          <FadeInView delay={400} slideUp={true}>
            <CurvedButton
              bgColor={tw.color("secondary")}
              labelColor={tw.color("primary")}
              dropShadow={false}
              label="CONTINUE WITHOUT LOGIN"
              onPress={quicksubCallback}
            />
          </FadeInView>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default LandingScreen;
