import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useFonts } from "expo-font";
import useCachedResources from './hooks/useCachedResources';
import LoadingScreen from "./screens/LoadingScreen";
import Navigation from "./navigation";
import { getLocalData, storeLocalData } from "./utils/storageAdapters";
import { setToken, signIn } from "./store/slices/userSlice";
import { addCard, addMoney } from "./store/slices/walletSlice";

const App = () => {
  const [authenticating, setAuthenticating] = useState(true);
  const fontsLoaded = useCachedResources();
  const dispatch = useDispatch();
  

  let mockData = {
    accessToken: "gjhsjhsd89s8d9d*jdjs_3892",
    profile: {
      id: "7387287bjjsdh",
      username: "Devvie",
      email: "stanleyugwu@gmail.com",
      image:
        "https://lh3.googleusercontent.com/a-/AOh14GjF0JoYxA8T7G9AAu035TkoMxbGN3Nsy2Z7ph4H-w=w60-h60",
      referrals: 12,
      phone: "2348066413705",
      password: "#GodsDev",
      createdAt: "21-08-2021",
    },
    wallet: {
      balance: 200,
      cards: [{ name: "zenith" }, { name: "access" }],
    },
  };

  useEffect(() => {
    const authenticateUser = async () => {
      // let stored = await storeLocalData(mockData,true);
      // console.log(stored)
      // return
      let data = await getLocalData(true);
      // console.log(data);

      if (
        data &&
        "accessToken" in data &&
        "profile" in data &&
        "wallet" in data
      ) {
        dispatch(signIn(data.profile));
        dispatch(addMoney(data.wallet.balance));
        dispatch(addCard(data.wallet.cards));
        dispatch(setToken(data.accessToken));
      }
      setAuthenticating(false);
      return;
    };
    authenticateUser();
  }, []);

  if (!fontsLoaded || authenticating) {
    return null
  };

  return (
    <Navigation />
  );
};

export default App;
