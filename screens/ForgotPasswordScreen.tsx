import React from "react";
import tw from "../lib/tailwind";
import CurvedButton from "../components/Button";
import { ImageBackground, Image } from "react-native";
import { Divider, TextInput } from "react-native-paper";
import Text, { View } from "../components/Themed";
import { AntDesign as Icon } from "@expo/vector-icons";
import { RootStackScreenProps } from "../types";

//Images
const appIcon = require("../assets/images/icon.png");

const ForgotPasswordScreen = ({
  navigation,
}: RootStackScreenProps<"Forgot-Password">) => {
  return (
    <View style={tw`mx-auto w-full h-full px-4 mt-8 bg-transparent`}>
      <Image
        source={appIcon}
        style={{
          width: 100,
          height: 100,
          resizeMode: "contain",
          alignSelf: "center",
          flexGrow: 0,
        }}
      />
      <Text type="title" style={tw`text-center`}>
        We All Forget, Don't Worry.
      </Text>
      <Divider style={tw`h-1 bg-primary rounded-full w-32 mx-auto mt-2`} />
      <Text style={tw`mt-5 text-center`}>
        Just enter your e-mail address below and we'll help you get back to your
        account.
      </Text>
      <TextInput
        autoCompleteType={"off"}
        underlineColor="transparent"
        underlineColorAndroid="transparent"
        label="Email Address"
        theme={{ colors: { primary: tw.color("primary") } }}
        style={tw.style(`bg-white mb-3 mt-9 font-sans justify-center p-1.5`, {
          elevation: 3,
        })}
        textContentType="emailAddress"
        mode="flat"
        left={
          <TextInput.Icon
            hasTVPreferredFocus={true}
            tvParallaxProperties={null}
            name="email"
            style={tw`mt-5`}
          />
        }
      />
      <CurvedButton
        label="Regain Access"
        style={tw`mt-5`}
        onPress={undefined}
        rightNode={
          <Icon name="rightcircleo" size={20} color={tw.color("secondary")} />
        }
      />
    </View>
  );
};

export default ForgotPasswordScreen;
