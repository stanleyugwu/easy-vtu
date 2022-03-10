import React from "react";
import { Image } from "react-native";
import { Title } from "../../components/Type";
import FadeInView from "../../components/FadeInView";
import splashImg from "../../assets/images/splash-images/img-1.jpg";
import Text from "../../components/Themed";
import tw from "../../lib/tailwind";

const Splash1 = () => (
  <FadeInView containerStyle={tw`mx-auto items-center p-3`}>
    <Image
      source={splashImg}
      style={{ width: 220, height: 220, flexShrink: 0, flexGrow: 0 }}
    />
    <Text type="title" style={tw`mt-5`}>Buy With Ease</Text>
    <Text style={tw`mt-1`}>
      Very long text Very long text Very long text Very long text Very long text
      Very long text Very long text
    </Text>
  </FadeInView>
);

export default React.memo(Splash1);
