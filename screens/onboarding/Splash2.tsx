import React from "react";
import { Image, StatusBar, StyleSheet } from "react-native";
import Text from "../../components/Themed";
import tw from "../../lib/tailwind";

//@ts-ignore
import splashImg from "../../assets/images/splash-images/img-2.png";
import { ScrollView } from "react-native-gesture-handler";

const Splash2 = () => (
  <ScrollView contentContainerStyle={styles.screenContainer}>
    <StatusBar
      backgroundColor={tw.color("secondary")}
      barStyle="dark-content"
      animated
    />
    <Image
      source={splashImg}
      style={{
        width: 220,
        height: 220,
        flexShrink: 0,
        flexGrow: 0,
      }}
    />
    <Text type="title" style={tw`mt-5 text-on-surface`}>
      Buy With Ease
    </Text>
    <Text style={tw`mt-1 text-on-surface text-center`}>
      Very long text Very long text Very long text Very long text Very long text
      Very long text Very long text
    </Text>
  </ScrollView>
);
// Setting this static backgroundColor property is required by the onboarding library
Splash2.backgroundColor = tw.color("secondary");

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    padding: 15,
  },
});

export default Splash2;
