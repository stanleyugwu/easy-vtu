import React from 'react';
import tw from '../lib/tailwind';
import CurvedButton from '../components/Button';
import { ImageBackground, View, Image } from 'react-native';
import { Divider, TextInput} from 'react-native-paper';
import Text, {Title} from '../components/Type';
import {AntDesign as Icon} from '@expo/vector-icons';

const ForgotPasswordScreen = (props) => {
    return (
        <View>
            <ImageBackground
                source={require('../../assets/tile_signup.png')} 
                imageStyle={{resizeMode:'cover',}}
                style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center',alignContent:'center',}}
            >
                <View style={tw`mx-auto w-full h-full px-4 mt-24`}>
                    <Image
                        source={require('../../assets/icon.png')}
                        style={{ width: 100, height: 100, resizeMode: 'contain', alignSelf: 'center',flexGrow:0 }}
                    />
                    <Title>We All Forget, Don't Worry.</Title>
                    <Divider style={tw`h-1 bg-primary rounded-full w-32 mx-auto mt-2`}/>
                    <Text style={tw`mt-5`}>
                        Just enter your e-mail address below and we'll help you get back to your account.
                    </Text>
                    <TextInput
                        underlineColor="transparent"
                        underlineColorAndroid="transparent"
                        label="Email Address"
                        activeUnderlineColor={tw.color("primary")}
                        theme={{colors:{primary:tw.color('primary')}}}
                        style={tw.style(`bg-white mb-3 mt-9 font-sans justify-center p-1.5`,{elevation:3})}
                        textContentType="emailAddress"
                        mode="flat"
                        left={<TextInput.Icon name="email" style={tw`mt-5`} />}
                    />
                    <CurvedButton 
                        label="Regain Access" 
                        containerStyle={tw`mt-5`} 
                        right={<Icon name="rightcircleo" size={20} color={tw.color('accent')}/>}
                    />
                </View>
            </ImageBackground>
        </View>
    )
}

export default ForgotPasswordScreen