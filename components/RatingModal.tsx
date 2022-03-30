import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Text, { View } from "./Themed";
import isItTime from "../utils/isItTime";
import type { RootState } from "../types";
import InAppReview from "react-native-in-app-review";
import ModalWrapper from "./ModalWrapper";
import tw from "../lib/tailwind";
import Button from "./Button";
import { Image, Linking, Platform } from "react-native";
// @ts-ignore
import ratingStar from "../assets/images/rating-star.gif";
import { setRatingModalLastSeen } from "../store/slices/appSlice";


// TODO: put appropriate app id and name
const androidPackageName = 'com.devvie.easyvtu';
const playStoreAppLink = `https://play.google.com/store/apps/details?id=${androidPackageName}&showAllReviews=true`

const itunesItemId = 123456789;
const appleStoreAppLink = `https://apps.apple.com/app/apple-store/id${itunesItemId}?action=write-review`

/**
 * Custom dialog to show when native counterpart for rating refuses to show
 */
export const RatingDialog = () => {
  const [dismissed, setDismissed] = React.useState(false);

  const storeLink = Platform.select({
    android: playStoreAppLink,
    ios: appleStoreAppLink,
    macos: appleStoreAppLink,
    native: playStoreAppLink,
    web: playStoreAppLink,
    windows: playStoreAppLink,
  });

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
    if (isTimeToShowDialog) {
      if (InAppReview.isAvailable()) {
        // native review is available
        InAppReview.RequestInAppReview()
          // no `.then` because if the dialog wasn't shown, it might be because user already rated.
          // we won't want to show him the dialog again
          .catch((error) => {
            // The api wasn't correctly called for some reason
            // let's show our dialog with hopes that the error didnt result
            // because user already rated
            setToRender(<RatingDialog />);
          });
      } else {
        // native review not available, let's show our dialog
        setToRender(<RatingDialog />);
      }

      // Whether it threw or not, let's update the rating dialog last seen time after everything
      dispatch(setRatingModalLastSeen(Date.now()));
    }
  }, []);

  return toRender;
};

export default RatingModal;
