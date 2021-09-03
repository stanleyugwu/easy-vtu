import React from 'react';
import { Image, View, Text, ImageBackground } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';

const LoadingScreen = (props) => (
    <>
        <ImageBackground
            source={require('../../assets/splash.png')} 
            style={{width:'100%',height:'100%',alignItems:'center',alignContent:'flex-end',justifyContent:'flex-end',flexDirection:'column'}}
        >
        <View style={{backgroundColor:'white'}}>
            <AnimatedLoader
                visible={true}
                source={require('../../assets/loader.json')}
            />
        </View>
        </ImageBackground>
    </>
)

export default LoadingScreen