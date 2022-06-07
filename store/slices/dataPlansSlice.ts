import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DispatchPayloads as Payloads, RootState } from "../../types";

type DataPlansSlice = RootState["dataPlans"];

const addDataPlansReducer = (
  state: DataPlansSlice,
  action: PayloadAction<Payloads.DataPlansPayload>
) => {
  const { plans, provider } = action.payload;
  if (!plans || !(plans instanceof Array) || !provider) return;

  if (provider == "Mtn") state.mtn = plans;
  else if (provider == "Airtel") state.airtel = plans;
  else if (provider == "Etisalat") state.etisalat = plans;
  else state.glo = plans;
};

export const initialState: RootState["dataPlans"] = {
  mtn: undefined,
  airtel: undefined,
  etisalat: undefined,
  glo: undefined,
};

const dataPlansSlice = createSlice({
  name: "dataPlans",
  initialState,
  reducers: {
    addDataPlans: addDataPlansReducer,
  },
});

export const { addDataPlans } = dataPlansSlice.actions;

export default dataPlansSlice.reducer;
