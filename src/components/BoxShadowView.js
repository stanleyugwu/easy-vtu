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
            accessibilityLabel="BoxShadowView component wrapper" 
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

const styles = StyleSheet.create({
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
            elevation: 4,
          },
});

BoxShadowView.propTypes = {
    /** style for component `View` wrapper */
    containerStyle:PropTypes.object,
}

BoxShadowView.defaultProps = {
    children:null
}

export {BoxShadowView as default, withBoxShadow}