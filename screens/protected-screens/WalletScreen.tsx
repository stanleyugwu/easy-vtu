import Text, { View } from "../../components/Themed";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import tw from "../../lib/tailwind";
import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  RootTabScreenProps,
  Server,
  Transaction as TransactionType,
} from "../../types";
import appStyles from "../../lib/appStyles";
import CoinIcon from "../../assets/images/money.svg";
import WithdrawIcon from "../../assets/images/withdraw_money.svg";
import RippleButton from "../../components/RippleButton";
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
} from "react-native";
import Layout from "../../constants/Layout";
import { EvilIcons as Icon } from "@expo/vector-icons";
import AnimatedLottieView from "lottie-react-native";
import loader from "../../assets/json/loader.json";
import error from "../../assets/json/network_error_animation.json";
import myAxios from "../../adapters/instance";
import { AxiosResponse } from "axios";
import { addTransaction } from "../../store/slices/transactionsSlice";
import { addMoney, removeMoney } from "../../store/slices/walletSlice";

// Service icons
const airtime = require("../../assets/images/service_icons/airtime.png");
const data = require("../../assets/images/service_icons/data.png");
const electricity = require("../../assets/images/service_icons/electricity.png");
const cable = require("../../assets/images/service_icons/cable.png");
const scratchCard = require("../../assets/images/service_icons/card.png");
const wallet = require("../../assets/images/wallet_img.png");

export type WalletButtonProps = {
  label: string;
  image: React.ReactNode;
  onPress: (evt: GestureResponderEvent) => void;
};

export const WalletButton = ({ label, image, onPress }: WalletButtonProps) => (
  <RippleButton
    style={[
      {
        backgroundColor: tw.color("surface"),
        ...appStyles.boxShadowSmall,
      },
      tw.style(`items-center justify-center rounded-md`, { width: "45%" }),
    ]}
    onPress={onPress}
  >
    <View
      style={tw`bg-transparent items-center flex-row p-3 w-full justify-center`}
    >
      {image}
      <Text type="subTitle2" style={{ marginLeft: 4 }}>
        {label}
      </Text>
    </View>
  </RippleButton>
);

export type ServiceButtonProps = {
  label: string;
  image: ImageSourcePropType;
  onPress: (evt: GestureResponderEvent) => void;
};

export const ServiceButton = ({
  image,
  label,
  onPress,
}: ServiceButtonProps) => (
  <RippleButton style={tw`justify-center items-center mx-2`} onPress={onPress}>
    <View style={tw`justify-center items-center`}>
      <View style={tw`bg-blue-100 w-14 h-14 rounded-full p-1.5`}>
        <Image
          source={image}
          style={{ width: "100%", height: "100%", borderRadius: 9999 }}
        />
      </View>
      <Text
        type="body2"
        style={{ color: "#444", fontWeight: "600", marginTop: 4 }}
      >
        {label}
      </Text>
    </View>
  </RippleButton>
);

export type TransactionProps = TransactionType;

export const Transaction = ({
  amount,
  created_at,
  id,
  payment_method,
  service: txSvc,
  trans_no,
  updated_at,
  user_id,
}: TransactionProps) => {
  // TODO: Demand for proper response field for identifying service type
  let service = txSvc.toLowerCase();
  const serviceImage = service.includes("wallet")
    ? wallet
    : service.includes("data")
    ? data
    : service.includes("airtime")
    ? airtime
    : service.includes("electricity")
    ? electricity
    : service.includes("television") || service.includes("cable")
    ? cable
    : scratchCard;

  return (
    <View
      style={tw`flex-row bg-transparent my-1 justify-between border-b border-blue-100 items-center p-2.5`}
    >
      <View style={tw`flex-row bg-transparent items-center`}>
        <Image source={serviceImage} style={{ width: 32, height: 32 }} />
        {/* Service Image */}
        <View style={tw`ml-3 bg-transparent`}>
          <Text type="subTitle">{txSvc}</Text>
          <Text type="caption">{new Date(created_at).toDateString()}</Text>
        </View>
        {/* Title */}
      </View>

      <Text type="subTitle">
        {"\u20A6"}
        {amount}
      </Text>
      {/* Amount */}
    </View>
  );
};

