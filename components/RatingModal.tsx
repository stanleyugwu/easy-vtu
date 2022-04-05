import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Text, { View } from "./Themed";
import isItTime from "../utils/isItTime";
import type { RootState } from "../types";
import ModalWrapper from "./ModalWrapper";
import tw from "../lib/tailwind";
import Button from "./Button";
import { Image, Linking, Platform } from "react-native";
// @ts-ignore
import ratingStar from "../assets/images/rating-star.gif";
import { setRatingModalLastSeen } from "../store/slices/appSlice";
import * as StoreReview from "expo-store-review";

// TODO: put appropriate app id and name in `app.json`
const storeLink =
  StoreReview.storeUrl() ||
  (Platform.OS === "ios"
    ? "https://apps.apple.com/app/apple-store/id123456789?action=write-review"
    : "https://play.google.com/store/apps/details?id=com.devvie.easyvtu&showAllReviews=true");

/**
 * Custom dialog to show when native counterpart for rating refuses to show
 */
export const RatingDialog = () => {
  const [dismissed, setDismissed] = React.useState(false);
  const handleRatePress = React.useCallback(() => {
    Linking.openURL(storeLink).finally(() => setDismissed(true));
  }, []);

  const handleRateDismiss = React.useCallback(() => {
    setDismissed(true);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <ModalWrapper>
      <View style={tw`bg-surface p-4 rounded-2xl`}>
        <Text type="title" style={tw`text-center`}>
          Enjoying your experience?
        </Text>
        <Text style={tw`text-center`}>Please give this app a rating.</Text>

        <View style={tw`flex-row bg-transparent justify-center`}>
          <Image source={ratingStar} style={tw`w-12 h-12`} />
          <Image source={ratingStar} style={tw`w-12 h-12`} />
          <Image source={ratingStar} style={tw`w-12 h-12`} />
          <Image source={ratingStar} style={tw`w-12 h-12`} />
          <Image source={ratingStar} style={tw`w-12 h-12`} />
        </View>

        <View style={tw`bg-transparent flex-row justify-around mt-6`}>
          <Button label="Rate Now" onPress={handleRatePress} />
          <Button
            label="Rate Later"
            onPress={handleRateDismiss}
            bgColor={tw.color("surface")}
            labelColor={tw.color("primary")}
          />
        </View>
      </View>
    </ModalWrapper>
  );
};

/**
 * This component takes care of showing the rating dialog to user at appropriate times.
 * It will use the native rating api and fallback to a custom dialog incase the API is not available.
 * Just render it where you might want to ask user for rating
 */
const RatingModal = () => {
  const dispatch = useDispatch();
  const dialogLastSeen = useSelector(
      (state: RootState) => state.app.ratingModalLastSeen
    ),
    isTimeToShowDialog = isItTime(dialogLastSeen);

  // this will store null for when `inAppReview` was called successfully, and an element for when it was not
  const [toRender, setToRender] = React.useState<null | JSX.Element>(null);

  React.useEffect(() => {
    const requestRating = async () => {
      if (isTimeToShowDialog) {
        const canShowNativeReview = await StoreReview.hasAction();

        if (canShowNativeReview) StoreReview.requestReview();
        else {
          // show our custom dialog
          setToRender(<RatingDialog />);
        }
        // Whether it threw or not, let's update the rating dialog last seen time after everything
        dispatch(setRatingModalLastSeen(Date.now()));
      }
    };
    requestRating();
  }, []);

  return toRender;
};

export default RatingModal;
