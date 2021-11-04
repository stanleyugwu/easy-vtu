import React from "react";
import { Dialog } from "react-native-paper";
import {Image} from 'react-native';
import PaymentMethodCard from "./PaymentMethodCard";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Title } from "./Type";
import tw from '../lib/tailwind';

/**
 * @description renders a dialog modal of buttons for various payment methods
 * @param {Object} props
 * @property {Boolean} visible - Determines whether Dialog is visible
 * @property {function} navigate - navigator function (probably from navigator object) to enable  screen navigation from child components
 * @property {function} onDismiss - callback to call when Dialog is dismissed
 * 
 */
const PaymentMethodsDialog = (props) => {
  const isSignedIn = useSelector(state => state.user.isSignedIn)
  
  return (
    <Dialog visible={props.visible} onDismiss={props.onDismiss}>
      <Image
        source={require("../../assets/logo.png")}
        style={{
          width: 90,
          height: 90,
          resizeMode: "contain",
          alignSelf: "center",
          flexGrow: 0,
        }}
      />

      <Dialog.Title style={tw`text-center`} accessibilityLabel="payment methods modal title">
        <Title style={tw`text-xl`}>How do you want to pay?</Title>
      </Dialog.Title>

      <Dialog.Actions style={tw`flex-col mt-8`}  accessibilityLabel="payment methods wrapper" accessibilityRole="menu">
        {
            isSignedIn 
            ? (
                <PaymentMethodCard
                    label="pay from wallet"
                    iconName="wallet"
                    onPress={() => props.navigate('PayFromWallet')}
                />
            )
            : null 
        }
        <PaymentMethodCard
          label="pay with card"
          iconName="card"
          onPress={() => props.navigate("PayWithCard")}
        />
        <PaymentMethodCard
          label="pay with bank transfer"
          iconName="home"
          onPress={() => props.navigate("PayWithTransfer")}
        />
      </Dialog.Actions>
    </Dialog>
  );
};

PaymentMethodsDialog.propTypes = {
    /** Determines whether `Dialog` is visible */
    visible:PropTypes.bool.isRequired,
    /** `navigator` function (probably from **navigator** object) to enable screen navigation from child components */
    navigate:PropTypes.func.isRequired,
    /** callback to invoke when `Dialog` is dismissed */
    onDismiss:PropTypes.func.isRequired
};

PaymentMethodsDialog.defaultProps = {
    visible:false,
    navigate:() => null,
    onDismiss:() => null
}

export default PaymentMethodsDialog;
