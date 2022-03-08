import React from 'react';
import { registerRootComponent } from "expo";
import App from "./App";
import { Provider } from 'react-redux';
import store from './store';

const Main = () => (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

registerRootComponent(Main);
