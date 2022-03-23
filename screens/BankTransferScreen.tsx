import React from "react";
import Text, { View } from "../components/Themed";
import SafeAreaView from "../components/CustomSafeAreaView";
import tw from "../lib/tailwind";
import appStyles from "../lib/appStyles";
import type { RootStackScreenProps } from "../types";

/**
 * Renders bank details for payment
 */
const BankTransferScreen = ({
  route,
}: RootStackScreenProps<"BankTransferScreen">) => {
  const amountToTransfer = route.params.transferAmount;
  return (
    <SafeAreaView>
      <Text type="title" style={tw`mt-2 text-center text-on-background`}>
        Pay Through Bank Transfer
      </Text>
      <Text style={tw`text-center text-on-background`}>
        Make a transfer using the below bank details to complete your
        transaction
      </Text>

      <View
        style={[tw`mt-6 p-4 bg-surface`, appStyles.boxShadowSmall]}
        accessibilityLabel="bank information container"
      >
        <Text type="body2" style={tw`text-on-surface`}>
          Bank Name
        </Text>
        <Text accessibilityLabel="bank name" type="subTitle">
          GT Bank
        </Text>

        <Text type="body2" style={tw`mt-4`}>
          Account Number
        </Text>
        <Text
          style={tw.style(`mb-4 mt-1.5`, {
            fontFamily: "monospace",
            fontWeight: "700",
            letterSpacing: 5,
            fontSize: 23,
          })}
          accessibilityLabel="bank account number"
        >
          0561435285
        </Text>

        <Text type="body2">Amount</Text>
        <Text style={tw`text-3xl`} accessibilityLabel="bank name">
          {"\u20A6"}
          {amountToTransfer}
        </Text>
      </View>
      <Text type="body2" style={tw`mt-4 hidden text-sm font-sans-semibold`}>
        Note: Ensure you transfer the exact amount specified; Otherwise, EasyVtu
        won't be liable for any refunds.
      </Text>
    </SafeAreaView>
  );
};

export default BankTransferScreen;
