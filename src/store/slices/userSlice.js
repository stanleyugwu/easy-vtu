import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSignedIn:false,
    accessToken:null,
    profile: {
        name : null,
        email: null,
        phone: null,
        password: null,
    }
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signIn: (state, action) => {
            state.isSignedIn = true;
            state.profile = action.payload;
        },
        setToken: (state, action) => {
            state.accessToken = action.payload;
        }
    }
});

export const {signIn, setToken} = userSlice.actions;

export const selectUserSignInCreds = state => ({
    email: state.user.profile.email,
    password: state.user.profile.password
});

export default userSlice.reducer