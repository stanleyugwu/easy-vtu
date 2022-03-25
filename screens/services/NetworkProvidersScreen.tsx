import React from "react";
import { ImageBackground, StatusBar } from "react-native";
import Text, { View } from "../../components/Themed";
import SafeArea from "../../components/CustomSafeAreaView";
import ImageButton from "../../components/ImageButton";

// Assets
const mtnLogo = require("../../assets/images/providers/MTN_LOGO.png");
const airtelLogo = require("../../assets/images/providers/AIRTEL_LOGO.png");
const gloLogo = require("../../assets/images/providers/GLO_LOGO.png");
const etisalatLogo = require("../../assets/images/providers/9MOBILE_LOGO.jpeg");

import tw from "../../lib/tailwind";
import FlashView from "../../components/FlashView";
import { useSelector } from "react-redux";
import RecipientTypeModal from "../../components/RecipientTypeModal";
import withTile from "../../hooks/withTile";
import remoteConfig from "@react-native-firebase/remote-config";

import type { RootStackScreenProps, RootStackParamList } from "../../types";
import type { RemoteConfig } from "../../types";

export type NetworkProvidersNames =
  | "Mtn"
  | "Glo"
  | "Airtel"
  | "9Mobile"
  | "Ntel"
  | "Smile";
type ProvidersPrefixes = Record<NetworkProvidersNames, Array<string>>;

const providersPrefixes: ProvidersPrefixes = {
  Mtn: ["0803", "0806", "0703", "0706", "0813", "0816", "0810", "0814", "0903"],
  Glo: ["0805", "0807", "0705", "0815", "0811", "0905"],
  Airtel: ["0802", "0808", "0708", "0812", "0701", "0902"],
  "9Mobile": ["0809", "0818", "0817", "0909"],
  Ntel: ["0804"],
  Smile: ["0702"],
};

/**
 * Renders network providers to select from for a service
 * with the intent to make this screen polymorphic for airtime and data services,
 * routing to this screen requires that a route param object with at-least two properties
 * `serviceType` and `headerTitle` is passed to it.
 *
 * 1. **headerTitle** will be used at navigator level to determine whate title to show in screen header
 * 2. **serviceType** will be used to determine the type of service this screen is intended for. e.g **Airtime**
 * the label text which `imageButton` component will display is constructed from this prop e.g `'Mtn'+ 'Airtime'`,
 * and the screen name each `imageButton` will navigate to is also constructed from this property e.g `navigate('Airtime'+'Screen')`
 */
