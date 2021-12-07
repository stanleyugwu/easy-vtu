import React from "react";
import { View, ActivityIndicator, TextInput } from "react-native";
import PropTypes from "prop-types";
import * as Contacts from "expo-contacts";
import ModalWrapper from "./ModalWrapper";
import { FlatList } from "react-native-gesture-handler";
import tw from "../lib/tailwind";
import Text, { Title } from "./Type";
import BoxShadowView from "./BoxShadowView";
import { Ionicons as Icon } from "@expo/vector-icons";
import debounce from "../utils/debounce";
import { TouchableRipple } from "react-native-paper";

/**
 * filters given contacts array, removing contacts with short or no phone number
 * @param {Object[]} contacts
 * @returns {Object[]}
 */
const filterContacts = (contacts) => {
  return contacts
    .filter((contact) => {
      //filter out only valid contacts
      let number = contact?.phoneNumbers?.[0]?.number;
      if (number && number.toString().length > 6) return true;
    })
    .map((contact) => {
      //loop through filtered contacts and construct payload with only needed data
      return {
        name: contact?.name || "Unknown",
        phoneNumber: contact.phoneNumbers[0].number,
      };
    });
};

/**
 * Gets user's contacts
 * @returns array of users contacts
 */
const getUserContacts = async () => {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status === "granted") {
    let { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
    });
    data = filterContacts(data);
    return data;
  }
};

//function to generate random color hex
let colors = ["#f55", "#5f5", "#55f", "#ff5", "#5ff", "#f5f"];
const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

const noContacts = (
  <Title style={tw`self-center my-auto text-gray-lighter text-base`}>
    No Contact Found
  </Title>
);

/** Renders each contact */
const renderContact = (item, onSelectCb = () => null) => {
  return (
    <BoxShadowView containerStyle={tw`justify-center m-2`}>
      <TouchableRipple
        rippleColor="#0009"
        style={tw`flex-row items-center p-3 `}
        onPress={() =>
          onSelectCb({ name: item.name, phoneNumber: item.phoneNumber })
        }
      >
        <>
          <View style={tw.style(`rounded-full p-4`,{backgroundColor:randomColor()})}>
            <Icon name="person" size={23} />
          </View>
          <View style={tw`flex-col ml-4`}>
            <Title style={tw`text-base text-gray-600 text-left font-sans-bold`}>
              {item.name}
            </Title>
            <Text style={tw`text-left`}>{item.phoneNumber}</Text>
          </View>
        </>
      </TouchableRipple>
    </BoxShadowView>
  );
};

const loadingView = (
  <View style={tw`self-center my-auto`}>
    <ActivityIndicator size={50} color={tw.color("primary")} />
    <Text style={tw`mt-1`}>Loading Contacts</Text>
  </View>
);

/**
 * @typedef {Object} Contact
 * @property {string} name Fullname of selected contact
 * @property {string} phoneNumber Phone number of selected contact
 *
 * @typedef {Object} ContactPickerProps
 * @property {(selectedContact: Contact) => void} onContactSelect Function to be called when a contact is selected.\
 * This function will be passed an object describing the selected contact. This object has `name` and `phoneNumber` keys
 * @property {() => void} [onRequestClose] The onRequestClose prop allows passing a function that will be called
 *  once the modal has been dismissed. On the Android platform, this is a required function.
 * @property {() => void} [onBackgroundTouch] Function to call when the area around the modal is touched
 */

/**
 * Renders a modal showing user's contacts to pick from for top-up
 */
const ContactPicker = React.forwardRef(
  (/** @type {ContactPickerProps} */ props, ref) => {
    const [loadingContacts, setContactsLoading] = React.useState(true);
    const [contacts, setcontacts] = React.useState([]);
    const completeContacts = React.useRef();

    const loadContacts = async () => {
      let contacts = await getUserContacts();
      setContactsLoading(false);
      setcontacts(contacts);
      completeContacts.current = contacts;
    };
    React.useEffect(() => {
      loadContacts();
    }, []);

    const handleTextInputChange = React.useCallback(
      debounce((query) => {
        let filtered = completeContacts.current.filter((contact) => {
          return (
            contact.name.indexOf(query) > -1 ||
            contact.phoneNumber.toString().indexOf(query) > -1
          );
        });
        setcontacts(filtered);
      })
    );

    // takes item and passes it to `renderContact` along with callback for when contact is selected
    const handleRenderContact = React.useCallback(({ item }) =>
      renderContact(item, props.onContactSelect)
    );

    const searchBar = React.useMemo(() => {
      return (
        <View
          style={tw`w-full bg-gray-light mb-3 pt-3 rounded-t-lg items-center justify-center`}
        >
          <TextInput
            placeholder="Search Contact"
            style={tw`mx-auto py-3 pl-4 rounded-lg w-11/12 max-w-md bg-white`}
            onChangeText={handleTextInputChange}
          />
        </View>
      );
    });

    return (
      <ModalWrapper
        visible={true}
        modalPosition="bottom"
        onBackgroundTouch={props.onBackgroundTouch}
        onRequestClose={props.onRequestClose}
        overlayStyle={tw`p-0`}
      >
        <View
          style={tw.style(`bg-gray-light pb-4 rounded-t-2xl`, {
            height: "90%",
          })}
        >
          {loadingContacts ? (
            loadingView
          ) : (
            <FlatList
              data={contacts}
              ListHeaderComponent={searchBar}
              keyboardShouldPersistTaps="always"
              ListEmptyComponent={noContacts}
              stickyHeaderIndices={[0]}
              ref={ref}
              keyExtractor={(item, idx) => idx.toString()}
              renderItem={handleRenderContact}
            />
          )}
        </View>
      </ModalWrapper>
    );
  }
);

ContactPicker.propTypes = {
  onContactSelect: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func,
  onBackgroundTouch: PropTypes.func,
};

export default React.memo(ContactPicker);
