import React from "react";
import Text from "../../components/Themed";
// @ts-ignore
import PaperOnboarding from "react-native-paper-onboarding";
import { TouchableOpacity } from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";

// screens icons
import { RootStackScreenProps } from "../../types";
import tw from "../../lib/tailwind";
import Splash1 from "./Splash1";
import Splash2 from "./Splash2";

// onboarding screens
const screens = [Splash1, Splash2];
const OnboardingScreen = ({ navigation }: RootStackScreenProps<"Splash">) => {
  return (
    <>
      <PaperOnboarding screens={screens} />
      <TouchableOpacity
        style={{
          paddingHorizontal: 30,
          backgroundColor: tw.color("primary"),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          borderTopWidth: 0.5,
          borderColor: tw.color("on-primary"),
        }}
        onPress={() => navigation.replace("Landing")}
        activeOpacity={0.8}
      >
        <Text
          type="subTitle"
          style={{ padding: 15, color: tw.color("secondary") }}
        >
          Get Started
        </Text>
        <Icon
          name="chevron-forward-sharp"
          style={{ fontSize: 20, color: tw.color("secondary") }}
        />
      </TouchableOpacity>
    </>
  );
};

export default OnboardingScreen;
