import { GestureResponderEvent, ScrollView } from "react-native";
import React from "react";
import { AirtimeHistoryData, NetworkCarriers } from "../types";
import ReactNativeModal from "react-native-modal";
import Layout from "../constants/Layout";
import tw from "../lib/tailwind";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import Text, { View } from "./Themed";
import RippleButton from "./RippleButton";
import appStyles from "../lib/appStyles";
import store from "../store";

const TopUpHistory = ({
  networkName,
  phoneNumber,
  date,
  onPress,
}: AirtimeHistoryData & { onPress: (evt: GestureResponderEvent) => void }) => (
  <RippleButton
    onPress={onPress}
    style={tw.style(
      `bg-surface mt-4 rounded-md justify-between`,
      appStyles.boxShadowSmall
    )}
  >
    <View style={tw`bg-transparent p-2`}>
      <Text type="subTitle2" style={tw`text-secondary-dark`}>
        <Icon name="signal-cellular-alt" />
        {NetworkCarriers[networkName]}
      </Text>
      <View style={tw`flex-row bg-transparent justify-between`}>
        <Text type="subTitle" style={{ letterSpacing: 1 }}>
          {phoneNumber}
        </Text>
        <Text type="caption" style={tw`text-gray self-end`}>
          {new Date(date).toDateString()}
        </Text>
      </View>
    </View>
  </RippleButton>
);

export type SavedAirtimeHistoryProps = {
  /**
   * Determines the type of history to display whether airtime or data
   */
  historyType: "airtime" | "data";

  /**
   * Determines whether the modal is visible or not
   */
  isVisible: boolean;

  /**
   * Calld when an attempt to close the mdodal is made e.g back button, backdrop touch, swipe
   */
  onClose: (evt: GestureResponderEvent) => void;

  /**
   * Called when an history item is pressed among the list
   */
  onHistorySelect?: (networkName: NetworkCarriers, phoneNumber: string) => void;
};

/**
 * Displays a list of saved airtime or data transactions for easy replay
 */
const SavedHistory = ({
  isVisible = false,
  historyType = "airtime",
  onClose,
  onHistorySelect,
}: SavedAirtimeHistoryProps) => {
  const savedHistory = store.getState().app.history[historyType];

  if (!isVisible) return null; // very important

  return (
    <ReactNativeModal
      isVisible={true}
      animationInTiming={500}
      animationOutTiming={500}
      // @ts-ignore
      onSwipeComplete={onClose}
      // @ts-ignore
      onBackdropPress={onClose}
      // @ts-ignore
      onBackButtonPress={onClose}
      swipeDirection="down"
      propagateSwipe
      deviceHeight={Layout.screen.height}
      deviceWidth={Layout.screen.width}
      backdropTransitionInTiming={800}
      supportedOrientations={["portrait", "landscape"]}
      backdropTransitionOutTiming={500}
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
      style={{
        justifyContent: "flex-end",
        margin: 0,
        alignSelf: "center",
        width: "100%",
      }}
    >
      <View style={tw`h-1/2 rounded-t-xl p-4`}>
        {savedHistory.length == 0 ? (
          <View style={tw`justify-center items-center m-auto`}>
            <Icon
              name="history-toggle-off"
              size={75}
              color={tw.color("gray")}
            />
            <Text style={tw`text-center mx-4 text-gray font-sans-semibold`}>
              You haven't carried out any {historyType} transaction yet.
            </Text>
          </View>
        ) : (
          <>
            <Text type="overline" style={tw`text-center`}>
              {historyType} Top-Up History
            </Text>
            <ScrollView
              contentContainerStyle={{ padding: 10 }}
              persistentScrollbar
            >
              {savedHistory.map((history, idx) => (
                <TopUpHistory
                  key={idx.toString()}
                  date={history.date}
                  networkName={history.networkName}
                  phoneNumber={history.phoneNumber}
                  onPress={() =>
                    onHistorySelect?.(history.networkName, history.phoneNumber)
                  }
                />
              ))}
            </ScrollView>
          </>
        )}
      </View>
    </ReactNativeModal>
  );
};

export default SavedHistory;
