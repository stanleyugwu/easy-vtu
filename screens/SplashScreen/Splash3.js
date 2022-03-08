import React from "react";
import { View, Image } from "react-native";
import Text, { Title } from "../../components/Type";
import CurvedButton from "../../components/Button";
import FadeInView from "../../components/FadeInView";
import tw from "../../lib/tailwind";
import splashImg from "../../assets/images/splash-images/get_started.png";
import PropTypes from "prop-types";

/**
 * Final splash screen that renders sign-up, sign-in and quick-sub buttons
 */
const Splash3 = (props) => {
  const signupCallback = React.useCallback(() => {
    props.navigate("Sign-Up");
  }, []);

  const signinCallback = React.useCallback(() => {
    props.navigate("Sign-In");
  }, []);

  const quicksubCallback = React.useCallback(() => {
    props.navigate("QuickSub");
  }, []);

  return (
    <FadeInView style={tw`p-3 mx-auto w-full bg-white`} duration={300}>
      <Image
        source={splashImg}
        resizeMode="contain"
        style={{
          width: 230,
          height: 230,
          flexShrink: 0,
          flexGrow: 0,
          opacity:0.4,
          alignSelf: "center",
          display:'none'
        }}
      />

      <Title style={tw`mt-40 text-light text-xl`}>Start Topping Up Now!</Title>
      <Title style={tw`mb-6 text-light text-xl`}>Write Up Write Up</Title>

      <View style={tw`px-2`}>
        <FadeInView delay={100} slideUp={true}>
          <CurvedButton
            bgColor={tw.color('light')}
            labelColor={tw.color('primary')}
            label="CREATE ACCOUNT"
            dropShadow={false}
            containerStyle={tw.style(`my-4`)}
            leftIconName="person-add-outline"
            onPress={signupCallback}
          />
        </FadeInView>

        <FadeInView delay={200} slideUp={true}>
          <CurvedButton
            bgColor={tw.color('light')}
            labelColor={tw.color('primary')}
            label="SIGN IN"
            dropShadow={false}
            leftIconName="enter-outline"
            containerStyle={tw.style("mb-4")}
            onPress={signinCallback}
          />
        </FadeInView>
        <FadeInView delay={300} slideUp={true} containerStyle={tw`mt-3`}>
          <CurvedButton
            bgColor={tw.color('accent')}
            labelColor={tw.color('primary')}
            dropShadow={false}
            label="CONTINUE WITHOUT LOGIN"
            onPress={quicksubCallback}
          />
        </FadeInView>
      </View>
    </FadeInView>
  );
};

Splash3.propTypes = {
  /** function to be called for navigating screens */
  navigate: PropTypes.func,
};

export default React.memo(Splash3);
