import React from "react";
import { ImageBackground, StatusBar, View } from "react-native";
import { Title } from "../../components/Type";
import SafeArea from "../../components/CustomSafeAreaView";
import ImageButton from "../../components/ImageButton";
import mtnLogo from "../../../assets/providers/MTN_LOGO.png";
import airtelLogo from "../../../assets/providers/AIRTEL_LOGO.png";
import gloLogo from "../../../assets/providers/GLO_LOGO.png";
import etisalatLogo from "../../../assets/providers/9MOBILE_LOGO.jpeg";
import tileBg from '../../../assets/tile_background.png';
import tw from "../../lib/tailwind";
import FlashView from "../../components/FlashView";
import { useSelector } from "react-redux";
import RecipientTypeModal from "../../components/RecipientTypeModal";
import { useNavigation } from "@react-navigation/core";

/**
 * @typedef {Object} ProvidersPrefixes contains all number prefixes for nigerian providers
 * @property {Array<string>} Mtn Array of Mtn number prefixes
 * @property {Array<string>} Glo Array of Glo number prefixes
 * @property {Array<string>} Airtel Array of Airtel number prefixes
 * @property {Array<string>} Etisalat Array of Etisalat number prefixes
 * @property {Array<string>} Ntel Array of Ntel number prefixes
 * @property {Array<string>} Smile Array of Smile number prefixes
 */
/** @type {ProvidersPrefixes} */
const providersPrefixes = {
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
const NetworkProvidersScreen = (props) => {
  //destructure params passed to screen to
  const { serviceType = "Airtime", headerTitle } = props.route.params;

  const navigation = useNavigation();
  const isSignedIn = useSelector((state) => state.user.isSignedIn);
  const phoneNumber = useSelector((state) => state.user.profile.phone);

  const [rcptModalVisible, setRcptModalVisible] = React.useState(true);

  const navigationRoute = serviceType + "Screen"; //dynamic, constructed navigation route name
  const titleBackhalf = serviceType + " Top-Up"; //dynamic, constructed route headerTitle back-half string

  //this will be populated with user's network name if gotten
  let usersProvider;

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
        headerTitle: usersProvider + " " + titleBackhalf,
        networkName: usersProvider,
        providerLogoSrc: logoSrc,
        recipientType: 'My Self'
      });
    } else {
      console.error(
        "invalid type returned from RecipientTypeModal `onSelect` callback"
      );
      setRcptModalVisible(false);
    }
  });

  const detectUserCarrier = React.useCallback(() => {
    let phone = "" + phoneNumber;
    if (!phone.startsWith("+234")) return;
    if (!isSignedIn) return;

    let phoneWithoutDialCode = phone.slice(4);
    let prefix;
    if (phoneWithoutDialCode.startsWith("0")) {
      //handle case where number has `0` prefix
      prefix = phoneWithoutDialCode.slice(0, 4);
    } else {
      //handle case where number doesn't have `0` prefix
      prefix = "0" + phoneWithoutDialCode.slice(0, 3);
    }

    for (let provider in providersPrefixes) {
      let prefixes = providersPrefixes[provider];
      if (prefixes.indexOf(prefix) > -1) {
        usersProvider = provider;
        break;
      }
    }
  });

  const goBackHome = React.useCallback(() => {
    navigation.navigate('Home');
  });

  React.useEffect(() => {
    detectUserCarrier();
  }, []);

  return (
    <ImageBackground source={tileBg} style={tw`h-full w-full`}>
      <SafeArea>
        <StatusBar backgroundColor={tw.color("primary")} />
        {(!rcptModalVisible || !isSignedIn) ? (
          <View>
            <Title style={tw`my-6`}>Select Network Provider</Title>
            <FlashView delay={250} bounciness={5}>
              <ImageButton
                label={"Mtn " + serviceType}
                imgSrc={mtnLogo}
                onPress={() =>
                  navigation.replace(navigationRoute, {
                    headerTitle: "Mtn " + titleBackhalf,
                    networkName: "Mtn",
                    providerLogoSrc: mtnLogo,
                    recipientType:'Others'
                  })
                }
              />
            </FlashView>
            <FlashView delay={350} bounciness={5}>
              <ImageButton
                label={"Airtel " + serviceType}
                imgSrc={airtelLogo}
                onPress={() =>
                  navigation.replace(navigationRoute, {
                    headerTitle: "Airtel " + titleBackhalf,
                    networkName: "Airtel",
                    providerLogoSrc: airtelLogo,
                    recipientType:'Others'
                  })
                }
              />
            </FlashView>
            <FlashView delay={450} bounciness={5}>
              <ImageButton
                label={"9Mobile " + serviceType}
                imgSrc={etisalatLogo}
                onPress={() =>
                  navigation.replace(navigationRoute, {
                    headerTitle: "9Mobile " + titleBackhalf,
                    networkName: "9Mobile",
                    providerLogoSrc: etisalatLogo,
                    recipientType:'Others'
                  })
                }
              />
            </FlashView>
            <FlashView delay={550} bounciness={5}>
              <ImageButton
                label={"Glo " + serviceType}
                imgSrc={gloLogo}
                onPress={() =>
                  navigation.replace(navigationRoute, {
                    headerTitle: "Glo " + titleBackhalf,
                    networkName: "Glo",
                    providerLogoSrc: gloLogo,
                    recipientType:'Others'
                  })
                }
              />
            </FlashView>
          </View>
        ) : null}
        {isSignedIn && rcptModalVisible ? (
          <RecipientTypeModal
            onSelect={handleRecipientTypeSelect}
            customTitle={`Who Are You Buying ${serviceType} For?`}
            overlayColor="#000c"
            activeIndex={3}
            onRequestClose={goBackHome}
            onBackgroundTouch={goBackHome}
          />
        ) : null}
      </SafeArea>
    </ImageBackground>
  );
};
export default React.memo(NetworkProvidersScreen);
