import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import ScreenContainer from '../components/CustomSafeAreaView';

const QuickSubHomeScreen = () => {
    const usingQuickSub = useSelector(state => state.user.usingQuickSub);

    return (
        <ScreenContainer>
            <View>
                <Card>
                    <Card.Title>DATA</Card.Title>
                </Card>
                <Card>
                    <Card.Title>AIRTIME</Card.Title>
                </Card>
                <Card>
                    <Card.Title>ELECTRICITY</Card.Title>
                </Card>
                <Text>{usingQuickSub ? 'QUICK QUICK' : 'LOGGED IN'}</Text>
            </View>
        </ScreenContainer>
    )
}

export default QuickSubHomeScreen