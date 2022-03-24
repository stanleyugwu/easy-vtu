import React from "react";
// FIREBASE
import remoteConfig, {
  FirebaseRemoteConfigTypes,
} from "@react-native-firebase/remote-config";

// Firebase remote-config in-app defaults
const remoteConfigDefaults = {
  discounts: JSON.stringify({
    airtime: null,
    data: null,
    electricity: null,
    cable: null,
    scratchCard: null,
  }),
  activePaymentMethods: JSON.stringify({
    wallet: true,
    bankTransfer: true,
    debitCard: true,
    BTCTransfer: true,
  }),
  maximumtTopUpAmount: 50000,
  supportedDataNetworkProviders: JSON.stringify([
    "mtn",
    "airtel",
    "glo",
    "9mobile",
  ]),
  supportedAirtimeNetworkProviders: JSON.stringify([
    "mtn",
    "airtel",
    "glo",
    "9mobile",
  ]),
  activeServices: JSON.stringify({
    airtime: true,
    data: true,
    electricity: true,
    cable: true,
    scratch_card: true,
  }),
  announcement: { title: null, message: null },
};

// This is the type of remote-config data fetched from firebase or stored locally
export type FirebaseRemoteConfigType = typeof remoteConfigDefaults;

const useSetupRemoteConfig = () => {
  const [settingUp, setSettingUp] = React.useState(true);
  React.useEffect(() => {
    const remoteConfigInit = async () => {
      // Set minimum fetch interval for remote-config
      await remoteConfig().setConfigSettings({
        minimumFetchIntervalMillis: 30,
      });

      // Set default in-app remote-config configs
      await remoteConfig().setDefaults(
        remoteConfigDefaults as any as FirebaseRemoteConfigTypes.ConfigDefaults
      );

      setSettingUp(false); // Done setting defaults

      // We will fetch and activate server remote-config later in the process
      // At a point user needs internet to further
      console.log("Defaults set");
    };

    remoteConfigInit();
  }, []);

  return settingUp;
};

export default useSetupRemoteConfig;
