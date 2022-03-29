import React from "react";
import { registerRootComponent } from "expo";
import { Provider } from "react-redux";
import store, { storePersistor } from "./store";
import App from "./App";
import { ActivityIndicator } from "react-native";
import { PersistGate } from "redux-persist/es/integration/react";

const Loader = (
  <ActivityIndicator
    animating
    size={50}
    style={{
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      marginVertical: "auto",
      marginHorizontal: "auto",
    }}
  />
);

const Main = () => (
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={storePersistor} loading={Loader}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

registerRootComponent(Main);
