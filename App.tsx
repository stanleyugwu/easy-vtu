import React from "react";
import useCachedResources from "./hooks/useCachedResources";
import useAuthenticate from "./hooks/useAuthenticate";
import Navigation from "./navigation";

const App = () => {
  const fontsLoaded = useCachedResources();
  const userAuthenticating = useAuthenticate();

  if (!fontsLoaded || userAuthenticating) {
    return null;
  }

  return <Navigation />;
};

export default App;
