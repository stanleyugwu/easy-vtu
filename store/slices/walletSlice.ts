import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DispatchPayloads as Payloads, RootState } from "../../types";

type WalletSlice = RootState["wallet"];

// adds given amount to wallet
const addMoneyReducer = (
  state: WalletSlice,
  action: PayloadAction<Payloads.AddMoneyPayload>
) => {
  const amount = action.payload;
  if (!amount || typeof amount !== "number" || amount < 0 || !state) return;

  state.balance += amount;
};

// removes given amount from wallet
const removeMoneyReducer = (
  state: WalletSlice,
  action: PayloadAction<Payloads.RemoveMoneyPayload>
) => {
  const amount = action.payload;
  if (
    !amount ||
    typeof amount !== "number" ||
    amount < 0 ||
    !state ||
    state.balance === 0
  )
    return;

  // assert removing the amount won't result in negative balance
  // this should be handled by dispatcher beforehand
  if (state.balance - amount < 0) state.balance = 0;

  state.balance -= amount;
};

// sets wallet balance to a given amount
const setMoneyReducer = (
  state: WalletSlice,
  action: PayloadAction<Payloads.AddMoneyPayload>
) => {
  const amount = action.payload;
  if (!amount || typeof amount !== "number" || !state) return;

  state.balance = amount;
};

// resets wallet to default
const resetWalletReducer = (
  state: WalletSlice,
  action: PayloadAction<Payloads.ResetWalletPayload>
) => {
  state = initialState;
};

const updateAccountInfoReducer = (
  state: WalletSlice,
  action: PayloadAction<Payloads.UpdateAccountInfoPayload>
) => {
  const newInfo = action.payload;
  if (!newInfo || !state) return;

  state = {
    ...state,
    ...newInfo,
  };
};

export const initialState: RootState["wallet"] = {
  accountName: null,
  accountNumber: null,
  balance: 0,
  bankName: null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    addMoney: addMoneyReducer,
    removeMoney: removeMoneyReducer,
    setMoney: setMoneyReducer,
    resetWallet: resetWalletReducer,
    updateAccountInfo: updateAccountInfoReducer,
  },
});

export const { addMoney, removeMoney, resetWallet, updateAccountInfo, setMoney } =
  walletSlice.actions;

export const balanceSelector = (state: RootState) => state.wallet.balance;

export default walletSlice.reducer;
