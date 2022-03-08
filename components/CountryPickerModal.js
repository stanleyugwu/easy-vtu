import React from "react";
import { View, TouchableOpacity } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import Text from "./Type";
import PropTypes from "prop-types";
import countryList from "react-native-phone-input/dist/resources/countries.json";
import tw from "../lib/tailwind";
import debounce from '../utils/debounce';
import ModalWrapper from "./ModalWrapper";

/**
 * Renders a modal for choosing country
 * Touching the transparent area or pressing the back button closes the modal
 */
const CountryPickerModal = (props) => {

  const [countriesData, setCountriesData] = React.useState(countryList);
    
    const renderCountry = React.useCallback(({item:country}) => (
          <TouchableOpacity
            style={tw.style("py-3", props.btnStyle)}
            key={country.iso2}
            accessibilityRole="button"
            accessibilityLabel={country.name + " country button"}
            onPress={(e) => {
              e.stopPropagation();
              props.onCountrySelect({
                name: country.name,
                iso2: country.iso2,
                dialCode: country.dialCode,
              });
              setCountriesData(countryList)
            }}
          >
            <Text
              accessibilityLabel="country name"
              style={tw.style("text-left ml-4", props.countryTextStyle)}
            >
              {country.name}
            </Text>
          </TouchableOpacity>
    ))

    const handleTextInputChange = React.useCallback(debounce((query) => {
      let filtered = countryList.filter(country => country.name.indexOf(query) > -1 )
      setCountriesData(filtered)
    }))

    const searchBar = React.useMemo(() => {
      return <TextInput placeholder="Search Country" onChangeText={handleTextInputChange} style={tw`mx-auto p-1.5 rounded-lg border border-gray w-9/12 bg-white mb-3`} />
    })

  return (
    <ModalWrapper overlayStyle={tw`p-0`} modalPosition="bottom" visible={true} onRequestClose={props.onRequestClose} onBackgroundTouch={props.onBackgroundTouch}>
      <View style={tw`bg-white h-5/6 pt-3 rounded-t-3xl z-50`}>
        <FlatList
          keyboardShouldPersistTaps="always"
          updateCellsBatchingPeriod={200}
          data={countriesData}
          ListHeaderComponent={searchBar}
          stickyHeaderIndices={[0]}
          renderItem={renderCountry}
          horizontal={false}
          keyExtractor={(item) => item.iso2}
        />
      </View>
    </ModalWrapper>
  );
};

CountryPickerModal.propTypes = {
  /**
   * @typedef {object} country - object having informations about a selected country
   * @property {string} name - full name of country
   * @property {string} iso2 - iso2 short name of country
   * @property {number} dialCode - country's dial code
   */

  /**
   * Callback to be called when a country is pressed/selected in the modal.
   * Callback will be called with an object that contains more information about the country
   */
  onCountrySelect: PropTypes.func,

  /** The onRequestClose prop allows passing a function that will be called once the modal
   * has been dismissed. On the Android platform, this is a required function.
   */
  onRequestClose: PropTypes.func.isRequired,

  /**
   * Function to call when the area around the modal is touched
  */
 onBackgroundTouch: PropTypes.func,

  /** style for `TouchableOpacity` button wrapping each country */
  btnStyle: PropTypes.object,

  /** `Text` style for the country names */
  countryTextStyle: PropTypes.object,
};

CountryPickerModal.defaultProps = {
  onCountrySelect: () => null,
};

export default React.memo(CountryPickerModal);
