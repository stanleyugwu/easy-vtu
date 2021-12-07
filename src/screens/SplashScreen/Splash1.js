import React from "react";
import { Image } from "react-native";
import Text, { Title } from "../../components/Type";
import tw from "../../lib/tailwind";
import FadeInView from "../../components/FadeInView";
import splashImg from "../../../assets/splash-images/img-1.jpg";

const Splash1 = () => (
  <FadeInView containerStyle={tw`mx-auto items-center p-3`}>
    <Image
      source={splashImg}
      style={{ width: 220, height: 220, flexShrink: 0, flexGrow: 0 }}
    />
    <Title style={tw`mt-5 text-accent`}>Buy with ease</Title>
    <Text style={tw`text-light mt-1`}>
      Very long text Very long text Very long text Very long text Very long text
      Very long text Very long text
    </Text>
  </FadeInView>
);

export default React.memo(Splash1);
