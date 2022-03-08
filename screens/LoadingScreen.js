import React from "react";
import { View, ImageBackground, StatusBar } from "react-native";
import tw from "../lib/tailwind";
import LottieView from "lottie-react-native";

const LoadingScreen = (props) => (
  <ImageBackground
    source={require("../assets/images/splash.png")}
    resizeMode="cover"
    style={{
      width: "100%",
      height: "100%",
      alignItems: "center",
      alignContent: "flex-end",
      justifyContent: "flex-end",
      flexDirection: "column",
    }}
  >
    <StatusBar backgroundColor={tw.color(`primary`)} animated={true} />
    <View style={tw`absolute bottom-8`}>
      <LottieView
        source={require("../assets/json/loader.json")}
        style={{ width: 80, height: 80 }}
        autoPlay={true}
        speed={3}
      />
    </View>
  </ImageBackground>
);

export default LoadingScreen;
