import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import ScreenContainer from '../components/CustomSafeAreaView';
import { selectUserSignInCreds } from '../store/slices/userSlice';

const HomeScreen = () => {
    const userSignInCreds = useSelector(selectUserSignInCreds);

    return (
        <ScreenContainer>
            <View>
                <Text>{userSignInCreds.emailAddress}</Text>
                <Text>{userSignInCreds.password}</Text>
            </View>
        </ScreenContainer>
    )
}

export default HomeScreen