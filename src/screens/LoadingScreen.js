import React from 'react';
import { Image, View, Text, ImageBackground } from 'react-native';
import tw from '../lib/tailwind';
import LottieView from 'lottie-react-native';

const LoadingScreen = (props) => (
    <>
        <ImageBackground
            source={require('../../assets/splash.png')} 
            style={{width:'100%',height:'100%',alignItems:'center',alignContent:'flex-end',justifyContent:'flex-end',flexDirection:'column'}}
        >
            <View style={tw`absolute bottom-4`}>
                <LottieView
                    source={require('../../assets/loader.json')}
                    style={{width:100,height:100}}
                    autoPlay={true}
                    speed={2.5}
                />
            </View>
        </ImageBackground>
    </>
)

export default LoadingScreen