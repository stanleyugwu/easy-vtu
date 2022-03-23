import React from "react";
import { Image } from "react-native";
import Text, { View } from "../../components/Themed";
import CurvedButton from "../../components/Button";
import FadeInView from "../../components/FadeInView";
import tw from "../../lib/tailwind";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";

// @ts-ignore
import splashImg from "../../assets/images/splash-images/get_started.png";

/**
 * Final splash screen that renders sign-up, sign-in and quick-sub buttons
 */
const Splash3 = () => {
  const navigation = useNavigation();

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
    <FadeInView style={tw`p-3 mx-auto w-full bg-transparent`} duration={300}>
      <Image
        source={splashImg}
        resizeMode="contain"
        style={{
          width: 230,
          height: 230,
          flexShrink: 0,
          flexGrow: 0,
          opacity: 0.4,
          alignSelf: "center",
          display: "none",
        }}
      />

      <Text type="title" style={tw`mt-40 text-on-primary text-center`}>
        Start Topping Up Now!
      </Text>
      <Text type="title" style={tw`mb-6 text-on-primary text-center`}>
        Write Up Write Up
      </Text>

      <View style={tw`px-2 bg-transparent`}>
        <FadeInView delay={100} slideUp={true}>
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

        <FadeInView delay={200} slideUp={true}>
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

        <FadeInView delay={300} slideUp={true}>
          <CurvedButton
            bgColor={tw.color("secondary")}
            labelColor={tw.color("primary")}
            dropShadow={false}
            label="CONTINUE WITHOUT LOGIN"
            onPress={quicksubCallback}
          />
        </FadeInView>
      </View>
    </FadeInView>
  );
};

export default React.memo(Splash3);
