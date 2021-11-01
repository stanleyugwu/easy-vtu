import React from 'react';
import {Dialog, TouchableRipple, Avatar} from 'react-native-paper';
import tw from '../lib/tailwind';
import { Text } from './Type';
import NetworkProviderButton from './NetworkProviderButton';
import PropTypes from 'prop-types';

//returns list of network providers for top-up, with navigator object accessible
const networkProviders = (navigatorObj) => ([
    { 
        name: "MTN NIGERIA",
        source: require("../../assets/MTN_LOGO.png"),
        onSelect: () => navigatorObj.navigate('Data') 
    },
    {
      name: "AIRTEL NIGERIA",
      source: require("../../assets/AIRTEL_LOGO.png"),
      onSelect: () => navigatorObj.navigate('Data')
    },
    { 
        name: "GLOBACOM NIGERIA", 
        source: require("../../assets/GLO_LOGO.png"),
        onSelect: () => navigatorObj.navigate('Data')
    },
    {
      name: "9MOBILE NIGERIA",
      source: require("../../assets/9MOBILE_LOGO.jpeg"),
      onSelect: () => navigatorObj.navigate('Data')
    },
]);

/**
 * 
 * @param {*} props
 * @param {Boolean} visible determines whether Dialog is shown or not
 * @param @callback onDialogDismiss function to call when Dialog is dismissed 
 * @param {Object} navigatorObj router navigation object to be made available to provider callbacks
 * @param @callback onNetworkSelect a callback to be invoked with provider name and image source when a provider is presed
 * @returns 
 */

const NetworkSelectorDialog = (props) => {

    return (
        <Dialog
            visible={props.visible}
            dismissable={true}
            onDismiss={props.onDialogDismiss}
        >
            <Dialog.Title style={tw`text-lg text-gray-lighter`}>
                SELECT NETWORK
            </Dialog.Title>
            
            <Dialog.Actions style={tw`flex-col`}>
                {networkProviders(props.navigatorObj).map((network) => (
                    <NetworkProviderButton 
                        key={network.name}
                        onPress={() => props.onNetworkSelect && props.onNetworkSelect(network.name, network.source)}
                        networkImageSrc={network.source}
                        networkName={network.name}
                    />
                ))}
            </Dialog.Actions>
        </Dialog>
    )
}

NetworkSelectorDialog.defaultProps = {
    visible:false,
    onDialogDismiss:() => null,
    navigatorObj:{navigate(){return null}},
    onNetworkSelect:() => null
}

NetworkSelectorDialog.propTypes = {
    visible:PropTypes.bool.isRequired,
    onDialogDismiss:PropTypes.func,
    navigatorObj:PropTypes.object,
    onNetworkSelect:PropTypes.func
}

export default NetworkSelectorDialog