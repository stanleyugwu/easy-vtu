import React from 'react';
import ServiceCard from './ServiceCard';
import tw from '../lib/tailwind';
import { ScrollView } from 'react-native-gesture-handler';

const Services = ({navigation = {navigate:() => null}}) => {
    return (
        <ScrollView contentContainerStyle={tw`flex-row flex-wrap justify-around p-4`}>
            <ServiceCard 
                title="Buy Airtime"
                source={require('../../assets/service-icons/airtime.png')}
                onPress={_ => navigation.navigate('Airtime')}
            />
            <ServiceCard 
                title="Buy Data" 
                source={require('../../assets/service-icons/data.png')}
                onPress={_ => navigation.navigate('Data')}
            />
            <ServiceCard 
                title="Buy Electricity" 
                source={require('../../assets/service-icons/electricity.png')}
                onPress={_ => navigation.navigate('Electricity')}
            />
            <ServiceCard 
                title="Tv Cable" 
                source={require('../../assets/service-icons/cable.png')}
                onPress={_ => navigation.navigate('Cable')}
            />
            <ServiceCard 
                title="Scratch Card" 
                source={require('../../assets/service-icons/card.png')}
                onPress={_ => navigation.navigate('ScratchCard')}
            />
            <ServiceCard
                source={require('../../assets/service-icons/cable.png')}
            />
        </ScrollView>
    )
}

export default Services