import React from "react";
import {
  View,
  ImageBackground,
  GestureResponderEvent,
  ImageURISource,
} from "react-native";
import Text, { Title } from "./Type";
import { Avatar, Drawer as _Drawer, TouchableRipple } from "react-native-paper";
import { Ionicons as Icon } from "@expo/vector-icons";
import tw from "../lib/tailwind";
import { ScrollView } from "react-native-gesture-handler";
import BoxShadowView from "./BoxShadowView";
import PropTypes from "prop-types";
import { ViewStyle } from "react-native";
import defaultHeaderImg from "../../assets/drawer_bg.jpg";

/**
 * @typedef {Object} DrawerItemProp DrawerItem props
 * @property {string} [accessibilityLabel] Custom accessibily label for parent `Pressable` element
 * @property {string} label Label text for item
 * @property {string} iconName Name of `Ionicon` icon to display at `left` side of drawer item
 * @property {(event:GestureResponderEvent) => void} onItemPress Callback to be called when drawer item is pressed
 */

/**
 * Renders pressable drawer item in the side drawer
 * @param {DrawerItemProp} props
 */
let DrawerItem = (props) => {
  return (
    <TouchableRipple
      style={tw`w-full flex-row justify-between items-center pt-3 mb-3 border-b pb-3 border-gray-200`}
      rippleColor="#0006"
      accessibilityRole="button"
      accessibilityLabel={props.accessibilityLabel}
      centered={true}
      borderless={false}
      onPress={props.onItemPress}
    >
      <>
        <View style={tw`flex-row items-center`}>
          <Icon
            accessibilityLabel={props.iconName + " icon"}
            name={props.iconName}
            color={tw.color("primary")}
            size={22}
            testID="left-icon"
          />

          <Text
            accessibilityLabel={props.label + " menu link"}
            style={tw`pl-6 text-black`}
          >
            {props.label[0].toUpperCase() + props.label.slice(1)}
            {/* Capitalize label */}
          </Text>
        </View>

        <Icon
          name="chevron-forward"
          color={tw.color("black")}
          size={22}
          style={tw`self-end`}
        />
      </>
    </TouchableRipple>
  );
};

DrawerItem.propTypes = {
  accessibilityLabel: PropTypes.string,
  label: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  onItemPress: PropTypes.func.isRequired,
};

DrawerItem.defaultProps = {
  accessibilityLabel: "drawer item",
  label: "drawer item",
  iconName: "home",
};

/**
 * @typedef {Object} DrawerProp Drawer props
 * @property {string} [accessibilityLabel] Custom accessibility label for parent element
 * @property {ViewStyle} [wrapperStyle] Custom `View` style for wrapper element
 * @property {boolean} showAvatar Whether avatar image in the `Drawer` header is visible
 * @property {ImageURISource} avatarUri Source url to load header avatar image from.
 * This can be an online image starting with `https` or resource ID, i.e return value of `require`
 * @property {(event: GestureResponderEvent) => void} onAvatarPress Callback to invoke when the avatar image is pressed
 * @property {string} headerTitle Title text to show in the header
 * @property {string} headerSubTitle text to show in the header, below `headerTitle`
 * @property {DrawerItemProp[]} upperItems Drawer items to show in the upper drawer section
 * @property {DrawerItemProp[]} lowerItems Drawer items to show in the lower drawer section
 */

/**
 * App Drawer component that wraps `DrawerItem`
 * @param {DrawerProp} props
 */
let Drawer = (props) => {
  const resolvedSrc =
    typeof props.avatarUri === "number"
      ? props.avatarUri
      : { uri: props.avatarUri };

  // gradient={[tw.color('primary'),'#ffffff00','#2d3e6199','#ffffff00',]}

  return (
    <_Drawer.Section
      style={props.wrapperStyle}
      accessibilityLabel={props.accessibilityLabel}
    >
      <ScrollView>
        <ImageBackground
          source={defaultHeaderImg}
          style={{ width: "100%", height: props.showAvatar ? 181 : "auto" }}
        >
          <BoxShadowView
            accessibilityLabel="drawer header"
            containerStyle={tw.style("bg-primary p-3", { opacity: 0.87 })}
          >
            {props.showAvatar ? (
              <TouchableRipple
                borderless={true}
                rippleColor={tw.color("accent")}
                centered={true}
                onPress={props.onAvatarPress}
              >
                {props.avatarUri ? (
                  <Avatar.Image
                    accessibilityLabel="profile image"
                    source={resolvedSrc}
                    size={80}
                  />
                ) : (
                  <Avatar.Icon
                    accessibilityLabel="profile image"
                    icon="account"
                    style={tw`text-white bg-white`}
                    size={80}
                  />
                )}
              </TouchableRipple>
            ) : null}

            <Title
              accessibilityLabel="account name"
              style={tw`text-white text-left pl-2 mt-4`}
            >
              {props.headerTitle}
            </Title>
            <Text
              accessibilityLabel="account email"
              style={tw`text-gray-300 text-left pl-2`}
            >
              {props.headerSubTitle}
            </Text>
          </BoxShadowView>
        </ImageBackground>

        <View style={tw`mt-14 px-4`}>
          {props.upperItems.map((item, idx) => {
            return (
              <DrawerItem
                key={"" + idx}
                label={item.label}
                iconName={item.iconName}
                onItemPress={item.onPress}
              />
            );
          })}
        </View>

        {props.lowerItems ? (
          <View style={tw`mt-8 px-4`}>
            {props.lowerItems.map((item, idx) => {
              return (
                <DrawerItem
                  key={"" + idx}
                  label={item.label}
                  iconName={item.iconName}
                  onItemPress={item.onPress}
                />
              );
            })}
          </View>
        ) : null}
      </ScrollView>
    </_Drawer.Section>
  );
};

Drawer.propTypes = {
  accessibilityLabel: PropTypes.string,
  wrapperStyle: PropTypes.object,
  showAvatar: PropTypes.bool.isRequired,
  avatarUri: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  onAvatarPress: PropTypes.func.isRequired,
  headerTitle: PropTypes.string,
  headerSubTitle: PropTypes.string,
  upperItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  lowerItems: PropTypes.arrayOf(PropTypes.object),
};

Drawer.defaultProps = {
  accessibilityLabel: "drawer",
  showAvatar: false,
  headerTitle: "Welcome",
  headerSubTitle: "easyVtu",
  upperItems: [],
  lowerItems: [],
};

DrawerItem = React.memo(DrawerItem);
Drawer = React.memo(Drawer);

export { DrawerItem, Drawer as default };
