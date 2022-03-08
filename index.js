import React from 'react';
import { registerRootComponent } from "expo";
import { Provider } from "react-redux";
import App from "./src/app/App";
import store from './src/store';

const Main = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
};

registerRootComponent(Main);
