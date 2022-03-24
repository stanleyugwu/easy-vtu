import React from "react";
import useCachedResources from "./hooks/useCachedResources";
import useAuthenticate from "./hooks/useAuthenticate";
import useSetupRemoteConfig from "./hooks/useSetupRemoteConfig";
import Navigation from "./navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import tw from "./lib/tailwind";

const App = () => {
  const fontsLoaded = useCachedResources();
  const userAuthenticating = useAuthenticate();
  const settingUpRemoteConfig = useSetupRemoteConfig();

  if (!fontsLoaded || userAuthenticating || settingUpRemoteConfig) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Navigation />
      <StatusBar backgroundColor={tw.color("primary-dark")} style="light" />
    </SafeAreaProvider>
  );
};

export default App;
