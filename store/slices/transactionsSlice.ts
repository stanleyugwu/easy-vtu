import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DispatchPayloads as Payloads, RootState } from "../../types";

type TransactionsSlice = RootState["transactions"];

export const initialState: RootState["transactions"] = {
    transactions:undefined
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (
      state: TransactionsSlice,
      action: PayloadAction<Payloads.AddTransactionPayload>
    ) => {
      const tx = action.payload;
      if (!tx || typeof tx !== "object") return;
      // @ts-ignore
      if (state.transactions === undefined) state.transactions = [].concat(tx);
      else state.transactions.concat(tx);
    },

    removeTransaction: (
      state: TransactionsSlice,
      action: PayloadAction<Payloads.RemoveTransactionPayload>
    ) => {
      const txId = action.payload;
      if (state.transactions === undefined) return;
      state.transactions = state.transactions.filter((tx) => tx.id !== txId);
    },
  },
});

export const { addTransaction, removeTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;