const WalletScreen = ({ navigation, route }: RootTabScreenProps<"Wallet">) => {
  // quick action is an optional action this screen will perform once it loads
  // it's passed by the calling screen
  const { params: { quickAction = undefined } = {} } = route;

  const balance = useSelector((state: RootState) => state.wallet.balance);
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );
  const [requestError, setRequestError] = React.useState("");
  const dispatch = useDispatch();

  let timeoutId: NodeJS.Timeout;
  const loadTransactions = () => {
    let controller = new AbortController();
    setRequestError("");

    // cancel request after 12 seconds of no response
    timeoutId = setTimeout(() => {
      controller.abort();
      setRequestError("Sorry, your request took too long.");
    }, 12000);

    // fetch transactions
    myAxios
      .get<any, AxiosResponse<Server.GetTransactions>, undefined>(
        "api/transaction_history",
        { signal: controller.signal }
      )
      .then(({ data: { data: transactions = [] } }) => {
        clearTimeout(timeoutId);
        dispatch(addTransaction(transactions));
      })
      .catch((error: Server.RequestError) => {
        clearTimeout(timeoutId);
        setRequestError(error.message);
      });
  };

  React.useEffect(loadTransactions, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: tw.color("primary-dark") }}
    >
      <ScrollView
        style={{
          flex: 1,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: tw.color("background"),
        }}
        keyboardShouldPersistTaps="always"
      >
        <Text type="heading" style={tw`font-sans-bold mt-3 mb-4 p-4`}>
          Your Wallet
        </Text>

        <View style={{ padding: 10, backgroundColor: "transparent" }}>
          <View
            style={{
              backgroundColor: tw.color("blue-100"),
              padding: Layout.window.width > 640 ? 25 : 15,
              borderRadius: 20,
              // maxWidth: Layout.window.width > 640 ? '80%' : '100%',
              width: "100%",
              marginHorizontal: 10,
              alignSelf: "center",
              ...appStyles.boxShadow,
            }}
          >
            <Text type="overline" style={tw`text-gray mb-2`}>
              Balance
            </Text>
            <Text
              type="heading"
              style={tw`text-3xl text-on-background font-sans-semibold`}
            >
              {"\u20A6"}
              {balance}
            </Text>
            <View
              style={tw`w-full mt-4 bg-transparent items-center self-start justify-between flex-row`}
            >
              <WalletButton
                image={<CoinIcon style={{ width: 17, height: 17 }} />}
                label="Deposit"
                onPress={() => dispatch(addMoney(350))}
              />
              <WalletButton
                image={<WithdrawIcon style={{ width: 18, height: 18 }} />}
                label="Withdraw"
                onPress={() => dispatch(removeMoney(50))}
              />
            </View>
          </View>
        </View>

        <Text
          type="overline"
          style={[tw`mt-8 mb-2.5 font-sans-bold pl-4`, { color: "#666" }]}
        >
          Pay Bills
        </Text>
        <ScrollView
          contentContainerStyle={{
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "transparent",
            padding: 6,
          }}
          horizontal
        >
          <ServiceButton
            image={airtime}
            label="Airtime"
            onPress={() => navigation.navigate("AirtimeScreen")}
          />
          <ServiceButton
            image={data}
            label="Internet"
            onPress={() => navigation.navigate("DataScreen")}
          />
          <ServiceButton
            image={electricity}
            label="Electricity"
            onPress={() => navigation.navigate("ElectricityScreen")}
          />
          <ServiceButton
            image={cable}
            label="Television"
            onPress={() => navigation.navigate("CableScreen")}
          />
          <ServiceButton
            image={scratchCard}
            label="Scratch Card"
            onPress={() => navigation.navigate("ScratchCardScreen")}
          />
        </ScrollView>

        <View style={tw`bg-blue-50 p-4 mt-12 rounded-3xl`}>
          <View
            style={tw`bg-transparent flex-row justify-between items-center`}
          >
            <Text
              type="overline"
              style={[tw`font-sans-bold`, { color: "#666" }]}
            >
              History
            </Text>
            <Text
              type="body2"
              style={tw`text-primary font-sans-semibold`}
              onPress={() => navigation.navigate("Transactions")}
            >
              See all
            </Text>
          </View>

          <View style={tw`bg-transparent mt-4`}>
            {requestError ? (
              <View
                style={tw`bg-transparent justify-center items-center self-center mt-4`}
              >
                <AnimatedLottieView
                  source={error}
                  style={{ width: "100%", height: 55, alignSelf: "center" }}
                  resizeMode="contain"
                  autoPlay={true}
                  speed={2.5}
                />
                <Text type="body2" style={tw`text-center mx-4`}>
                  {requestError}
                </Text>
                <Text
                  type="button"
                  onPress={loadTransactions}
                  style={tw`text-secondary-dark my-4`}
                >
                  try again
                </Text>
              </View>
            ) : transactions === undefined ? (
              <View
                style={tw`bg-transparent justify-center items-center self-center mt-4`}
              >
                <AnimatedLottieView
                  source={loader}
                  style={{ width: "100%", height: 35, alignSelf: "center" }}
                  resizeMode="contain"
                  autoPlay={true}
                  speed={2.5}
                />
                <Text type="body2">Loading transaction history</Text>
              </View>
            ) : transactions.length == 0 ? (
              <View style={tw`bg-transparent justify-center items-center mt-8`}>
                <Icon
                  name="exclamation"
                  size={40}
                  color={tw.color("secondary-dark")}
                />
                <Text type="body2" style={tw`text-center`}>
                  You haven't carried out {"\n"} any transaction yet
                </Text>
              </View>
            ) : (
              transactions
                .slice(0, 3)
                .map((transaction) => (
                  <Transaction {...transaction} key={transaction.id} />
                ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletScreen;
