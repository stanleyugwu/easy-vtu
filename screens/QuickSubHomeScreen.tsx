import React from "react";
import Text, { View } from "../components/Themed";
import ScreenContainer from "../components/CustomSafeAreaView";
import tw from "../lib/tailwind";
import Services from "../components/Services";
import withTile from "../hooks/withTile";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

import type { RootStackScreenProps } from "../types";
import Announcement from "../components/Announcement";
import RatingModal from "../components/RatingModal";
import checkAppUpdates from "../utils/checkAppUpdates";

const QuickSubHomeScreen = ({
  navigation,
}: RootStackScreenProps<"QuickSub">) => {
 
  React.useEffect(() => {
    // check for and download app updates
    checkAppUpdates();
  },[]);
  
  return (
    <ScreenContainer style={tw.style(`p-0 h-full`)}>
      <View style={tw.style("w-full bg-primary py-1",{borderBottomLeftRadius:50,borderBottomRightRadius:50})}>
        <Icon
          name="arrow-left"
          style={tw`text-on-primary text-2xl absolute top-1/4 left-6 z-40`}
          onPress={() => navigation.goBack()}
        />
        <Text type="title" style={tw`mt-2 text-on-primary text-center`}>
          Quick Top-Up
        </Text>
        <Text style={tw`mb-3 text-on-primary text-center`}>
          No Registeration Needed.
        </Text>
      </View>
      <Text type="title" style={tw`mt-10 mb-5 text-center text-on-background`}>
        What do you want to do?
      </Text>
      <RatingModal/>
      <Services />
      <Announcement/>
    </ScreenContainer>
  );
};

export default withTile(QuickSubHomeScreen, 3);
