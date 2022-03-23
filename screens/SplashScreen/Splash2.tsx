import React from "react";
import { Image } from "react-native";
import Text from "../../components/Themed";
import FadeInView from "../../components/FadeInView";
import tw from "../../lib/tailwind";

//@ts-ignore
import splashImg from "../../assets/images/splash-images/img-2.png";

const Splash2 = () => (
  <FadeInView style={tw`mx-auto items-center p-3`}>
    <Image
      source={splashImg}
      style={{ width: 220, height: 220, flexShrink: 0, flexGrow: 0 }}
    />
    <Text type="title" style={tw`mt-5 text-on-primary`}>
      Buy with ease
    </Text>
    <Text style={tw`text-on-primary mt-1`}>
      Second Splash Very long text Very long text Very long text Very long text
      Very long text Very long text
    </Text>
  </FadeInView>
);

export default React.memo(Splash2);
