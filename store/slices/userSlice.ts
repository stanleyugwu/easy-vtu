import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  AppStateSlices,
  DispatchPayloads as Payloads,
  RootState,
} from "../../types";

type UserSlice = RootState["user"];

/** Reducer for signing in */
const signInReducer = (
  state: UserSlice,
  action: PayloadAction<Payloads.SignIn>
) => {
  // assert payload exists and of correct type
  if (!action.payload || !(action.payload instanceof Object)) return;

  const { accessToken, ...otherProfileInfo } = action.payload;
  const newState: AppStateSlices.UserSlice = {
    accessToken,
    isSignedIn: true,
    profile: otherProfileInfo,
  };
  state = newState;
};

/** Reducer for signing out
 */
const signOutReducer = (
  state: UserSlice,
  action: PayloadAction<Payloads.SignOut>
) => {
  state = null; // clear state
};

/** Reducer for updating profile */
const updateProfileReducer = (
  state: UserSlice,
  action: PayloadAction<Payloads.UpdateProfile>
) => {
  if (!state?.profile) {
    userSlice.caseReducers.signOut(state, {
      payload: undefined,
      type: "user/signOut",
    });
    return;
  }

  const updatedProfile = action.payload,
    /**
     *  we will achieve the update by spreading the existing profile and the new profile
     * inside an object so the new profile fields overrides the existing ones
     */
    newProfile = {
      ...state.profile,
      ...updatedProfile,
    };
  state.profile = newProfile;
};

export const initialState: UserSlice = null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: signInReducer,
    signOut: signOutReducer,
    updateProfile: updateProfileReducer,
  },
});

export const { signIn, signOut, updateProfile } = userSlice.actions;

export const selectProfile = (state: RootState) => state.user?.profile;

export default userSlice.reducer;
