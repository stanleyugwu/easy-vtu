import React from "react";
import { ImageBackground, Alert } from "react-native";
import Text, { View } from "../components/Themed";
import PropTypes from "prop-types";
import SafeAreaView from "../components/CustomSafeAreaView";
import tw from "../lib/tailwind";
import BoxShadowView from "../components/BoxShadowView";
import PaymentMethodPicker, { PaymentMethods } from "../components/PaymentMethodPicker";
import Button from "../components/Button";
import LoaderModal from "../components/LoaderModal";
import { useSelector } from "react-redux";
import StatusModal from "../components/StatusModal";
import NetworkError from "../components/NetworkError";

import type {
  DiscountStructure,
  productType,
  RootStackScreenProps,
} from "../types";
import appStyles from "../lib/appStyles";
import withTile from "../hooks/withTile";

// Assets
const tileBg = require("../assets/images/tile_background.png");

type TransactionInfoData = {
  /** The type of product about to be purchased. E.g `'airtime'` */
  productType: productType;
  /** Text describing the product. E.g `Mtn Airtime Top-Up` */
  product: string;
  /** The original cost of product (without discounts) */
  transactionCost: number;
  /** A unique `ID` for the transaction */
  transactionId: string;
  /** A list of discounts applied to transaction */
  discounts: DiscountStructure[];
  /** The total amount to pay after discounts and calculations */
  totalAmount: number;
};

/** generates unique alphanumeric id */
const uid = (length: number = 16): number =>
  parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length));

/** Calculates th total payable amount for a service, after applying discount */
const calculateTotalAfterDiscounts = (
  transactionCost: number = 0,
  discounts: DiscountStructure[] = []
): number => {
  let amountPayable = transactionCost;
  if (discounts.length > 0 && transactionCost) {
    for (const discount of discounts) {
      const percent = (+discount.discountPercentage / 100) * transactionCost;
      amountPayable -= percent;
    }
    return amountPayable;
  }
  return amountPayable;
};

/**
 * Shows details of the current transaction, calculating discounts and total amount.\
 * This screen requires certain parameters of type to be passed from wherever its been routed from.
 * This parameters are:
 * - product type
 * - product description
 * - cost of the transaction (without any discounts)
 */
const TransactionReviewScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"TransactionReviewScreen">) => {
  const discounts: DiscountStructure[] = [
    { discountPercentage: 5, discountDescription: "Xmas discount" },
    { discountPercentage: 15, discountDescription: "First Recharge" },
  ];

  /**cached unique iD for transaction.\
   * without being in `useRef`, new ID will be generated on any state change
   */
  const transactionId = React.useRef(uid().toString());

  // payment method picker visibility state
  const [pymtMtdPickerVisible, setPymtMtdPickerVisible] = React.useState(false);
  const [paymentProcessing, setPaymentProcessing] = React.useState(false);
  const [statusModalVisible, setStatusModalVisible] = React.useState(false);
  const walletBalance = useSelector((state) => state.wallet.balance);

  // handle when user selects a payment method
  const handlePaymentMethodSelection = React.useCallback((method:PaymentMethods) => {
    if (method === "transfer") {
      navigation.navigate("BankTransferScreen", {
        transferAmount: info.totalAmount,
      });
    } else if (method == "wallet") {
      setPaymentProcessing(true);
      if (info.totalAmount > walletBalance) {
        setPaymentProcessing(false);
        Alert.alert("Insufficient Fund in wallet");
      }
      // setTimeout(() => setPaymentProcessing(false), 10000)
    }
    closePymtMtdPane();
  }, []);

  // open payment method picker
  const openPaymentMethodPane = React.useCallback(
    setPymtMtdPickerVisible.bind(this, true),
    []
  );

  // close payment method picker
  const closePymtMtdPane = React.useCallback(
    setPymtMtdPickerVisible.bind(this, false),
    []
  );

  //destruture given transaction info
  const { product, productType, transactionCost } = route.params;

  const info = React.useMemo(
    (): TransactionInfoData => ({
      productType,
      product,
      transactionId: transactionId.current,
      transactionCost,
      discounts,
      totalAmount: calculateTotalAfterDiscounts(transactionCost, discounts),
    }),
    []
  );

  return (
    <SafeAreaView>
      {statusModalVisible ? (
        <NetworkError onBackgroundTouch={() => setStatusModalVisible(false)} />
      ) : null}
      <Text type="title" style={tw`my-4 text-center text-on-background`}>
        Review Your Order
      </Text>
      <View style={[tw`bg-surface p-4 mb-6`, appStyles.boxShadowSmall]}>
        {/* Type of product */}
        <Text style={tw`text-gray`} type="body2">Product</Text>
        <Text style={tw`mb-4 text-on-surface`} type="subTitle">
          {info.productType.toUpperCase()}
        </Text>

        {/* Product Description */}
        <Text style={tw`text-gray`} type="body2">Product Description</Text>
        <Text style={tw`mb-4  text-on-surface`} type="subTitle">
          {info.product}
        </Text>

        {/* Transaction ID */}
        <Text style={tw`text-gray`} type="body2">Transaction ID</Text>
        <Text style={tw`mb-4  text-on-surface`} type="subTitle">
          {info.transactionId}
        </Text>

        {/* Original cost of product */}
        <Text style={tw`text-gray`} type="body2">Transaction Cost</Text>
        <Text type="subTitle" style={tw`text-on-surface`}>
          {"\u20A6"}
          {info.transactionCost}
        </Text>

        {/* Discounts applied to purchase */}
        {info.discounts?.length ? (
          <>
            <Text style={tw`text-gray mt-4`} type="body2">Discounts</Text>
            {info.discounts.map((discount, idx) => (
              <Text
                type="subTitle"
                style={tw`text-on-surface`}
                key={idx.toString()}
              >
                {discount.discountDescription +
                  ` (%${discount.discountPercentage})`}
              </Text>
            ))}
          </>
        ) : null}

        {/* What will be paid finally */}
        <Text style={tw`text-gray mt-4`}>What You'll Pay</Text>
        <Text style={tw`text-3xl text-on-surface`}>
          {"\u20A6"}
          {+info.totalAmount}
        </Text>
      </View>

      <Button
        label="Continue"
        rightIconName="chevron-forward"
        onPress={openPaymentMethodPane}
      />
      {pymtMtdPickerVisible ? (
        <PaymentMethodPicker
          onRequestClose={closePymtMtdPane}
          onBackgroundTouch={closePymtMtdPane}
          onMethodSelect={handlePaymentMethodSelection}
        />
      ) : null}
      {paymentProcessing ? (
        <LoaderModal loadingText="Processing Payment" />
      ) : null}
    </SafeAreaView>
  );
};

export default withTile(TransactionReviewScreen, 1);
