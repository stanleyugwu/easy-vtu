import React from 'react';
import { registerRootComponent } from 'expo';
import App from './App';
import {Roboto_400Regular, Roboto_500Medium, useFonts} from '@expo-google-fonts/roboto';
import LoadingScreen from './screens/LoadingScreen';

const Main = () => {

    let [fontsLoaded] = useFonts({
        'Roboto':Roboto_400Regular,
        'Roboto-Medium':Roboto_500Medium
    });

    if(!fontsLoaded) return <LoadingScreen/>;

    return (
        <App/>
    )
}

registerRootComponent(Main)