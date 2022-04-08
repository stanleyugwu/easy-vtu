import React from "react";
import Navigation from "./navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import tw from "./lib/tailwind";

const App = () => (
  <SafeAreaProvider>
    <Navigation/>
    <StatusBar backgroundColor={tw.color("primary-dark")} style="light" />
  </SafeAreaProvider>
);

export default App;
