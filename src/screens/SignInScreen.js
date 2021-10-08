import React from 'react';
import tw from '../lib/tailwind';
import CustomButton from '../components/CustomButton';
import { ImageBackground, View, Image, ScrollView  } from 'react-native';
import { TextInput,Divider} from 'react-native-paper';
import {Text,Title} from '../components/Type';
import {AntDesign as Icon} from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { signIn } from '../store/slices/userSlice';

const SignInScreen = (props) => {
    const dispatch = useDispatch();

    return (
        <View>
            <ImageBackground
                source={require('../../assets/tile_signup.png')} 
                imageStyle={{resizeMode:'cover',}}
                style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center',alignContent:'center',}}
            >
                <View style={tw`mx-auto w-full h-full px-4 mt-20`}>
                    <Image
                        source={require('../../assets/icon.png')}
                        style={{ width: 100, height: 100, resizeMode: 'contain', alignSelf: 'center',flexGrow:0 }}
                    />
                    <Title>Welcome Back!</Title>
                    <Divider style={tw`h-1 bg-primary rounded-full w-20 mx-auto mt-2`}/>
                    <ScrollView style={tw`mt-9`}>
                        <TextInput
                            underlineColor={tw.color('primary')}
                            label="Email Address"
                            mode="flat"
                            left={<TextInput.Icon name="account" />}
                        />
                        <TextInput 
                            style={tw`my-6`}
                            secureTextEntry={true} 
                            underlineColor={tw.color('primary')} 
                            label="Password" 
                            mode="flat" 
                            left={<TextInput.Icon name="key" color="black" />} 
                        />
                        <Text style={tw`text-accent text-red-600 font-nunitobold`} onPress={_ => props.navigation.navigate('Forgot-Password')}>
                            Forgot Password?
                        </Text>
                        <CustomButton 
                            text="Sign In" 
                            containerProps={{style:tw`mt-7`}} 
                            left={<Icon name="login" size={20} color={tw.color('accent')}/>}
                            onPress={_ => dispatch(signIn({name:'Stanley Ugwu',email:'stanleyugwu',phone:'08066413705',password:'heyreddie'}))}
                        />
                         <Text style={tw`mt-6`}>
                            Not a member yet? <Text style={tw`text-accent font-nunitobold`} onPress={_ => props.navigation.navigate('Sign-Up')}>
                                Sign Up
                        </Text>
                        </Text>
                    </ScrollView>
                </View>
            </ImageBackground>
        </View>
    )
}

export default SignInScreen