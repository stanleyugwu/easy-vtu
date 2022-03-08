import React from "react";
import SafeArea from "../../components/CustomSafeAreaView";
import Text from "../../components/Type";
import { View, ActivityIndicator, Image, ImageBackground } from "react-native";
import { useSelector } from "react-redux";
import CurvedButton from "../../components/Button";
import tw from "../../lib/tailwind";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import InputField from "../../components/InputField";
import tileBg from '../../assets/images/tile_background.png';
import mtnLogo from "../../assets/images/providers/MTN_LOGO.png";
import { useNavigation } from "@react-navigation/core";
import ContactPicker from "../../components/ContactPicker";
import { TouchableRipple } from "react-native-paper";

const motto = {
  mtn: "EveryWhere You Go",
  airtel: "The Smartphone Network",
  "9mobile": "Ig9ting the evolution",
  glo: "Rule Your World",
};

const LoadingIndicator = (
  <View style={tw`self-center justify-center items-center flex-1`}>
    <ActivityIndicator size={50} color={tw.color("primary")} />
  </View>
);

const AirtimeScreen = (props) => {
  const userPhone = useSelector((state) => state.user.profile.phone);

  const [screenLoaded, setScreenLoaded] = React.useState(false);
  const [contactPickerVisible, setContactPickerVisible] = React.useState(false);

  const [recipientNumber, setRecipientNumber] = React.useState("");

  const [airtimeAmount, setAirtimeAmount] = React.useState(50);

  const recipientsInputRef = React.useRef();

  const navigation = useNavigation();

  const gotoTransationReview = React.useCallback(() =>{
    /** @type {import("../TransactionReviewScreen").TransactionReviewParameter} */
    let paramObj = {
      productType:'airtime',
      product:networkName+" Airtime Top-Up",
      transactionCost:airtimeAmount,
    }
    navigation.navigate('TransactionReviewScreen',paramObj);
  });

  //destructure passed route params
  const {
    networkName = "MTN",
    providerLogoSrc = mtnLogo,
    recipientType,
  } = props.route.params;

  // set screenLoaded to true after first-render
  // this would then mount real component in place of a loader which is first mounted to enable
  // speedy transition from previous screen
  React.useEffect(() => {
    setScreenLoaded(true);
  }, []);

  //concat users phone to recipient type of 'My Self'
  const userPhoneFormatted = recipientType == "My Self" ? ` ${userPhone}` : "";

  const handleSetAirtimeAmount = React.useCallback((amount) =>
    setAirtimeAmount(amount)
  );

  const handleRecipientNumberChange = React.useCallback((text) => {
    setRecipientNumber(text);
  });

  const handleContactSelect = React.useCallback((contact) => {
    handleRecipientNumberChange(contact.phoneNumber.replace(/ /g, ""));
    closeContactPicker();
  });

  const closeContactPicker = React.useCallback(() => {
    setContactPickerVisible(false);
  });

  const openContactPicker = React.useCallback(() =>
    setContactPickerVisible(true)
  );


  const contactIcon = (
    <TouchableRipple
      rippleColor="#0009"
      style={tw`bg-gray-light rounded-full justify-center items-center p-2`}
      onPress={openContactPicker}
    >
      <Icon name="contacts" size={28} style={tw`text-primary rounded-full`} />
    </TouchableRipple>
  );

  //show a loader as rendering is delayed
  if (!screenLoaded) return LoadingIndicator;
  return (
    <ImageBackground source={tileBg} style={tw`h-full w-full`}>
      <SafeArea>
        <View style={tw`flex-row items-start pl-3 mt-1 mb-8`}>
          <View style={tw`border border-primary p-0.5 bg-white`}>
            <Image source={providerLogoSrc} style={tw`h-12 w-12`} />
          </View>
          <View style={tw`flex-col justify-start items-start ml-2`}>
            <Text style={tw`font-sans-bold`}>{networkName.toUpperCase()}</Text>
            <Text>{motto[networkName.toLowerCase()]}</Text>
          </View>
        </View>

        {/* PANE TO SELECT RECIEPIENT TYPE */}
        {recipientType === "My Self" ? (
          <InputField
            containerStyle={tw`mt-2`}
            fieldLabel="Topping Up For"
            fieldRequired={false}
            fieldLabelIcon="person"
            accessibilityLabel="network input"
            value={`${userPhoneFormatted}`}
            extraInputProps={{ editable: false, disabled: true }}
          />
        ) : null}

        {/* PANE TO ENTER RECIPIENT NUMBER */}
        <View
          style={tw.style(`mt-2`, recipientType == "My Self" ? "hidden" : "flex")}
        >
          <InputField
            fieldLabel="Recipient Mobile Number:"
            fieldLabelIcon="phone-portrait"
            ref={recipientsInputRef}
            placeholder="Enter Mobile Number"
            // fieldLabelSubtitle={ recipientType == "Others" ? "(Enter one number per line)" : null}
            accessibilityLabel="recipient numbers input"
            value={recipientNumber}
            onChangeText={handleRecipientNumberChange}
            rightInputNode={contactIcon}
            extraInputProps={{
              keyboardType: "phone-pad",
              maxLength: 20,
              accessibilityLabel: "multi-number recipients input",
              accessibilityRole: "text",
            }}
          />
        </View>

        {/* PANE TO ENTER AMOUNT*/}
        <InputField
          fieldLabel="Airtime Amount:"
          containerStyle={tw`my-4`}
          fieldLabelIcon="md-cash-outline"
          accessibilityLabel="airtime amount input"
          value={"" + airtimeAmount}
          extraInputProps={{
            keyboardType: "number-pad",
            maxLength: 6,
          }}
          onChangeText={handleSetAirtimeAmount}
        />

        {/* PANE TO SHOW AMOUNT PAYABLE */}
        {/* <InputField
          fieldLabel="Amount Payable:"
          fieldLabelSubtitle="(what you'll pay for the airtime value)"
          fieldRequired={false}
          fieldLabelIcon="md-cash-outline"
          accessibilityLabel="payable amount input"
          value={"\u20A6" + amountPayable}
          extraInputProps={{
            disabled: true,
            editable: false,
            accessibilityLabel: "disabled input showing amount payable",
            accessibilityRole: "text",
          }}
        /> */}

        <CurvedButton
          containerStyle={tw`my-2`}
          label="Buy Now"
          rightIconName="chevron-forward-circle-outline"
          onPress={gotoTransationReview}
          accessibilityRole="button"
          accessibilityLabel="cta buy airtime"
        />
        {contactPickerVisible ? (
          <ContactPicker
            onRequestClose={closeContactPicker}
            onBackgroundTouch={closeContactPicker}
            onContactSelect={handleContactSelect}
          />
        ) : null}
      </SafeArea>
    </ImageBackground>
  );
};

export default AirtimeScreen;
