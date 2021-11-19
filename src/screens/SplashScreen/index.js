import React, { useState } from 'react';
import ScreenContainer from '../../components/CustomSafeAreaView';
import { View, Image, TouchableOpacity, StatusBar } from 'react-native';
import tw from '../../lib/tailwind';
import RoundButton from '../../components/RoundButton';
import SlideCounterDots from '../../components/SlideCounterDots';
import Text from '../../components/Type';
import Splash1 from './Splash1';
import Splash2 from './Splash2';
import Splash3 from './Splash3';
import BackButton from '../../components/BackButton';

const SplashScreen = (props) => {
    const [currentSplash,setCurrentSplash] = useState(1);

    return (
        <ScreenContainer containerStyle={tw`justify-around`}>
            <StatusBar backgroundColor={tw.color('primary')}/>
            {
                currentSplash == 3 ?
                    <BackButton onPress={_ => setCurrentSplash(currentSplash-1)}/>
                : null
            }
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
                                <Text style={tw`uppercase text-xl text-accent font-nunitobold`}>Skip</Text>
                            </TouchableOpacity>
                        ) : (currentSplash > 1 && currentSplash < 3) ? (
                            <RoundButton 
                                icon="arrow-left" 
                                color={tw.color('accent')} 
                                size={35} 
                                onPress={_ => setCurrentSplash(currentSplash-1)}
                            />
                        ) : null
                    }
                    {
                        // currentSplash == 2 ? (
                        //     <CurvedButton text="Get Started" onPress={_ => setCurrentSplash(3)} buttonStyle={tw`p-1`}/>
                        // ) : 
                        (currentSplash < 3) ? (
                            <RoundButton 
                                icon="arrow-right" 
                                color={tw.color('accent')} 
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