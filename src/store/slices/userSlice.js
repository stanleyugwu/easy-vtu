import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signedIn:false,
    usingQuickSub:false,
    signInCreds:{
        emailAddress:null,
        password:null
    }
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signIn: (state, action) => {
            state.signedIn = true;
            state.signInCreds = action.payload;
        },
        useQuickSub: (state) => {
            state.usingQuickSub = true
        }
    }
});

export const {signIn, useQuickSub} = userSlice.actions;

export const selectUserSignInCreds = state => state.user.signInCreds;

export default userSlice.reducer