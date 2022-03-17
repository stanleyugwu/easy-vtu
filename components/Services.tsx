import React from "react";
import ServiceCard from "./ServiceCard";
import tw from "../lib/tailwind";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

// Service icons
const airtime = require("../assets/images/service_icons/airtime.png");
const data = require("../assets/images/service_icons/data.png");
const electricity = require("../assets/images/service_icons/electricity.png");
const cable = require("../assets/images/service_icons/cable.png");
const scratchCard = require("../assets/images/service_icons/card.png");
const more = require("../assets/images/service_icons/more.png");

/**
 * Renders app services in cards with `ServiceCard` component
 */
const Services = () => {
  const navigation = useNavigation();

  return (
    <ScrollView
      contentContainerStyle={tw`flex-row flex-wrap justify-around content-around p-4`}
    >
      <ServiceCard
        animationDelay={300}
        
        title="Buy Airtime"
        iconSrc={airtime}
        onPress={(_) =>
          navigation.navigate("NetworkProviders", {
            headerTitle: "Airtime Top-Up",
            serviceType: "Airtime",
          })
        }
      />
      <ServiceCard
        animationDelay={400}
        
        title="Buy Data"
        iconSrc={data}
        onPress={(_) =>
          navigation.navigate("NetworkProviders", {
            headerTitle: "Data Top-Up",
            serviceType: "Data",
          })
        }
      />
      <ServiceCard
        animationDelay={500}
        
        title="Buy Electricity"
        style={tw`my-3`}
        iconSrc={electricity}
        onPress={(_) => navigation.navigate("NetworkProviders")}
      />

      <ServiceCard
        animationDelay={600}
        
        title="Tv Cable"
        style={tw`my-3`}
        iconSrc={cable}
        onPress={(_) => navigation.navigate("NetworkProviders")}
      />
      <ServiceCard
        animationDelay={700}
        
        title="Scratch Card"
        iconSrc={scratchCard}
        onPress={(_) => navigation.navigate("NetworkProviders")}
      />
      <ServiceCard
        animationDelay={800}
        iconSrc={more}
      />
    </ScrollView>
  );
};

export default React.memo(Services);
