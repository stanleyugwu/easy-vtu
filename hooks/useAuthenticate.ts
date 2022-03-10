import React from "react";
import { useDispatch } from "react-redux";
import { getLocalData, storeLocalData } from "../utils/storageAdapters";
import { setToken, signIn } from "../store/slices/userSlice";
import { addCard, addMoney } from "../store/slices/walletSlice";

export default function useAuthenticate() {
  const [authenticating, _setAuthenticating] = React.useState(true);
  const dispatch = useDispatch();

  React.useEffect(() => {
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
      _setAuthenticating(false);
      return;
    };

    authenticateUser();
  }, []);

  return authenticating;
}
