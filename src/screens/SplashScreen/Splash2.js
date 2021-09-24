import React from 'react';
import {View, Image} from 'react-native';
import {Text,Title} from '../../components/Type';
import FadeInView from '../../components/FadeInView';
import tw from '../../lib/tailwind';

const Splash2 = (props) => {
    return (
        <FadeInView style={tw`mx-auto items-center p-3`}>
            <Image 
                source={require('../../../assets/splash-images/img-2.png')} 
                style={{width:220,height:220,flexShrink:0,flexGrow:0}}
            />
            <Title style={tw`mt-5 mb-1`}>Buy with ease</Title>
            <Text>
                Second Splash
                Very long text Very long text Very long text Very long text Very long text Very long text  
            </Text>
        </FadeInView>
    )
}

export default Splash2