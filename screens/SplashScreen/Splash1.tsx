import React from "react";
import { Image } from "react-native";
import FadeInView from "../../components/FadeInView";
import Text from "../../components/Themed";
import tw from "../../lib/tailwind";

//@ts-ignore
import splashImg from "../../assets/images/splash-images/img-1.jpg";

const Splash1 = () => (
  <FadeInView style={tw`mx-auto items-center p-3`}>
    <Image
      source={splashImg}
      style={{
        width: 220,
        height: 220,
        flexShrink: 0,
        flexGrow: 0,
      }}
    />
    <Text type="title" style={tw`mt-5 text-on-primary`}>
      Buy With Ease
    </Text>
    <Text style={tw`mt-1 text-on-primary`}>
      Very long text Very long text Very long text Very long text Very long text
      Very long text Very long text
    </Text>
  </FadeInView>
);

export default React.memo(Splash1);
