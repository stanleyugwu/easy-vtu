import React from "react";
import { registerRootComponent } from "expo";
import { Provider } from "react-redux";
import store from "./store";
import App from './App';

const Main = () => (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

registerRootComponent(Main);