const NetworkProvidersScreen = ({
  route,
  navigation,
}: RootStackScreenProps<"NetworkProviders">) => {
  //destructure params passed to screen
  const { serviceType = "Airtime" } = route.params;

  const isSignedIn = useSelector((state) => state.user.isSignedIn);
  const phoneNumber = useSelector((state) => state.user.profile.phone);

  const [rcptModalVisible, setRcptModalVisible] = React.useState(true);

  const navigationRoute = (serviceType + "Screen") as keyof RootStackParamList; //dynamic, constructed navigation route name
  const titleBackhalf = serviceType + " Top-Up"; //dynamic, constructed route headerTitle back-half string

  //this will be populated with user's network name if gotten
  let usersProvider: string;

  // remote-config values for active network provider
  const networkProviders = JSON.parse(
    remoteConfig().getValue("supportedAirtimeNetworkProviders").asString()
  ) as RemoteConfig.SupportedAirtimeNetworkProviders;

  const handleRecipientTypeSelect = React.useCallback((type) => {
    if (type === "Others") setRcptModalVisible(false);
    else if (type === "My Self" && usersProvider) {
      let p = usersProvider;
      let logoSrc =
        p == "Mtn"
          ? mtnLogo
          : p == "Glo"
          ? gloLogo
          : p == "Airtel"
          ? airtelLogo
          : p == "9Mobile"
          ? etisalatLogo
          : mtnLogo;

      navigation.replace(navigationRoute, {
        /* Passing `headerTitle` to a screen when navigating to it will set the screen's header Title automatically */
        headerTitle: usersProvider + " " + titleBackhalf,
        networkName: usersProvider,
        providerLogoSrc: logoSrc,
        recipientType: "My Self",
      });
    } else {
      console.error(
        "invalid type returned from RecipientTypeModal `onSelect` callback"
      );
      setRcptModalVisible(false);
    }
  }, []);

  const detectUserCarrier = React.useCallback(() => {
    let phone = "" + phoneNumber;
    if (!phone.startsWith("+234")) return;
    if (!isSignedIn) return;

    let phoneWithoutDialCode = phone.slice(4);
    let prefix: string;
    if (phoneWithoutDialCode.startsWith("0")) {
      //handle case where number has `0` prefix
      prefix = phoneWithoutDialCode.slice(0, 4);
    } else {
      //handle case where number doesn't have `0` prefix
      prefix = "0" + phoneWithoutDialCode.slice(0, 3);
    }

    for (let provider in providersPrefixes) {
      let prefixes = providersPrefixes[provider as keyof ProvidersPrefixes];
      if (prefixes.indexOf(prefix) > -1) {
        usersProvider = provider;
        break;
      }
    }
  }, []);

  const goBackHome = React.useCallback(() => {
    navigation.goBack();
  }, []);

  React.useEffect(() => {
    detectUserCarrier();
  }, []);

  return (
    <SafeArea style={tw`h-full`}>
      {!rcptModalVisible || !isSignedIn ? (
        <View style={tw`bg-transparent`}>
          <Text
            type="title"
            style={tw`my-6 text-center text-on-background mx-5`}
          >
            Which network are you topping up?
          </Text>
          {networkProviders.includes("mtn") ? (
            <FlashView delay={250} bounciness={5}>
              <ImageButton
                label={"Mtn " + serviceType}
                imgSrc={mtnLogo}
                onPress={() =>
                  navigation.replace(navigationRoute, {
                    headerTitle: "Mtn " + titleBackhalf,
                    networkName: "Mtn",
                    providerLogoSrc: mtnLogo,
                    recipientType: "Others",
                  })
                }
              />
            </FlashView>
          ) : null}

          {networkProviders.includes("airtel") ? (
            <FlashView delay={350} bounciness={5}>
              <ImageButton
                label={"Airtel " + serviceType}
                imgSrc={airtelLogo}
                onPress={() =>
                  navigation.replace(navigationRoute, {
                    headerTitle: "Airtel " + titleBackhalf,
                    networkName: "Airtel",
                    providerLogoSrc: airtelLogo,
                    recipientType: "Others",
                  })
                }
              />
            </FlashView>
          ) : null}

          {networkProviders.includes("9mobile") ? (
            <FlashView delay={450} bounciness={5}>
              <ImageButton
                label={"9Mobile " + serviceType}
                imgSrc={etisalatLogo}
                onPress={() =>
                  navigation.replace(navigationRoute, {
                    headerTitle: "9Mobile " + titleBackhalf,
                    networkName: "9Mobile",
                    providerLogoSrc: etisalatLogo,
                    recipientType: "Others",
                  })
                }
              />
            </FlashView>
          ) : null}

          {networkProviders.includes("glo") ? (
            <FlashView delay={550} bounciness={5}>
              <ImageButton
                label={"Glo " + serviceType}
                imgSrc={gloLogo}
                onPress={() =>
                  navigation.replace(navigationRoute, {
                    headerTitle: "Glo " + titleBackhalf,
                    networkName: "Glo",
                    providerLogoSrc: gloLogo,
                    recipientType: "Others",
                  })
                }
              />
            </FlashView>
          ) : null}
        </View>
      ) : null}
      {isSignedIn && rcptModalVisible ? (
        <RecipientTypeModal
          onSelect={handleRecipientTypeSelect}
          customTitle={`Who Are You Buying ${serviceType} For?`}
          overlayColor="#000c"
          activeIndex={0}
          onRequestClose={goBackHome}
          onBackgroundTouch={goBackHome}
        />
      ) : null}
    </SafeArea>
  );
};
export default React.memo(withTile(NetworkProvidersScreen, 2));
