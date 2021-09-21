import React from 'react';
import { registerRootComponent } from 'expo';
import {Provider} from 'react-redux';
import store from './store';
import AppWrapper from './app/AppWrapper';

const Main = () => {
    return (
        <Provider store={store}>
            <AppWrapper/>
        </Provider>
    )
}

registerRootComponent(Main)