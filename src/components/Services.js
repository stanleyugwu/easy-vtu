import React from 'react';
import ServiceCard from './ServiceCard';
import { View } from 'react-native';
import tw from '../lib/tailwind';

const Services = ({navigation = {navigate:() => null}}) => {
    return (
        <View style={tw`flex-row flex-wrap justify-around p-4`}>
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
                source={require('../../assets/service-icons/cable.png')}
                wrapperStyle={tw`mt-5`}
                wrapperProps={{slideUp:true,delay:250}}
            />
        </View>
    )
}

export default Services