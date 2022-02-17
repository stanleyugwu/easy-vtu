import React from "react";
import { View, ImageBackground, Alert } from "react-native";
import Text, { Title } from "../components/Type";
import PropTypes from "prop-types";
import SafeAreaView from "../components/CustomSafeAreaView";
import tileBg from "../../assets/tile_background.png";
import tw from "../lib/tailwind";
import BoxShadowView from "../components/BoxShadowView";
import PaymentMethodPicker from "../components/PaymentMethodPicker";
import Button from "../components/Button";
import LoaderModal from "../components/LoaderModal";
import { useSelector } from "react-redux";
import StatusModal from "../components/StatusModal";
import NetworkError from "../components/NetworkError";

/**
 * @typedef {Object} DiscountType
 * @property {number} discountPercentage Percentage of the discount in number
 * @property {string} discountDescription Description of the discount
 */

/**
 * @typedef {Object} TransactionReviewParameter
 * @property {"airtime" | "data" | "electricity" | "cable" | "exams"} productType The type of product about to be purchased. E.g `'airtime'`
 * @property {string} product Text describing the product. E.g `Mtn Airtime Top-Up`
 * @property {number} transactionCost The original cost of product (without discounts)
 */

/**
 * @typedef {Object} TransactionInfoData
 * @property {"airtime" | "data" | "electricity" | "cable" | "exams"} productType The type of product about to be purchased. E.g `'airtime'`
 * @property {string} product Text describing the product. E.g `Mtn Airtime Top-Up`
 * @property {number} transactionCost The original cost of product (without discounts)
 * @property {string} transactionId A unique `ID` for the transaction
 * @property {DiscountType[]} discounts A list of discounts applied to transaction
 * @property {number} totalAmount The total amount to pay after discounts and calculations
 */

/** generates unique alphanumeric id */
const uid = (length = 16) =>
  parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length));

/**
 * @param {number} transactionCost
 * @param {DiscountType[]} discounts
 * @returns {number} The final amount to be paid
 */
const calculateTotalAfterDiscounts = (transactionCost = 0, discounts = []) => {
  let amountPayable = transactionCost;
  if (discounts.length && transactionCost) {
    for (const discount of discounts) {
      const percent = (+discount.discountPercentage / 100) * transactionCost;
      amountPayable -= percent;
    }
    return amountPayable
  }
  return amountPayable
};
/**
 * Shows details of the current transaction, calculating discounts and total amount.\
 * This screen requires certain parameters of type to be passed from wherever its been routed from.
 * This parameters are:
 * - product type
 * - product description
 * - cost of the transaction (without any discounts)
 */
const TransactionReviewScreen = ({ navigation, route }) => {
  /** @type {DiscountType[]} */
  const discounts = [
    { discountPercentage: 5, discountDescription: "Xmas discount" },
    { discountPercentage: 15, discountDescription: "First Recharge" },
  ];

  /**cached unique iD for transaction.\
   * without being in `useRef`, new ID will be generated on any state change
   */
  const transactionId = React.useRef(uid());

  // payment method picker visibility state
  const [pymtMtdPickerVisible, setPymtMtdPickerVisible] = React.useState(false);
  const [paymentProcessing, setPaymentProcessing] = React.useState(false);
  const [statusModalVisible, setStatusModalVisible] = React.useState(true);
  const walletBalance = useSelector(state => state.wallet.balance);

  // handle when user selects a payment method
  const handlePaymentMethodSelection = React.useCallback((method) => {
    if (method === "transfer") {
        navigation.navigate("BankTransferScreen",{transferAmount:info.totalAmount});
    }else if(method == 'wallet'){
        setPaymentProcessing(true);
        if(info.totalAmount > walletBalance){
            setPaymentProcessing(false);
            Alert.alert("Insufficient Fund")
        }
        setTimeout(() => setPaymentProcessing(false), 10000)
    }
    closePymtMtdPane();
  }, []);

  // open payment method picker
  const openPaymentMethodPane = React.useCallback(setPymtMtdPickerVisible.bind(this,true),[]);

  // close payment method picker
  const closePymtMtdPane = React.useCallback(setPymtMtdPickerVisible.bind(this,false), []);

  //destruture given transaction info
  const { product, productType, transactionCost } = route.params;

  /** @type {TransactionInfoData} @alias info*/
  const info = React.useMemo(() => ({
    productType,
    product,
    transactionId: transactionId.current,
    transactionCost,
    discounts,
    totalAmount: calculateTotalAfterDiscounts(transactionCost, discounts),
  }));

  return (
    <ImageBackground source={tileBg} style={tw`h-full w-full`}>
      <SafeAreaView>
        {statusModalVisible ? <NetworkError onBackgroundTouch={() => setStatusModalVisible(false)}/> : null}
        <Title style={tw`my-4`}>Review Your Order</Title>
        <BoxShadowView containerStyle={tw`bg-white p-4 mb-6`}>
          {/* Type of product */}
          <Text style={tw`text-left text-gray-lighter`}>Product</Text>
          <Text style={tw`text-left mb-4 font-sans-semibold`}>
            {info.productType.toUpperCase()}
          </Text>

          {/* Product Description */}
          <Text style={tw`text-left text-gray-lighter`}>
            Product Description
          </Text>
          <Text style={tw`text-left mb-4 font-sans-semibold`}>
            {info.product}
          </Text>

          {/* Transaction ID */}
          <Text style={tw`text-left text-gray-lighter`}>Transaction ID</Text>
          <Text style={tw`text-left mb-4 font-sans-semibold`}>
            {info.transactionId}
          </Text>

          {/* Original cost of product */}
          <Text style={tw`text-left text-gray-lighter`}>Transaction Cost</Text>
          <Text style={tw`text-left font-sans-semibold`}>
            {"\u20A6"}
            {info.transactionCost}
          </Text>

          {/* Discounts applied to purchase */}
          {info.discounts?.length ? (
            <>
              <Text style={tw`text-left text-gray-lighter mt-4`}>
                Discounts
              </Text>
              {info.discounts.map((discount, idx) => (
                <Text
                  style={tw`text-left font-sans-semibold`}
                  key={idx.toString()}
                >
                  {discount.discountDescription +
                    ` (%${discount.discountPercentage})`}
                </Text>
              ))}
            </>
          ) : null}

          {/* What will be paid finally */}
          <Text style={tw`text-left text-gray-lighter mt-4`}>
            What You'll Pay
          </Text>
          <Text style={tw`text-left text-3xl font-sans-semibold`}>
            {"\u20A6"}
            {+info.totalAmount}
          </Text>
        </BoxShadowView>

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
        {paymentProcessing ? <LoaderModal loadingText="Processing Payment" /> : null}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default TransactionReviewScreen;
