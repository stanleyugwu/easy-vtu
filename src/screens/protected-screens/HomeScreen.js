import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Services from '../../components/Services';
import Header from '../../components/Header';
import CustomSafeArea from '../../components/CustomSafeAreaView';
import {ScrollView, StatusBar, View, Dimensions } from 'react-native';
import tw from '../../lib/tailwind';
import { DrawerLayout } from 'react-native-gesture-handler';
import Drawer from '../../components/Drawer';

/**
 * `getDrawerItems` returns an array of objects that will be passed to `Drawer` component for rendering
 * its upper and lower drawer items.
 * 
 * @param {{navigate:function}} navigationObj - the navigation object from navigator to be made available to each item
 * @param {function} hookFn - a hook function to be called whenever a press event is made by an item
 * @param {String} itemType - either `upper` or `lower`, indicating which part of the drawer the items are meant for
 * @returns {Array<Object>} an array of objects, with each object representing an item for the `Drawer` component
 */
const getDrawerItems = (navigationObj,hookFn = () => null,itemType = 'upper') => {

    const _handlePress = (route = 'Home') => {
        navigationObj.navigate(route);

        /**
         * call hookFn every time an item is pressed.
         * calling hook without wrapping in setTimeout delays navigation btw the screens
         */
        setTimeout(() => hookFn(),100);
    }

    return itemType === "upper" ? (
            [
                {iconName:'home',label:'Home',onPress:() => _handlePress('Home')},
                {iconName:'person',label:'Profile',onPress:() => _handlePress('Profile')},
                {iconName:'wallet-sharp',label:'Wallet',onPress:() => null},
                {iconName:'ios-swap-horizontal',label:'Transactions',onPress:() => null},
                {iconName:'ios-call',label:'Contact Us',onPress:() => null},
                {iconName:'ios-share-social',label:'Tell a friend',onPress:() => null},
                {iconName:'md-help-circle',label:'Help/Feedback',onPress:() => null},
            ]
    ) : (
        [
            {iconName:'power-sharp',label:'Sign Out',onPress:() => null},
        ]
    )
}


const HomeScreen = ({navigation}) => {

    //profile selector
    const profile = useSelector(state => state.user.profile);
    //wallet selector
    const wallet = useSelector(state => state.wallet);

    // register refs
    const screenWidth = useRef(Dimensions.get('window').width).current;
    var drawerRef = useRef(null);

    //state to delay rendering service cards
    const [isShown, setIsShown] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsShown(true), 600);
    }, [])

    //function to open side drawer
    const openDrawer = () => { drawerRef.current.openDrawer();}

    //function to close Drawer
    const closeDrawer = () => {drawerRef.current.closeDrawer()}

    //callback to navigate to wallet screen to add money
    const walletAddCallback = () => {
        navigation.navigate('Wallet')
    }

    //function to render Drawer component
    const renderDrawer = useCallback(() => {
        return (
            <View style={tw`bg-white h-full w-full`}>
                <Drawer 
                    upperItems={getDrawerItems(navigation,closeDrawer,'upper')} 
                    avatarUri={profile.image}
                    lowerItems={getDrawerItems(navigation,closeDrawer,'lower')}
                    onAvatarPress={() => navigation.navigate('Profile')}
                    headerTitle={profile.username || 'Welcome'}
                    headerSubTitle={profile.email || 'easyvtu'}
                />
            </View>
        )
    },[renderDrawer])

    return (
        <CustomSafeArea>
            <StatusBar backgroundColor={tw.color('primary')} animated={true} />
            <DrawerLayout
                renderNavigationView={renderDrawer}
                statusBarAnimation="slide"
                drawerWidth={(screenWidth/2)+130}
                overlayColor="#0009"
                enableTrackpadTwoFingerGesture={true}
                drawerBackgroundColor={tw.color('white')}
                drawerPosition={DrawerLayout.positions.Left}
                drawerType="slide"
                ref={drawerRef}
            >
                <View style={{zIndex:-2}}>
                    <Header 
                        onAddCallback={walletAddCallback} 
                        onMenuPress={openDrawer}
                        avatarText={'👋 Hello, '+(profile.username || " There")+'.'}
                        avatarImgUrl={profile.image}
                        walletBalance={'#'+(wallet.balance || 0)}
                        walletTotalCards={wallet.cards.length}
                    />
                    <ScrollView contentContainerStyle={tw`my-14 h-full`}>
                        {
                            //delay rendering for 1s
                            isShown ? 
                            <Services navigation={navigation}/>
                            : null
                        }
                    </ScrollView>
                </View>
            </DrawerLayout>
        </CustomSafeArea>
    )
}

export default HomeScreen