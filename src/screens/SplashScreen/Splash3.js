import React from "react";
import { View, Image } from "react-native";
import Text, { Title } from "../../components/Type";
import CurvedButton from "../../components/Button";
import FadeInView from "../../components/FadeInView";
import tw from "../../lib/tailwind";
import splashImg from "../../../assets/splash-images/get_started.png";
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
    <FadeInView style={tw`p-3 mx-auto w-full`} duration={300}>
      <Image
        source={splashImg}
        resizeMode="contain"
        style={{
          width: 230,
          height: 230,
          flexShrink: 0,
          flexGrow: 0,
          alignSelf: "center",
        }}
      />

      <Title style={tw`my-6`}>Start Topping Up Now!</Title>

      <View>
        <FadeInView delay={100} slideUp={true}>
          <CurvedButton
            label="CREATE AN ACCOUNT"
            containerStyle={tw.style(`my-3.5`)}
            leftIconName="person-add-outline"
            onPress={signupCallback}
          />
        </FadeInView>

        <FadeInView delay={200} slideUp={true}>
          <CurvedButton
            label="SIGN IN"
            leftIconName="enter-outline"
            containerStyle={tw.style("mb-3.5")}
            onPress={signinCallback}
          />
        </FadeInView>
        <FadeInView delay={300} slideUp={true}>
          <CurvedButton
            label="CONTINUE WITHOUT SIGN-IN"
            leftIconName="fast-food-outline"
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
