import React, { useRef, useState } from 'react';
import tw from '../lib/tailwind';
import CustomButton from '../components/CustomButton';
import { ImageBackground, View, Image, ScrollView  } from 'react-native';
import { TextInput, Divider } from 'react-native-paper';
import {AntDesign as Icon} from '@expo/vector-icons';
import PhoneInput from 'react-native-phone-input';
import {Text,Title} from '../components/Type';

const SignUpScreen = (props) => {
    const [inputs, setInputs] = useState({
        name:'',
        mobileNumber:'',
        password:'',
        confirmPassword:''
    });

    const phoneInputRef = useRef();

    return (
        <View>
            <ImageBackground
                source={require('../../assets/tile_signup.png')} 
                imageStyle={{resizeMode:'cover',}}
                style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center',alignContent:'center',}}
            >
                <View style={tw`mx-auto w-full h-full px-4 mt-9`}>
                    <Image
                        source={require('../../assets/icon.png')}
                        style={{ width: 100, height: 100, resizeMode: 'contain', alignSelf: 'center',flexGrow:0 }}
                    />
                    <Title>Sign Up. It's Free</Title>
                    <Divider style={tw`h-1 bg-primary rounded-full w-20 mx-auto mt-2`}/>
                    <ScrollView style={tw`mt-7`}>
                        <TextInput
                            underlineColor={tw.color('primary')}
                            label="Name"
                            mode="flat"
                            value={inputs.name}
                            left={<TextInput.Icon name="account" />}
                        />
                        <PhoneInput
                            initialCountry="ng"
                            ref={phoneInputRef}
                            textProps={{placeholder:'Enter Mobile Number'}}
                            pickerItemStyle={{backgroundColor:'red'}}
                            style={tw`p-5 my-4 border-b border-primary bg-gray-light`}
                        />
                        <TextInput 
                            style={tw`mb-4`}
                            secureTextEntry={true} 
                            underlineColor={tw.color('primary')} 
                            label="Password" 
                            mode="flat" 
                            left={<TextInput.Icon name="key" color="black" />} 
                        />
                        <TextInput 
                            secureTextEntry={true} 
                            underlineColor={tw.color('primary')} 
                            label="Confirm Password" 
                            mode="flat" 
                        />
                        <Text style={tw`mt-3`}>
                            Already a member? <Text style={tw`text-accent`} onPress={_ => props.navigation.navigate('Sign-In')}>
                                Sign In
                            </Text>
                        </Text>
                        <CustomButton 
                            text="Sign Up" 
                            containerProps={{style:tw`mt-5`}} 
                            left={<Icon name="login" size={20} color={tw.color('accent')}/>}
                        />
                    </ScrollView>
                </View>
            </ImageBackground>
        </View>
    )
}

export default SignUpScreen