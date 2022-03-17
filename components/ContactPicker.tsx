import React from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  ListRenderItemInfo,
  TextInput,
} from "react-native";
import * as Contacts from "expo-contacts";
import ModalWrapper from "./ModalWrapper";
import { FlatList } from "react-native-gesture-handler";
import tw from "../lib/tailwind";
import Text, { View, ViewProps } from "./Themed";
import debounce from "../utils/debounce";
import Contact from "./Contact";
import type { Contact as ContactType } from "../types";

export type ContactPickerProps = {
  /** Function to be called when a contact is selected.\
   * This function will be passed an object describing the selected contact. This object has `name` and `phoneNumber` keys
   */
  onContactSelect: (selectedContact: ContactType) => void;
  /** The onRequestClose prop allows passing a function that will be called
   *  once the modal has been dismissed. On the Android platform, this is a required function.
   */
  onRequestClose?: () => void;
  /** Function to call when the area around the modal is touched */
  onBackgroundTouch?: (event: GestureResponderEvent) => void;
} & ViewProps;

/**
 * filters given contacts array, removing contacts with short or no phone number
 * @param {Object[]} contacts
 * @returns {ContactType[]}
 */
const filterContacts = (contacts: Contacts.Contact[]) => {
  return contacts
    .filter((contact) => {
      //filter out only valid contacts
      let number = contact?.phoneNumbers?.[0]?.number;
      if (number && number.toString().length > 6) return true;
    })
    .map((contact) => {
      //loop through filtered contacts and construct payload with only needed data
      let modifiedContact = {} as ContactType;
      modifiedContact.name = contact?.name || "Unknown";
      // @ts-ignore
      modifiedContact.phoneNumber = contact.phoneNumbers[0].number;
      return modifiedContact;
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

    return filterContacts(data);
  }
  return []; //there's no check for error so lets return an empty array
};

const noContacts = (
  <Text type="title" style={tw`self-center my-auto text-gray`}>
    No Contact Found
  </Text>
);

const loadingView = (
  <View style={tw`self-center my-auto`}>
    <ActivityIndicator size={50} color={tw.color("primary")} />
    <Text style={tw`mt-1`}>Loading Contacts</Text>
  </View>
);

/**
 * Renders a modal showing user's contacts to pick from for top-up
 */
const ContactPicker = React.forwardRef(
  (
    {
      onContactSelect,
      onBackgroundTouch,
      onRequestClose,
      style,
      ...otherProps
    }: ContactPickerProps,
    ref: React.ForwardedRef<any>
  ) => {
    const [loadingContacts, setContactsLoading] = React.useState(true);
    const [contacts, setContacts] = React.useState<ContactType[]>([]);
    const completeContacts = React.useRef<ContactType[]>();

    const loadContacts = async () => {
      let contacts = await getUserContacts();
      setContactsLoading(false);
      setContacts(contacts);
      completeContacts.current = contacts;
    };
    React.useEffect(() => {
      loadContacts();
    }, []);

    const handleTextInputChange = React.useCallback(
      debounce((query: string) => {
        if (!completeContacts.current) return undefined;

        let filtered = completeContacts.current.filter((contact) => {
          return (
            contact.name.indexOf(query) > -1 ||
            contact.phoneNumber.toString().indexOf(query) > -1
          );
        });
        setContacts(filtered);
      }),
      []
    );

    // takes item and passes it to `renderContact` along with callback for when contact is selected
    const handleRenderContact = ({ item }: ListRenderItemInfo<ContactType>) => (
      <Contact
        name={item.name}
        phoneNumber={item.phoneNumber}
        onContactSelect={onContactSelect}
      />
    );

    const searchBar = React.useMemo(() => {
      return (
        <View
          style={tw`w-full mb-3 pt-3 rounded-t-lg items-center justify-center`}
        >
          <TextInput
            placeholder="Search Contact"
            style={tw`mx-auto py-3 pl-4 rounded-lg w-11/12 max-w-md bg-white`}
            onChangeText={handleTextInputChange}
          />
        </View>
      );
    }, []);

    return (
      <ModalWrapper
        visible={true}
        modalPosition="bottom"
        onBackgroundTouch={onBackgroundTouch}
        onRequestClose={onRequestClose}
        overlayStyle={tw`p-0`}
      >
        <View
          style={[
            tw`pb-4 rounded-t-2xl`,
            {
              height: "90%",
            },
            style,
          ]}
          {...otherProps}
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
              keyExtractor={(_, idx) => idx.toString()}
              renderItem={handleRenderContact}
            />
          )}
        </View>
      </ModalWrapper>
    );
  }
);

export default React.memo(ContactPicker);
