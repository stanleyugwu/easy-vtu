import React from 'react';
import {Dialog, TouchableRipple, Avatar} from 'react-native-paper';
import tw from '../lib/tailwind';
import { Text } from './Type';
import NetworkProviderButton from './NetworkProviderButton';
import PropTypes from 'prop-types';

/** 
 * @param {Object} props
 * @property {Object} props.navigatorObj - route navigator object 
 * @returns a list of network providers for top-up, with navigator object accessible 
*/
const networkProviders = (navigatorObj) => ([
    { 
        name: "MTN NIGERIA",
        source: require("../../assets/providers/MTN_LOGO.png"),
        onSelect: () => navigatorObj.navigate('Data') 
    },
    {
      name: "AIRTEL NIGERIA",
      source: require("../../assets/providers/AIRTEL_LOGO.png"),
      onSelect: () => navigatorObj.navigate('Data')
    },
    { 
        name: "GLOBACOM NIGERIA", 
        source: require("../../assets/providers/GLO_LOGO.png"),
        onSelect: () => navigatorObj.navigate('Data')
    },
    {
      name: "9MOBILE NIGERIA",
      source: require("../../assets/providers/9MOBILE_LOGO.jpeg"),
      onSelect: () => navigatorObj.navigate('Data')
    },
]);

/**
 * renders a modal listing various network providers to select from
 * @param {*} props
 * @property {Boolean} [props.visible = false] - determines whether Dialog is shown or not
 * @property @callback props.onDialogDismiss - callback function to call when Dialog is dismissed 
 * @property {Object} props.navigatorObj - router navigation object to be made available to provider callbacks
 * @property @callback props.onNetworkSelect - a callback to be invoked with provider name and image source when a provider is presed
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

NetworkSelectorDialog.propTypes = {
    /** determines whether Dialog is shown or not */
    visible:PropTypes.bool.isRequired,
    /** callback function to call when Dialog is dismissed */
    onDialogDismiss:PropTypes.func,
    /** router navigation object to be made available to provider callbacks */
    navigatorObj:PropTypes.object,
    /** a callback to be invoked with provider name and image source when a provider is presed */
    onNetworkSelect:PropTypes.func
}

NetworkSelectorDialog.defaultProps = {
    visible:false,
    onDialogDismiss:() => null,
    navigatorObj:{navigate(){return null}},
    onNetworkSelect:() => null
}

export default NetworkSelectorDialog