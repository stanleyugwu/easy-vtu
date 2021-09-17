import React from 'react';
import { registerRootComponent } from 'expo';
import App from './App';
import { Nunito_400Regular, Nunito_600SemiBold } from '@expo-google-fonts/nunito';
import { useFonts } from 'expo-font';
import LoadingScreen from './screens/LoadingScreen';
import {Provider} from 'react-redux';
import store from './store';

const Main = () => {

    let [fontsLoaded] = useFonts({
        'Nunito':Nunito_400Regular,
        'Nunito-Medium':Nunito_600SemiBold,
    });
    if(!fontsLoaded) return <LoadingScreen/>;

    return (
        <Provider store={store}>
            <App/>
        </Provider>
    )
}

registerRootComponent(Main)