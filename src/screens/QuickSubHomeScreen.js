import React from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';
import Text, {Title} from '../components/Type';
import ScreenContainer from '../components/CustomSafeAreaView';
import tw from '../lib/tailwind';
import Services from '../components/Services';
import { StatusBar } from 'react-native';
import BoxShadowView from '../components/BoxShadowView';
import tileBg from '../../assets/tile_background.png';
import { useTheme, DefaultTheme } from '@react-navigation/native';

const QuickSubHomeScreen = ({navigation}) => {
    console.log(DefaultTheme);
    return (
        <ImageBackground source={tileBg} style={tw.style(`h-full w-full`,)}>
            <ScreenContainer containerStyle={tw.style(`p-0 h-full`,)}>
                <StatusBar backgroundColor={tw.color('primary')}/>
                <View>
                    <BoxShadowView containerStyle={tw.style('w-full bg-primary pt-1')} gradient={[tw.color('primary'),tw.color('primary'),tw.color('accent'),]}>
                        <Title style={tw`mt-2 text-light`}>Quick Top-Up</Title>
                        <Text style={tw`mb-3 text-light`}>No Registeration Needed.</Text>
                    </BoxShadowView>
                    <Title style={tw`mt-10 mb-5`}>What do you want to do?</Title>
                    <Services navigation={navigation}/>
                </View>
            </ScreenContainer>
        </ImageBackground>
    )
}

export default QuickSubHomeScreen