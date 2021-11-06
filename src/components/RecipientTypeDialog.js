import React from 'react';
import PropTypes from 'prop-types';
import tw from '../lib/tailwind';
import { Dialog } from 'react-native-paper';
import RadioSelectorButton from './RadioSelectorButton';

/**
 * renders a dialog modal with options to select who the recipient of a top-up is
 */
const RecipientTypeDialog = (props) => {
    return (
        <Dialog
            visible={props.visible}
            onDismiss={props.onDismiss}
        >
            <Dialog.Title style={tw`text-lg text-gray-600`} accessibilityRole="text" accessibilityLabel="recipient modal title">
                WHO ARE YOU TOPPING UP FOR?
            </Dialog.Title>

            <Dialog.Actions style={tw`flex-col`}>
                <RadioSelectorButton
                    onPress={() => props.onSelect(1,'self')}
                    label={"MY SELF"}
                    checked={props.type === "self"}
                    restOfProps={{testID:"recipient button",accessibilityLabel:"recipient button self"}}
                />

                <RadioSelectorButton
                    onPress={() => props.onSelect(2,'others')}
                    label={"OTHERS"}
                    checked={props.type == "others"}
                    restOfProps={{testID:"recipient button",accessibilityLabel:"recipient button others"}}
                />
            </Dialog.Actions>
        </Dialog>
    )
}

RecipientTypeDialog.propTypes = {
    /** determines whether the dialog is shown or not */
    visible: PropTypes.bool.isRequired,
    /** callback to invoke when the dialog modal is dismissed */
    onDismiss: PropTypes.func.isRequired,
    /** the currently active recipient type button */
    type: PropTypes.oneOf(['self','others']).isRequired,
    /**
     * callback to be invoked with two below arguments when a button is pressed in the modal:
     * 1. number corresponding to the index of the button that was pressed from the dialog; starting from 1.
     * 2. string 'self' or 'others' corresponding to recipient type of the selected button.
     */
    onSelect: PropTypes.func,
}

RecipientTypeDialog.defaultProps = {
    visible:true,
    onDismiss:() => null,
    type: 'self',
    onSelect: () => null
}

export default RecipientTypeDialog