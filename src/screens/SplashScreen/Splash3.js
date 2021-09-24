import React from 'react';
import {View, Image} from 'react-native';
import {Title} from '../../components/Type';
import CustomButton from '../../components/CustomButton';
import FadeInView from '../../components/FadeInView';
import tw from '../../lib/tailwind';

const Splash3 = (props) => {

    return (
        <FadeInView style={tw`p-3 mx-auto w-full`} duration={300}>
            <Image 
                source={require('../../../assets/splash-images/img-1.jpg')} 
                style={{width:220,height:220,flexShrink:0,flexGrow:0,alignSelf:'center'}}
            />
            <Title style={tw`my-6`}>Start Topping Up Now!</Title>
            <View style={tw`w-full mt-6`}>
                <FadeInView delay={100} slideUp={true}>
                    <CustomButton 
                        text="Create An Account" 
                        style={tw`w-full`} 
                        onPress={() => {props.navigate('Sign-Up')}}
                    />
                </FadeInView>
                <FadeInView delay={200} slideUp={true}>
                    <CustomButton 
                        text="SIGN IN"
                        shadow={true}
                        style={tw.style('w-full my-4')} 
                        onPress={() => {props.navigate('Sign-In')}}
                    />
                </FadeInView>
                <FadeInView delay={300} slideUp={true}>
                    <CustomButton 
                        text="Quick Sub"   
                        style={tw`w-full`}
                        onPress={() => {
                            props.navigate('QuickSub');
                        }}
                    />
                </FadeInView>
            </View>
        </FadeInView>
    )
}

export default Splash3