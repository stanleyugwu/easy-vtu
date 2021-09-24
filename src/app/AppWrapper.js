import React, {useEffect, useState} from "react";
import { Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold, } from '@expo-google-fonts/nunito';
import { useFonts } from 'expo-font';
import LoadingScreen from '../screens/LoadingScreen';
import App from './App';
import { getLocalData, storeLocalData } from "../utils/storageAdapters";
import { useDispatch } from "react-redux";
import { setToken, signIn } from "../store/slices/userSlice";

const AppWrapper = () => {

    const [authenticating, setAuthenticating] = useState(true);
    const dispatch = useDispatch();
    let [fontsLoaded] = useFonts({
        'Nunito':Nunito_400Regular,
        'Nunito-Medium':Nunito_600SemiBold,
        'Nunito-Bold':Nunito_700Bold
    });

    let mockData = {
        accessToken : 'gjhsjhsd89s8d9d*jdjs_3892',
        profile:{
            name : 'stanley ugwu',
            email: 'stanleyugwu@gmail.com',
            phone: '2348066413705',
            password: '#GodsDev',
        },
        wallet:{
            balance: 200
        }
    }

    useEffect(() => {
        const authenticateUser = async () => {
            // let stored = await storeLocalData(mockData,true);
            // console.log(stored)
            // return
            let data = await getLocalData(true);
            console.log(data);
            if(true) return setAuthenticating(false);
            if(data && ('accessToken' in data) && ('profile' in data) && ('wallet' in data)){
                dispatch(signIn(data.profile));
                dispatch(setToken(data.accessToken));
                setAuthenticating(false);
                return
            }
        }
        authenticateUser();
    },[])

    if(!fontsLoaded || authenticating) return <LoadingScreen/>;

    return <App/>
}

export default AppWrapper