import React from 'react';
import { View, ImageBackground, Alert } from 'react-native';
import { Text, Title } from './Type';
import { Avatar, Drawer as _Drawer, TouchableRipple} from 'react-native-paper';
import {Ionicons as Icon} from '@expo/vector-icons';
import tw from '../lib/tailwind';
import { ScrollView } from 'react-native-gesture-handler';
import ShadowView from './ShadowView';


//Drawer Menu Item Component
const DrawerItem = (props) => {
    //destructure props and set defaults
    const {
        label = 'Click Me',
        iconName = 'apps',
        onItemPress = () => null,
        ...restOfProps
    } = props;

    return (
        <View 
            {...restOfProps}
        >
            <TouchableRipple 
                style={tw`w-full flex-row justify-between items-center pt-3 mb-3 border-b pb-3 border-gray-300`} 
                rippleColor="#0006" 
                centered={true} 
                borderless={false} 
                onPress={onItemPress}
            >
                <>
                    <View style={tw`flex-row items-center`}>
                        <Icon accessibilityLabel={iconName+' icon'} name={iconName} color={tw.color('gray-500')} size={25} testID="left-icon"/>
                        
                        <Text accessibilityLabel={label+' menu link'} style={tw`pl-6 font-nunitobold text-lg text-gray-700`}>
                            {label.charAt(0).toUpperCase() + label.slice(1)}
                            {/* Capitalize label */}
                        </Text>
                    </View>

                    <Icon name="chevron-forward" color={tw.color('black')} size={25} style={tw`self-end`}/>
                </>
            </TouchableRipple>
        </View>
    )
}

//Main Drawer Component
const Drawer = (props) => {
    //default item payload
    const defaultItem = [{iconName:'home',label:'home',onPress:() => null}]

    //destructure passed props
    const {
        avatarUri = false,
        onAvatarPress = () => null,
        showAvatar = true,
        headerTitle = 'Welcome',
        headerSubTitle = 'easyVtu',
        upperItems = defaultItem,
        lowerItems = false
    } = props;

    return (
        <_Drawer.Section>
            <ScrollView>
                <ImageBackground 
                    source={require('../../assets/drawer_bg.jpg')} 
                    style={{width:'100%',height:showAvatar ? 183 : 'auto'}}
                >
                    <ShadowView gradient={[tw.color('primary'),'#ffffff00','#2d3e6199','#ffffff00',]} accessibilityLabel="drawer header" style={tw.style('bg-primary p-3',{opacity:0.87})}>
                        {
                            showAvatar ? (
                                <TouchableRipple 
                                    borderless={true} 
                                    rippleColor={tw.color('accent')} 
                                    centered={true}
                                    onPress={onAvatarPress}
                                >
                                    {
                                        avatarUri ? (
                                            <Avatar.Image 
                                                accessibilityLabel="profile image"
                                                source={{uri:avatarUri}}
                                                size={80}
                                            />
                                        ) : (
                                            <Avatar.Icon 
                                                accessibilityLabel="profile image" 
                                                icon="account"
                                                style={tw`text-white bg-white`}
                                                size={80}
                                            />
                                        )
                                    }
                                </TouchableRipple>
                            ) : null
                        }

                        <Title accessibilityLabel="account name" style={tw`text-white text-left pl-2 mt-4`}>{headerTitle}</Title>
                        <Text accessibilityLabel="account email" style={tw`text-gray-300 text-left pl-2`}>{headerSubTitle}</Text>
                    </ShadowView>
                </ImageBackground>

                <View style={tw`mt-14 px-4`}>
                    {
                        upperItems.map((item,idx) => {
                            return (
                                <DrawerItem 
                                    key={''+idx}
                                    label={item.label}
                                    iconName={item.iconName}
                                    onItemPress={item.onPress}
                                />
                            )
                        })
                    }
                </View>

                {
                    lowerItems ? (
                        <View style={tw`mt-8 px-4`}>
                            {
                                lowerItems.map((item,idx) => {
                                    return (
                                        <DrawerItem 
                                            key={''+idx}
                                            label={item.label}
                                            iconName={item.iconName}
                                            onItemPress={item.onPress}
                                        />
                                    )
                                })
                            }
                        </View>
                    ) : null
                }
            </ScrollView>
        </_Drawer.Section>
    )
}
export {DrawerItem, Drawer as default}