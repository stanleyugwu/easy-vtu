import React from "react";
import ScreenContainer from "../../components/CustomSafeAreaView";
import {
  View,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from "react-native";
import tw from "../../lib/tailwind";
import RoundButton from "../../components/RoundButton";
import SlideCounterDots from "../../components/SlideCounterDots";
import splashBg from "../../../assets/splash-bg.jpg";
import Text from "../../components/Type";
import Splash1 from "./Splash1";
import Splash2 from "./Splash2";
import Splash3 from "./Splash3";
import BackButton from "../../components/BackButton";

/**
 * Renders app splash screens which serves as onboard
 */
const SplashScreen = (props) => {
  const [currentSplashScreen, setCurrentSplashScreen] = React.useState(1);

  const activeSplashScreen = React.useMemo(() => {
    return currentSplashScreen == 1 ? (
      <Splash1 />
    ) : currentSplashScreen == 2 ? (
      <Splash2 />
    ) : (
      <Splash3 navigate={props.navigation.navigate} />
    );
  }, [currentSplashScreen]);

  //memoize callback to be passed to back button
  const backBtnPressHandler = React.useCallback(() => {
    setCurrentSplashScreen(currentSplashScreen - 1);
  }, [currentSplashScreen]);

  //memoize callback to be passed to back button
  const frontBtnPressHandler = React.useCallback(() => {
    setCurrentSplashScreen(currentSplashScreen + 1);
  }, [currentSplashScreen]);

  //memoize slide counter dots component
  const slideCounterDots = React.useMemo(
    () => (
      <View style={tw`items-center my-5`}>
        <SlideCounterDots activeDot={currentSplashScreen} />
      </View>
    ),
    [currentSplashScreen]
  );

  const SkipButton = React.useMemo(
    () => (
      <TouchableOpacity
        style={tw`ml-2 pt-2`}
        onPress={(_) => setCurrentSplashScreen(3)}
      >
        <Text style={tw`text-xl text-light`}>SKIP</Text>
      </TouchableOpacity>
    ),
    []
  );

  return (
    <ImageBackground
      source={currentSplashScreen === 3 ? splashBg : null}
      style={{ width: "100%", height: "100%" }}
      resizeMode="cover"
    >
      <ScreenContainer
        containerStyle={tw.style(
          `bg-primary h-full`,
          currentSplashScreen === 3 && { opacity: 0.8 }
        )}
      >
        <StatusBar backgroundColor={tw.color("primary")} />
        {currentSplashScreen == 3 ? (
          <BackButton
            onPress={backBtnPressHandler}
            textStyle={tw`text-light`}
            iconStyle={tw`text-light`}
          />
        ) : null}

        {/* active splash screen will be shown here */}
        <View style={{ zIndex: 99999, opacity: 1 }}>{activeSplashScreen}</View>

        {/* Bottom Slider */}
        <View>
          {/* Slider Dots */}
          {currentSplashScreen < 3
            ? slideCounterDots //react component
            : null}

          {/* Slider Buttons */}
          <View style={tw`px-5 mt-14 flex-row justify-between items-center`}>
            {/* skip or back round button */}
            {currentSplashScreen == 1 ? (
              SkipButton //react element
            ) : currentSplashScreen > 1 && currentSplashScreen < 3 ? (
              <RoundButton
                icon="arrow-left"
                color={tw.color("primary")}
                size={35}
                gradient={[tw.color("light"), tw.color("light")]}
                onPress={backBtnPressHandler}
              />
            ) : null}

            {/* front round button */}
            {currentSplashScreen < 3 ? (
              <RoundButton
                icon="arrow-right"
                color={tw.color("primary")}
                gradient={[tw.color("light"), tw.color("light")]}
                size={35}
                onPress={frontBtnPressHandler}
              />
            ) : null}
          </View>
        </View>
      </ScreenContainer>
    </ImageBackground>
  );
};

export default SplashScreen;
