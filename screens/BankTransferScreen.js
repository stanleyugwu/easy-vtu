import React from "react";
import { ImageBackground } from "react-native";
import Text, { Title } from "../components/Type";
import SafeAreaView from "../components/CustomSafeAreaView";
import BoxShadowView from "../components/BoxShadowView";
import tw from "../lib/tailwind";
import tileBg from "../assets/images/tile_background.png";

/**
 * Renders bank details for payment
 */
const BankTransferScreen = ({ route }) => {
  console.log(route);
  return (
    <ImageBackground
      source={tileBg}
      style={tw`h-full w-full`}
      accessibilityRole="none"
    >
      <SafeAreaView>
        <Title style={tw`mt-2`}>Pay Through Bank Transfer</Title>
        <Text>
          Make a transfer using the below bank details to complete your
          transaction
        </Text>

        <BoxShadowView
          containerStyle={tw`mt-6 p-4`}
          accessibilityLabel="bank information container"
        >
          <Text>Bank Name</Text>
          <Title restOfProps={{ accessibilityLabel: "bank name" }}>
            GT Bank
          </Title>

          <Text style={tw`mt-4`}>Account Number</Text>
          <Title
            style={tw.style(`mb-4`, {
              fontFamily: "monospace",
              fontWeight: "700",
              letterSpacing: 5,
              fontSize: 23,
            })}
            restOfProps={{ accessibilityLabel: "bank account number" }}
          >
            0561435285
          </Title>

          <Text>Amount</Text>
          <Title
            style={tw`text-3xl`}
            restOfProps={{ accessibilityLabel: "bank name" }}
          >
            {"\u20A6"}
            {route.params.transferAmount}
          </Title>
        </BoxShadowView>
        <Text style={tw`mt-4 hidden text-sm font-sans-semibold`}>
          Note: Ensure you transfer the exact amount specified; Otherwise,
          EasyVtu won't be liable for any refunds.{" "}
        </Text>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default BankTransferScreen;
