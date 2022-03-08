import React from 'react';
import {Ionicons as Icon} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import tw from '../../lib/tailwind';

//Screens
import HomeScreen from './HomeScreen';
import { View } from 'react-native';
import Text  from '../../components/Type';
import ProfileScreen from './ProfileScreen';
import ErrorBoundary from '../../components/ErrorBoundary';
import {Image} from 'react-native';

//Images
import Logo from '../../assets/images/white_icon.png';
import WalletImage from '../../assets/images/wallet_img.png';
import transactionsImg from '../../assets/images/transactions.png';
import profileImg from '../../assets/images/profile.png';

//list of screens that should have tab bars displayed at the bottom
const screensShouldShowTabBar = ['Home','Wallet','Transactions'];

//function to generate Screen option for disabling tabButton
const removeTabBtn = () => ({tabBarButton:() => null});

//App Icon
const AppIcon = () => <Image source={Logo} style={{width:35,height:35,marginRight:10,opacity:0.8}}/>
//Wallet Image
const WalletIcon = () => <Image source={WalletImage} style={{width:25,height:25,marginLeft:10}} />
const ProfileIcon = () => <Image source={profileImg} style={{width:35,height:35,marginLeft:10}} />
const TransactionIcon = () => <Image source={transactionsImg} style={{width:30,height:30,marginLeft:10}} />
/** 
 * Generates desired `Tab Navigator` screen options. 
 * 
 * Function extracted for readability
 * @returns {import('@react-navigation/bottom-tabs').BottomTabNavigationOptions} screen options object
*/
const screenOptionGen = (route) => ({
    headerShown:route.name == 'Home' ? false : true,//only show header when not in HomeScreen
    tabBarHideOnKeyboard:true,
    headerStyle:tw`bg-primary`,
    headerTitleStyle:tw`text-white font-sans-semibold`,
    headerRight:AppIcon,
    tabBarStyle:screensShouldShowTabBar.includes(route.name) ? tw.style(`bg-primary`,{height:52}) : tw`hidden h-0`,
    
    //icons rendered in tab bar
    tabBarIcon: ({focused, color, size}) => {
        let iconName;

        //set icon names
        if(route.name == 'Home') iconName = 'home';
        if(route.name == 'Wallet') iconName = 'wallet';
        if(route.name == 'Transactions') iconName = 'journal';

        //change color on focus
        if(focused){
            color = tw.color('accent')
            size = 25;
        }else {
            size = 22
            color = tw.color('gray')
        }

        return <Icon name={iconName} size={size} color={color}/>
    },
    tabBarLabelStyle:tw`text-gray-light`,
    tabBarAccessibilityLabel:'tab bar icon',
})

const WalletScreen = (props) => {
    return (
        <View><Text>HELLO</Text></View>
    )
}

const TransactionsScreen = (props) => {
    return (
        <View><Text>Transac</Text></View>
    )
}

//create tab navigator
const Tab = createBottomTabNavigator();

const UserScreen = ({navigation}) => {
    return (
        <ErrorBoundary>
            <Tab.Navigator 
                screenOptions={({route}) => screenOptionGen(route)}
            >
                <Tab.Screen name="Home" component={HomeScreen}/>
                <Tab.Screen name="Wallet" component={WalletScreen} options={{headerLeft:WalletIcon}} />
                <Tab.Screen name="Transactions" component={TransactionsScreen} options={{headerLeft:TransactionIcon}}/>
                <Tab.Screen name="Profile" component={ProfileScreen} options={{...removeTabBtn(),headerLeft:ProfileIcon}}/>
            </Tab.Navigator>
        </ErrorBoundary>
    )
}

export default UserScreen