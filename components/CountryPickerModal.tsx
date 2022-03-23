import React from "react";
import {
  View,
  TouchableOpacity,
  GestureResponderEvent,
  TouchableOpacityProps,
  ListRenderItemInfo,
} from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import Text, { TextProps, ViewProps } from "./Themed";
import countryList from "react-native-phone-input/dist/resources/countries.json";
import tw from "../lib/tailwind";
import debounce from "../utils/debounce";
import ModalWrapper from "./ModalWrapper";

/** TYPES */
import type { Country } from "../types";
import appStyles from "../lib/appStyles";

/** TYpe for the country data stored in JSON format */
export type JsonCountry =
  | {
      name: string;
      iso2: string;
      dialCode: string;
      priority: number;
      areaCodes: null;
    }
  | {
      name: string;
      iso2: string;
      dialCode: string;
      priority: number;
      areaCodes: string[];
    };

export type CountryPickerModalProps = {
  /**
   * Callback to be called when a country is pressed/selected in the modal.
   * Callback will be called with an object that contains more information about the country
   */
  onCountrySelect: (selectedCountry: Country) => void;

  /** The onRequestClose prop allows passing a function that will be called once the modal
   * has been dismissed. On the Android platform, this is a required function.
   */
  onRequestClose?: () => void;

  /**
   * Function to call when the area around the modal is touched
   */
  onBackgroundTouch?: (event: GestureResponderEvent) => void;

  /** style for `TouchableOpacity` button wrapping each country */
  btnStyle?: TouchableOpacityProps["style"];

  /** `Text` style for the country names */
  countryTextStyle?: TextProps["style"];
} & ViewProps;

/**
 * Renders a modal for choosing country
 * Touching the transparent area or pressing the back button closes the modal
 */
const CountryPickerModal = ({
  btnStyle,
  onCountrySelect,
  countryTextStyle,
  onBackgroundTouch,
  onRequestClose,
}: CountryPickerModalProps) => {
  const [countriesData, setCountriesData] =
    React.useState<JsonCountry[]>(countryList);

  /** Takes care of rendering individual country button */
  const renderCountry = React.useCallback(
    ({ item: country }: ListRenderItemInfo<Country>) => (
      <TouchableOpacity
        style={[tw`py-3 px-4`, btnStyle]}
        key={country.iso2}
        accessibilityRole="button"
        accessibilityLabel={country.name + " country button"}
        onPress={(e) => {
          e.stopPropagation();
          onCountrySelect({
            name: country.name,
            iso2: country.iso2,
            dialCode: country.dialCode,
          });
          setCountriesData(countryList);
        }}
      >
        <Text accessibilityLabel="country name" style={[countryTextStyle]}>
          {country.name}
        </Text>
      </TouchableOpacity>
    ),
    []
  );

  const handleTextInputChange = React.useCallback(
    debounce((query) => {
      let filtered = countryList.filter(
        (country) => country.name.indexOf(query) > -1
      );
      setCountriesData(filtered);
    }),
    []
  );

  const searchBar = React.useMemo(() => {
    return (
      <TextInput
        placeholder="Search Country"
        onChangeText={handleTextInputChange}
        style={[
          tw`mx-auto p-1.5 rounded-lg w-11/12 border bg-surface border-gray mb-3`,
          appStyles.boxShadow,
        ]}
      />
    );
  }, []);

  return (
    <ModalWrapper
      style={tw`p-0`}
      modalPosition="bottom"
      visible={true}
      onRequestClose={onRequestClose}
      onBackgroundTouch={onBackgroundTouch}
    >
      <View style={tw`bg-surface h-5/6 pt-3 rounded-t-3xl z-50`}>
        <FlatList
          keyboardShouldPersistTaps="always"
          updateCellsBatchingPeriod={200}
          data={countriesData}
          ListHeaderComponent={searchBar}
          stickyHeaderIndices={[0]}
          renderItem={renderCountry}
          keyExtractor={(item) => item.iso2}
        />
      </View>
    </ModalWrapper>
  );
};

export default React.memo(CountryPickerModal);
