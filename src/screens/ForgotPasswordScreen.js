import React from 'react';
import tw from '../lib/tailwind';
import CustomButton from '../components/CustomButton';
import { ImageBackground, View, Image, ScrollView  } from 'react-native';
import { TextInput, Title, Divider, Text } from 'react-native-paper';
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
                    <Title style={tw`text-center`}>We All Forget, Don't Worry.</Title>
                    <Divider style={tw`h-1 bg-primary rounded-full w-32 mx-auto mt-2`}/>
                    <Text style={tw`text-base text-center mt-5`}>
                        Just enter your e-mail address below and we'll help you get back to your account.
                    </Text>
                    <ScrollView style={tw`mt-9`}>
                        <TextInput
                            underlineColor={tw.color('primary')}
                            label="Email Address"
                            mode="flat"
                            left={<TextInput.Icon name="account" />}
                        />
                        <CustomButton 
                            text="Regain Access" 
                            containerProps={{style:tw`mt-7`}} 
                            right={<Icon name="rightcircleo" size={20} color={tw.color('white')}/>}
                        />
                    </ScrollView>
                </View>
            </ImageBackground>
        </View>
    )
}

export default ForgotPasswordScreen