import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DispatchPayloads as Payloads, NetworkCarriers, RootState } from "../../types";

type AppSlice = RootState["app"];

const setRatingModalLastSeenReducer = (
  state: AppSlice,
  action: PayloadAction<Payloads.RatingModalLastSeenPayload>
) => {
  const timestamp = action.payload;

  if (!timestamp || typeof timestamp != "number") return;
  state.ratingModalLastSeen = timestamp;
};

const setAnnouncementModalLastSeenReducer = (
  state: AppSlice,
  action: PayloadAction<Payloads.AnnouncementModalLastSeenPayload>
) => {
  const timestamp = action.payload;

  if (!timestamp || typeof timestamp != "number") return;
  state.announcementModalLastSeen = timestamp;
};

const saveToHistoryAirtimeReducer = (
  state: AppSlice,
  action: PayloadAction<Payloads.AirtimeHistoryPayload>
) => {
  if(!action.payload.networkName || !action.payload.phoneNumber) return;
  
  if(state.history.airtime.length < 15){
    // there's still space to add new history
    state.history.airtime.unshift({
      networkName: action.payload.networkName,
      phoneNumber:action.payload.phoneNumber,
      date:Date.now()
    })
  } else {
    // we've stored 15 transactions, we'll not add more, instead we remove the oldest
    // to make space for newest. This way we maintain the 15 storage limit
    state.history.airtime.pop();
    state.history.airtime.unshift({
      networkName: action.payload.networkName,
      phoneNumber:action.payload.phoneNumber,
      date:Date.now()
    });
  }
}

const saveToHistoryDataReducer = (
  state: AppSlice,
  action: PayloadAction<Payloads.DataHistoryPayload>
) => {
  if(!action.payload.networkName || !action.payload.phoneNumber) return;

  if(state.history.data.length < 15){
    // there's still space to add new history
    state.history.data.unshift({
      networkName: action.payload.networkName,
      phoneNumber:action.payload.phoneNumber,
      date:Date.now()
    })
  } else {
    // we've stored 15 transactions, we'll not add more, instead we remove the oldest
    // to make space for newest. This way we maintain the 15 storage limit
    state.history.data.pop();
    state.history.data.unshift({
      networkName: action.payload.networkName,
      phoneNumber:action.payload.phoneNumber,
      date:Date.now()
    });
  }
}

const initialState: RootState["app"] = {
  announcementModalLastSeen: 0,
  ratingModalLastSeen: 0,
  history:{airtime:[{networkName:1,phoneNumber:"08066413705",date:Date.now()},{networkName:1,phoneNumber:"08066413705",date:Date.now()},{networkName:1,phoneNumber:"08066413705",date:Date.now()},{networkName:1,phoneNumber:"08066413705",date:Date.now()},{networkName:1,phoneNumber:"08066413705",date:Date.now()},{networkName:1,phoneNumber:"08066413705",date:Date.now()},{networkName:1,phoneNumber:"08066413705",date:Date.now()},{networkName:1,phoneNumber:"08066413705",date:Date.now()},{networkName:1,phoneNumber:"08066413705",date:Date.now()}],data:[],cable:[],electricity:[]}
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setRatingModalLastSeen: setRatingModalLastSeenReducer,
    setAnnouncementModalLastSeen: setAnnouncementModalLastSeenReducer,
    saveToHistoryAirtime:saveToHistoryAirtimeReducer,
    saveToHistoryData:saveToHistoryDataReducer,
  },
});

export const { setRatingModalLastSeen, setAnnouncementModalLastSeen, saveToHistoryAirtime, saveToHistoryData } =
  appSlice.actions;

export default appSlice.reducer
