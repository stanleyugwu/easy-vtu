import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import { Card, Modal, Text, Title, Divider, IconButton, TextInput } from 'react-native-paper';
import ScreenContainer from '../components/CustomSafeAreaView';
import tw from '../lib/tailwind';
import ServiceCard from '../components/ServiceCard';
import {AntDesign as Icon} from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import ShadowView from '../components/ShadowView';
import FadeInView from '../components/FadeInView';

const QuickSubHomeScreen = ({navigation}) => {

    return (
        <ScreenContainer>
            <StatusBar backgroundColor={tw.color('primary')}/>
            <View>
                <ShadowView style={tw.style('w-full bg-primary rounded-b-full pt-6')}>
                    <Title style={tw`text-center mt-3 mb-4 text-white font-bold`}>Quick Top-Up</Title>
                </ShadowView>
               <ScrollView>
                <View style={tw`mt-5 flex-row flex-wrap justify-around p-4`}>
                    <ServiceCard 
                        title="Buy Airtime"  
                        wrapperStyle={tw`mt-5`}
                        source={require('../../assets/service-icons/airtime.png')}
                        onPress={_ => navigation.navigate('Airtime')}
                        wrapperProps={{slideUp:true}}
                    />
                    <ServiceCard 
                        title="Buy Data" 
                        source={require('../../assets/service-icons/data.png')}
                        wrapperStyle={tw`mt-5`}
                        onPress={_ => navigation.navigate('Data')}
                        wrapperProps={{slideUp:true,delay:50}}
                    />
                    <ServiceCard 
                        title="Buy Electricity" 
                        source={require('../../assets/service-icons/electricity.png')}
                        wrapperStyle={tw`mt-5`}
                        onPress={_ => navigation.navigate('Electricity')}
                        wrapperProps={{slideUp:true,delay:100}}
                    />
                    <ServiceCard 
                        title="Tv Cable" 
                        source={require('../../assets/service-icons/cable.png')}
                        wrapperStyle={tw`mt-5`}
                        onPress={_ => navigation.navigate('Cable')}
                        wrapperProps={{slideUp:true,delay:150}}
                    />
                    <ServiceCard 
                        title="Scratch Card" 
                        source={require('../../assets/service-icons/card.png')}
                        wrapperStyle={tw`mt-5`}
                        onPress={_ => navigation.navigate('ScratchCard')}
                        wrapperProps={{slideUp:true,delay:200}}
                    />
                    <ServiceCard 
                        title="Cable" 
                        source={require('../../assets/service-icons/cable.png')}
                        wrapperStyle={tw`mt-5`}
                        wrapperProps={{slideUp:true,delay:250}}
                    />
                </View>
               </ScrollView>
            </View>
            <ShadowView 
                style={tw.style('bg-primary w-40 h-40 rounded-full absolute',{left:-50, bottom:-50,opacity:0.1})} 
                gradient={['#00ff00','green']}
            />
        </ScreenContainer>
    )
}

export default QuickSubHomeScreen