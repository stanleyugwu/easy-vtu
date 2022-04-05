import { Platform } from "react-native";
import spinAppUpdates, {
  IAUUpdateKind,
  StartUpdateOptions,
} from "sp-react-native-in-app-updates";

/**
 * This module takes care of checking for app update from `play` or `app` store, and downloading it.
 * Just call it in the screens you want to show update dialogs in. It'll fail gracefully
 */
const checkAppUpdates = () => {
  const inAppUpdates = new spinAppUpdates(false);

  inAppUpdates.checkNeedsUpdate().then((result) => {
    if (result.shouldUpdate) {
      // we need to update!.
      // we're conditionally setting the option if on android because on ios, user will be redirected to app store to update.
      let updateOptions: StartUpdateOptions = Platform.select({
        ios: {
          title: "App update available",
          message:
            "There is a new version of the app available on the App Store, update the app now to get the latest features",
          buttonUpgradeText: "Update",
          buttonCancelText: "Cancel",
        },
        android: {
          updateType: IAUUpdateKind.FLEXIBLE,
        },
      }) as StartUpdateOptions;

      inAppUpdates.startUpdate(updateOptions);
    }
  });
};

export default checkAppUpdates;
