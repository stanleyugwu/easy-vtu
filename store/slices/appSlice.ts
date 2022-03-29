import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DispatchPayloads as Payloads, RootState } from "../../types";

type AppSlice = RootState["app"];

const setRatingModalLastSeenReducer = (
  state: AppSlice,
  action: PayloadAction<Payloads.RatingModalLastSeenPayload>
) => {
  const timestamp = action.payload;

  if (!timestamp || typeof timestamp != "number" || !state) return;
  state.ratingModalLastSeen = timestamp;
};

const setAnnouncementModalLastSeenReducer = (
  state: AppSlice,
  action: PayloadAction<Payloads.AnnouncementModalLastSeenPayload>
) => {
  const timestamp = action.payload;

  if (!timestamp || typeof timestamp != "number" || !state) return;
  state.announcementModalLastSeen = timestamp;
};

const initialState: RootState["app"] = null;

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setRatingModalLastSeen: setRatingModalLastSeenReducer,
    setAnnouncementModalLastSeen: setAnnouncementModalLastSeenReducer,
  },
});

export const { setRatingModalLastSeen, setAnnouncementModalLastSeen } =
  appSlice.actions;

export default appSlice.reducer;
