import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  PersistConfig,
  persistCombineReducers,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PURGE,
  REGISTER,
  PERSIST,
} from "redux-persist";
import createSecureStore from "redux-persist-expo-securestore";

import userReducer from "./slices/userSlice";
import walletReducer from "./slices/walletSlice";
import appReducer from "./slices/appSlice";

import type { RootState } from "../types";

// storage engine
const secureStorage = createSecureStore();

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  version: 1,
  storage: secureStorage,
};

const persistedReducer = persistCombineReducers(persistConfig, {
  user: userReducer,
  wallet: walletReducer,
  app: appReducer,
});

const store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const storePersistor = persistStore(store);

export {store as default, storePersistor};
