import React from 'react';
import { ScrollView, View } from 'react-native';
import Text, {Title} from '../components/Type';
import ScreenContainer from '../components/CustomSafeAreaView';
import tw from '../lib/tailwind';
import Services from '../components/Services';
import { StatusBar } from 'react-native';
import BoxShadowView from '../components/BoxShadowView';

const QuickSubHomeScreen = ({navigation}) => {

    return (
        <ScreenContainer>
            <StatusBar backgroundColor={tw.color('primary')}/>
            <View>
                <BoxShadowView containerStyle={tw.style('w-full bg-primary rounded-b-full pt-6')} gradient={[tw.color('primary'),tw.color('primary'),tw.color('accent'),]}>
                    <Title style={tw`mt-2 text-white`}>Quick Top-Up</Title>
                    <Text style={tw`mb-5 text-white`}>No Registeration Needed.</Text>
                </BoxShadowView>
                <Title style={tw`mt-10 text-xl`}>What do you want to do?</Title>
               <ScrollView>
                <Services navigation={navigation}/>
               </ScrollView>
            </View>
            <BoxShadowView 
                style={tw.style('bg-accent w-40 h-40 rounded-full absolute',{left:-60, bottom:-60,opacity:0.2})}
            />
        </ScreenContainer>
    )
}

export default QuickSubHomeScreen