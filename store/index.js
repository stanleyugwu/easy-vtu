import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import walletReducer from './slices/walletSlice';

export default configureStore({
    reducer:{
        user:userReducer,
        wallet:walletReducer
    }
})