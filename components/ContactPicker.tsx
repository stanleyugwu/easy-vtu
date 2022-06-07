import React from "react";
import {
  ActivityIndicator,
  Linking,
  ListRenderItemInfo,
  TextInput,
} from "react-native";
import * as Contacts from "expo-contacts";
import { FlatList } from "react-native-gesture-handler";
import tw from "../lib/tailwind";
import Text, { View, ViewProps } from "./Themed";
import debounce from "../utils/debounce";
import Contact from "./Contact";
import type { Contact as ContactType } from "../types";
import Modal from "react-native-modal";
import Layout from "../constants/Layout";
import { Ionicons as Icon } from "@expo/vector-icons";
import Button from "./Button";
import appStyles from "../lib/appStyles";

export type ContactPickerProps = {
  /** Function to be called when a contact is selected.\
   * This function will be passed an object describing the selected contact. This object has `name` and `phoneNumber` keys
   */
  onContactSelect: (selectedContact: ContactType) => void;
  /**
   * Function to be called when Android back button is pressed
   */
  onBackButtonPress?: () => void;
  /** Function to call when the area around the modal is touched */
  onBackdropTouch?: () => void;
  isVisible: boolean;
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

const noContacts = (
  <Text type="body" style={tw`self-center my-auto text-gray`}>
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
      onBackdropTouch,
      onBackButtonPress,
      isVisible = true,
      style,
      ...otherProps
    }: ContactPickerProps,
    ref: React.ForwardedRef<any>
  ) => {
    if (!isVisible) return null;
    const [loadingContacts, setContactsLoading] = React.useState(true);
    const [deniedContactsPermission, setDeniedContactsPermission] =
      React.useState(false);
    const [contacts, setContacts] = React.useState<ContactType[]>([]);
    const completeContacts = React.useRef<ContactType[]>();

    /**
     * Loads and shows user's contacts
     * @returns array of users contacts
     */
    const loadUserContacts = React.useCallback(async () => {
      const { status, granted, canAskAgain } =
        await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        setDeniedContactsPermission(false);
        let { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
          sort: Contacts.SortTypes.FirstName,
        });
        setContactsLoading(false);
        setContacts(filterContacts(data));
        completeContacts.current = filterContacts(data);
        return;
      } else if (!granted || !canAskAgain) {
        setDeniedContactsPermission(true);
      }
    }, []);

    React.useEffect(() => {
      loadUserContacts();
    }, []);

    const handleTextInputChange = debounce((query: string) => {
      if (!completeContacts.current) return;
      query = query.toLowerCase();

      let filtered = completeContacts.current.filter((contact) => {
        return (
          contact.name.toLowerCase().indexOf(query) > -1 ||
          contact.phoneNumber.toString().indexOf(query) > -1
        );
      });
      setContacts(filtered);
    });

    const handleGrantContactPermission = async () => {
      await Linking.openSettings();
      (onBackdropTouch || onBackButtonPress)?.();
    };

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
          style={tw`w-full flex-row mb-3 pt-3 px-2 rounded-t-2xl items-center justify-between bg-background`}
        >
          <TextInput
            placeholder="Search Contact"
            style={[
              tw`py-3 pl-4 rounded-lg max-w-md bg-white`,
              { width: "90%" },
              appStyles.boxShadow,
            ]}
            onChangeText={handleTextInputChange}
          />
          <Icon
            onPress={onBackdropTouch}
            name="chevron-down-circle"
            size={28}
            color={tw.color("primary")}
            style={{ alignSelf: "flex-end", width: "10%", margin: 10 }}
          />
        </View>
      );
    }, []);

    return (
      <Modal
        isVisible={isVisible}
        onBackButtonPress={onBackButtonPress}
        onBackdropPress={onBackdropTouch}
        animationInTiming={500}
        animationOutTiming={500}
        deviceHeight={Layout.screen.height}
        deviceWidth={Layout.screen.width}
        backdropTransitionInTiming={800}
        supportedOrientations={["portrait", "landscape"]}
        backdropTransitionOutTiming={500}
        animationIn={"slideInUp"}
        animationOut={"slideOutDown"}
        style={{
          justifyContent: "flex-end",
          margin: 0,
          alignSelf: "center",
          width: "100%",
        }}
      >
        <View
          style={[
            tw`rounded-t-2xl`,
            {
              height: "70%",
              width: "100%",
            },
            style,
          ]}
          {...otherProps}
        >
          {loadingContacts && !deniedContactsPermission ? (
            loadingView
          ) : deniedContactsPermission ? (
            <View
              style={tw`p-4 justify-center items-center self-center m-auto`}
            >
              <Icon name="sad-outline" size={70} />
              <Text style={tw`text-center mb-6`}>
                You denied the app permission to read your contacts. You won't
                be able to choose from your contacts for topping-up if you don't
                grant the permission.
              </Text>
              <Button
                label="Grant Permission"
                onPress={handleGrantContactPermission}
              />
            </View>
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
      </Modal>
    );
  }
);

export default React.memo(ContactPicker);
