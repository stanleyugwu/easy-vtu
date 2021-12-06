import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    isSignedIn:false,
    accessToken:null,
    profile: {
        id:null,
        username : null,
        email: null,
        image:null,
        isAdmin:false,
        referrals:null,
        phone: null,
        password: null,
        createdAt:null
    }
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signIn: (state, action) => {
            let profile = action.payload;
            if(
                !profile ||
                !(profile instanceof Object) ||
                (Object.keys(state.profile).join('') !== Object.keys(profile).join('')) //assert payload contains all and only profile keys
            ) return

            state.isSignedIn = true;
            state.profile = profile
        },
        signInForTest: (state, action) => {
            state.isSignedIn = true;
        },
        setToken: (state, action) => {
            let token = action.payload;
            if(!token || typeof token !== 'string' || !token.trim().length) return
            state.accessToken = token;
        }
    }
});

export const {signIn, setToken, signInForTest} = userSlice.actions;

export const selectUserSignInCreds = state => ({
    email: state.user.profile.email,
    password: state.user.profile.password
});

export default userSlice.reducer