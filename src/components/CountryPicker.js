import React from 'react';
import {View, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import tw from '../lib/tailwind';
import Text from "./Type";
import countryList from 'react-native-phone-input/dist/resources/countries.json';

class CountryPicker extends React.PureComponent{
    constructor(props){
        super(props);
    }

    _countryRenderer(item,onSelectCountry){
        return (
            <TouchableOpacity 
                style={tw`py-3`}
                onPress={_ => {
                    onSelectCountry(item.iso2);
                }} 
            >
                <Text style={tw`text-left ml-4`}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    
    render(){
        if(!(this.props.open)) return null
        return (
            <View 
                style={tw.style(
                    'w-full items-center justify-center h-full',
                    {
                        backgroundColor:'#0009',
                        zIndex:99999,
                    }
                )}
                onPress={_ => console.log('pressed')}
            >
                <TouchableOpacity onPress={this.props.closeCountryPicker}>
                    <Text style={tw`text-white text-lg font-nunitobold mt-1`}>X</Text>
                </TouchableOpacity>
                <FlatList
                    data={countryList}
                    style={tw`w-4/5 m-auto bg-white my-3`} 
                    renderItem={({item}) => this._countryRenderer(item,this.props.onSelectCountry)} 
                    keyExtractor={(item,idx) => `${item.dialCode}-${idx}`}
                />
            </View>
        )
    }
}

export default CountryPicker