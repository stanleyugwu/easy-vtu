import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import {
  Lato_400Regular,
  Lato_700Bold,
  Lato_900Black,
} from "@expo-google-fonts/lato";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          "open-sans": Lato_400Regular,
          "open-sans-semibold": Lato_700Bold,
          "open-sans-bold": Lato_900Black,
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        /**
         * We're supposed to hide the splash-screen here, but because `Navigation` component takes
         * time (2s) to fully render, we'll hide the splash-screen in the `useEffect` of `Navigation` component
         * that will keep the splash-screen visible until all screens have been rendered
         */
        // SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
