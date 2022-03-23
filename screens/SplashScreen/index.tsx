import React, { SetStateAction } from "react";
import ScreenContainer from "../../components/CustomSafeAreaView";
import { TouchableOpacity, StatusBar, ImageBackground } from "react-native";
import tw from "../../lib/tailwind";
import RoundButton from "../../components/RoundButton";
import SlideCounterDots from "../../components/SlideCounterDots";
import Text, { View } from "../../components/Themed";
import BackButton from "../../components/BackButton";

// splash screens
import Splash1 from "./Splash1";
import Splash2 from "./Splash2";
import Splash3 from "./Splash3";

// @ts-ignore
import splashBg from "../../assets/images/splash-bg.jpg";
import { RootStackScreenProps } from "../../types";

export type SplashScreenIndexes = 1 | 2 | 3;

/**
 * Renders app splash screens which serves as onboard
 */
const SplashScreen = ({ navigation }: RootStackScreenProps<"Splash">) => {
  
  const [currentSplashScreen, setCurrentSplashScreen] =
    React.useState<SplashScreenIndexes>(1);

  const activeSplashScreen = React.useMemo(() => {
    return currentSplashScreen == 1 ? (
      <Splash1 />
    ) : currentSplashScreen == 2 ? (
      <Splash2 />
    ) : (
      <Splash3 />
    );
  }, [currentSplashScreen]);

  //memoize callback to be passed to back button
  const backBtnPressHandler = React.useCallback(() => {
    const nextScreenIndex =
      currentSplashScreen > 1 ? currentSplashScreen - 1 : 1;
    setCurrentSplashScreen(
      nextScreenIndex as SetStateAction<SplashScreenIndexes>
    );
  }, [currentSplashScreen]);

  //memoize callback to be passed to back button
  const frontBtnPressHandler = React.useCallback(() => {
    const nextScreenIndex =
      currentSplashScreen < 3 ? currentSplashScreen + 1 : 3;
    setCurrentSplashScreen(
      nextScreenIndex as SetStateAction<SplashScreenIndexes>
    );
  }, [currentSplashScreen]);

  //memoize slide counter dots component
  const slideCounterDots = React.useMemo(
    () => (
      <View style={tw`items-center my-5 bg-transparent`}>
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
        <Text style={tw`text-xl text-on-primary`}>SKIP</Text>
      </TouchableOpacity>
    ),
    []
  );

  return (
    <ImageBackground
      source={currentSplashScreen === 3 ? splashBg : undefined}
      style={{ width: "100%", height: "100%" }}
      resizeMode="cover"
    >
      <StatusBar backgroundColor={tw.color("primary")} />
      <ScreenContainer
        style={tw.style(
          `bg-primary h-full`,
          currentSplashScreen === 3 && { opacity: 0.8 }
        )}
      >
        {currentSplashScreen == 3 ? (
          <BackButton
            onPress={backBtnPressHandler}
            textStyle={tw`text-on-primary`}
            iconStyle={tw`text-on-primary`}
          />
        ) : null}

        {/* active splash screen will be shown here */}
        <View
          style={{ zIndex: 99999, opacity: 1, backgroundColor: "transparent" }}
        >
          {activeSplashScreen}
        </View>

        {/* Bottom Slider */}
        <View style={{ backgroundColor: "transparent" }}>
          {/* Slider Dots */}
          {currentSplashScreen < 3
            ? slideCounterDots //react component
            : null}

          {/* Slider Buttons */}
          <View
            style={tw`px-5 mt-14 flex-row justify-between items-center bg-transparent`}
          >
            {/* skip or back round button */}
            {currentSplashScreen == 1 ? (
              SkipButton //react element
            ) : currentSplashScreen === 2 ? (
              <RoundButton
                icon="arrow-left"
                iconColor={tw.color("primary")}
                size={35}
                gradient={[tw.color("on-primary"), tw.color("on-primary")]}
                onPress={backBtnPressHandler}
              />
            ) : null}

            {/* front round button */}
            {currentSplashScreen < 3 ? (
              <RoundButton
                icon="arrow-right"
                iconColor={tw.color("primary")}
                gradient={[tw.color("on-primary"), tw.color("on-primary")]}
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
