import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { Text, BottomNavigation } from 'react-native-paper';
import { useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import ScreenContainer from '../../components/CustomSafeAreaView';
import { selectUserSignInCreds } from '../../store/slices/userSlice';
import tw from '../../lib/tailwind';
import ShadowView from '../../components/ShadowView';
import {Ionicons as Icon} from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const HomeScreen = () => (
    <ScreenContainer>
        <Text>Serve</Text>
    </ScreenContainer>
)

const UserScreen = ({navigation}) => {

    return (
        <Tab.Navigator 
            screenOptions={({route}) => ({
                headerShown:false,
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    if(route.name == 'Home'){
                        iconName = 'home' 
                    }
                    return <Icon name={iconName} size={size} color={color}/>
                }
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen}/>
        </Tab.Navigator>
    )
}

export default UserScreen