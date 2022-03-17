import React from 'react';
import {StyleSheet, View,Platform} from 'react-native';
import PropTypes from 'prop-types';

/**
 * HOC version of BoxShadowView that adds drop shadow to its children
 */
const withBoxShadow = function(WrappedComponent){
    return (props) => {
        return (
            <View
                accessibilityLabel="BoxShadowView component wrapper" 
                style={[
                    styles.boxShadow,
                    {backgroundColor:'white'},
                    props.containerStyle
                ]}
            >
                <WrappedComponent {...props} />
            </View>
        )
    }
}

/**
 * Renders its children inside a box-shadowed `<View/>`
 */
const BoxShadowView = (props) => {
    return (
        <View 
            accessibilityLabel={props.accessibilityLabel} 
            style={[
                styles.boxShadow,
                {backgroundColor:'white'},
                props.containerStyle
            ]}
        >
            {props.children}
        </View>
    )
}

export const styles = StyleSheet.create({
    boxShadow:
      Platform.OS == "ios"
        ? {
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }
        : {
            elevation: 2,
          },
});

BoxShadowView.propTypes = {
    /** style for component `View` wrapper */
    containerStyle:PropTypes.object,

    /** accessibilityLabel for parent `View` component */
    accessibilityLabel: PropTypes.string,

    /** child nodes to wrap */
    children: PropTypes.node
}

BoxShadowView.defaultProps = {
    children:null,
    containerStyle: null,
    accessibilityLabel: "BoxShadowView component wrapper"
}

export {BoxShadowView as default, withBoxShadow}