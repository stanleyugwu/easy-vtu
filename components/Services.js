import React from "react";
import ServiceCard from "./ServiceCard";
import tw from "../lib/tailwind";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

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
        bounciness={10}
        title="Buy Airtime"
        iconSrc={require("../assets/images/service_icons/airtime.png")}
        onPress={(_) =>
          navigation.navigate("NetworkProviders", {
            headerTitle: "Airtime Top-Up",
            serviceType: "Airtime",
          })
        }
      />
      <ServiceCard
        animationDelay={400}
        bounciness={10}
        title="Buy Data"
        iconSrc={require("../assets/images/service_icons/data.png")}
        onPress={(_) =>
          navigation.navigate("NetworkProviders", {
            headerTitle: "Data Top-Up",
            serviceType: "Data",
          })
        }
      />
      <ServiceCard
        animationDelay={500}
        bounciness={10}
        title="Buy Electricity"
        containerStyle={tw`my-3`}
        iconSrc={require("../assets/images/service_icons/electricity.png")}
        onPress={(_) => navigation.navigate("NetworkProviders")}
      />

      <ServiceCard
        animationDelay={600}
        bounciness={10}
        title="Tv Cable"
        containerStyle={tw`my-3`}
        iconSrc={require("../assets/images/service_icons/cable.png")}
        onPress={(_) => navigation.navigate("NetworkProviders")}
      />
      <ServiceCard
        animationDelay={700}
        bounciness={10}
        title="Scratch Card"
        iconSrc={require("../assets/images/service_icons/card.png")}
        onPress={(_) => navigation.navigate("NetworkProviders")}
      />
      <ServiceCard
        animationDelay={800}
        bounciness={10}
        iconSrc={require("../assets/images/service_icons/more.png")}
      />
    </ScrollView>
  );
};

export default React.memo(Services);
