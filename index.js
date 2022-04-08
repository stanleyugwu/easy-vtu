import React from "react";
import { registerRootComponent } from "expo";
import { Provider } from "react-redux";
import store, { storePersistor } from "./store";
import App from "./App";
import { PersistGate } from "redux-persist/es/integration/react";
import useCachedResources from "./hooks/useCachedResources";
import useSetupRemoteConfig from "./hooks/useSetupRemoteConfig";

const Main = () => {
  const fontsLoaded = useCachedResources();
  const settingUpRemoteConfig = useSetupRemoteConfig();

  if (!fontsLoaded || settingUpRemoteConfig) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={storePersistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

registerRootComponent(Main);
