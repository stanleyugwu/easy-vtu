import React, { useState } from 'react';
import ScreenContainer from '../../components/CustomSafeAreaView';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text, Title, Button, IconButton } from 'react-native-paper';
import tw from '../../lib/tailwind';
import CircleButton from '../../components/CircleButton';
import SlideCounterDots from '../../components/SlideCounterDots';
import Splash1 from './Splash1';
import Splash2 from './Splash2';
import Splash3 from './Splash3';

const SplashScreen = (props) => {
    const [currentSplash,setCurrentSplash] = useState(1);

    return (
        <ScreenContainer containerStyle={tw`justify-around`}>
            {
                currentSplash == 1 ? (
                    <Splash1/>
                ) : (currentSplash == 2) ? (
                    <Splash2/>
                ) : (<Splash3 navigate={props.navigation.navigate}/>)
            }
            {/* Splash Screens */}

            <View>
                {
                    currentSplash < 3 ? (
                        <View style={tw`items-center`}>
                            <SlideCounterDots activeDot={currentSplash}/>
                        </View>
                    ) : null
                }
                {/* Slider Dots */}

                <View style={tw`items-center px-5 mt-9 flex-row justify-between items-center`}>
                    {
                        //show skip on 1, arrow afterwards, and smaller arrow in last screen
                        currentSplash == 1 ? (
                            <TouchableOpacity style={tw`ml-2 pt-2`} onPress={_ => setCurrentSplash(3)}>
                                <Text style={tw`font-semibold uppercase text-lg text-primary`}>Skip</Text>
                            </TouchableOpacity>
                        ) : (currentSplash == 3) ? (
                            <CircleButton 
                                icon="arrow-left" 
                                color="#eee" 
                                size={25} 
                                onPress={_ => setCurrentSplash(currentSplash-1)}
                            />
                        ) : (
                            <CircleButton 
                                icon="arrow-left" 
                                color="#eee" 
                                size={35} 
                                onPress={_ => setCurrentSplash(currentSplash-1)}
                            />
                        )
                    }
                    {
                        // currentSplash == 2 ? (
                        //     <CustomButton text="Get Started" onPress={_ => setCurrentSplash(3)} buttonStyle={tw`p-1`}/>
                        // ) : 
                        (currentSplash < 3) ? (
                            <CircleButton 
                                icon="arrow-right" 
                                color="#eee" 
                                size={35} 
                                onPress={_ => setCurrentSplash(currentSplash+1)}
                            />
                        ) : null
                    }
                </View>
                {/* Slider Buttons */}
            </View>
            {/* Bottom Slider */}
        </ScreenContainer>
    )
}

export default SplashScreen