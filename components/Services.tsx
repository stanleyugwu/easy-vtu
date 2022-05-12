import React from "react";
import ServiceCard from "./ServiceCard";
import tw from "../lib/tailwind";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import type { RemoteConfig } from "../types";

// FIREBASE
import remoteConfig from "@react-native-firebase/remote-config";

// Service icons
const airtime = require("../assets/images/service_icons/airtime.png");
const data = require("../assets/images/service_icons/data.png");
const electricity = require("../assets/images/service_icons/electricity.png");
const cable = require("../assets/images/service_icons/cable.png");
const scratchCard = require("../assets/images/service_icons/card.png");

/**
 * Renders app services in cards with `ServiceCard` component
 */
const Services = () => {
  const navigation = useNavigation();
  const activeServices = JSON.parse(
    remoteConfig().getValue("activeServices").asString()
  ) as RemoteConfig.ActiveServices;

  return (
    <ScrollView
      contentContainerStyle={tw`flex-row flex-wrap justify-around content-around p-4`}
    >
      {activeServices.airtime ? (
        <ServiceCard
          animationDelay={500}
          title="Buy Airtime"
          iconSrc={airtime}
          style={tw`my-3`}
          onPress={(_) =>
            navigation.navigate("AirtimeScreen")
          }
        />
      ) : null}

      {activeServices.data ? (
        <ServiceCard
          animationDelay={600}
          title="Buy Data"
          iconSrc={data}
          style={tw`my-3`}
          onPress={(_) =>
            navigation.navigate("NetworkProviders", {
              serviceType: "Data",
            })
          }
        />
      ) : null}

      {activeServices.electricity ? (
        <ServiceCard
          animationDelay={700}
          title="Buy Electricity"
          style={tw`my-3`}
          iconSrc={electricity}
          onPress={(_) => navigation.navigate("ElectricityScreen")}
        />
      ) : null}

      {activeServices.cable ? (
        <ServiceCard
          animationDelay={800}
          title="Tv Cable"
          style={tw`my-3`}
          iconSrc={cable}
          onPress={(_) => navigation.navigate("CableScreen")}
        />
      ) : null}

      {activeServices.scratchCard ? (
        <ServiceCard
          animationDelay={1000}
          title="Scratch Card"
          style={tw`my-3`}
          iconSrc={scratchCard}
          onPress={(_) => navigation.navigate("ScratchCardScreen")}
        />
      ) : null}
    </ScrollView>
  );
};

export default React.memo(Services);
