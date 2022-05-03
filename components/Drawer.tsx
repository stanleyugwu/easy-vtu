import React from "react";
import {
  ImageBackground,
  GestureResponderEvent,
  ImageRequireSource,
} from "react-native";
import Text, { View } from "./Themed";
import { Avatar, Drawer as _Drawer } from "react-native-paper";
import { Ionicons as Icon } from "@expo/vector-icons";
import tw from "../lib/tailwind";
import { ScrollView } from "react-native-gesture-handler";
import RippleButton, { RippleButtonProps } from "./RippleButton";
// @ts-ignore
import defaultHeaderImg from "../assets/images/drawer_bg.jpg";
import appStyles from "../lib/appStyles";

/** Type structure for a drawer item */
export type DrawerItemType = {
  /** Label text for item */
  label: string;
  /** Name of `Ionicon` icon to display at `left` side of drawer item */
  iconName: keyof typeof Icon.glyphMap;
  /** Callback to be called when drawer item is pressed */
  onItemPress: (event: GestureResponderEvent) => void;
};

/** Type for `DrawerItem` component props */
export type DrawerItemProps = DrawerItemType & RippleButtonProps;

/**
 * Renders pressable drawer item in the side drawer
 * @param {DrawerItemProps} props
 */
let DrawerItem = ({
  style,
  onItemPress,
  accessibilityLabel = "drawer item",
  label = "drawer item",
  iconName = "home",
  ...otherProps
}: DrawerItemProps) => {
  return (
    <RippleButton
      style={[tw`bg-surface`, style]}
      rippleColor="#0009"
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      borderless={false}
      onPress={onItemPress}
      {...otherProps}
    >
      <View
        style={[
          tw`w-full flex-row justify-between items-center pt-3 mb-3 bg-surface pb-3`,
          { borderBottomColor: "#eee", borderBottomWidth: 1 },
        ]}
      >
        <View style={tw`flex-row items-center bg-surface`}>
          <Icon
            accessibilityLabel={iconName + " icon"}
            name={iconName}
            color={tw.color("primary")}
            size={22}
            testID="left-icon"
          />

          <Text accessibilityLabel={label + " menu link"} style={tw`pl-6`}>
            {/* Capitalize label */}
            {label[0].toUpperCase() + label.slice(1)}
          </Text>
        </View>

        <Icon
          name="chevron-forward"
          color={tw.color("gray")}
          size={22}
          style={tw`self-end`}
        />
      </View>
    </RippleButton>
  );
};

// ==================================== DRAWER COMPONENT BELOW ====================================

export type DrawerProps = {
  /** Whether avatar image in the `Drawer` header is visible */
  showAvatar?: boolean;
  /** Source url to load header avatar image from.
   * This can be an online image starting with `https` or resource ID, i.e return value of `require`
   */
  avatarUri: ImageRequireSource;
  /** Callback to invoke when the avatar image is pressed */
  onAvatarPress?: (event: GestureResponderEvent) => void;
  /** Title text to show in the header */
  headerTitle?: string;
  /** text to show in the header, below `headerTitle` */
  headerSubTitle?: string;
  /** Drawer items to show in the upper drawer section */
  upperItems: DrawerItemType[];
  /** Drawer items to show in the lower drawer section */
  lowerItems?: DrawerItemType[];
} & typeof _Drawer.Section["defaultProps"]; //TODO: Add appropriate attribute

/**
 * App Drawer component that wraps `DrawerItem`
 * @param {DrawerProps} props
 */
let Drawer = ({
  accessibilityLabel = "drawer",
  avatarUri,
  style,
  showAvatar = false,
  onAvatarPress,
  headerTitle,
  headerSubTitle,
  upperItems = [],
  lowerItems,
  ...otherProps
}: DrawerProps) => {
  const resolvedSrc =
    avatarUri &&
    (typeof avatarUri === "number" ? avatarUri : { uri: avatarUri });

  // gradient={[tw.color('primary'),'#ffffff00','#2d3e6199','#ffffff00',]}

  return (
    <_Drawer.Section
      style={style}
      accessibilityLabel={accessibilityLabel}
      {...otherProps}
    >
      <ScrollView stickyHeaderIndices={[0]}>
        <ImageBackground
          source={defaultHeaderImg}
          style={{ width: "100%", height: "auto" }}
        >
          <View
            accessibilityLabel="drawer header"
            style={tw.style(
              "bg-primary p-3",
              { opacity: 0.87 },
              appStyles.boxShadow
            )}
          >
            {showAvatar ? (
              <RippleButton
                borderless={true}
                rippleColor={tw.color("secondary")}
                onPress={onAvatarPress}
              >
                {avatarUri ? (
                  <Avatar.Image
                    accessibilityLabel="profile image"
                    source={resolvedSrc}
                    size={80}
                  />
                ) : (
                  <Avatar.Icon
                    accessibilityLabel="profile image"
                    icon="account"
                    style={tw`text-on-primary bg-surface`}
                    size={80}
                  />
                )}
              </RippleButton>
            ) : null}

            {headerTitle ? (
              <Text
                type="title"
                accessibilityLabel="account name"
                style={tw`text-on-primary text-left pl-2 mt-4`}
              >
                {headerTitle}
              </Text>
            ) : null}

            {headerSubTitle ? (
              <Text
                type="body2"
                accessibilityLabel="account email"
                style={tw`text-on-primary text-left pl-2`}
              >
                {headerSubTitle}
              </Text>
            ) : null}
          </View>
        </ImageBackground>

        <View style={tw`mt-14 px-4 bg-surface`}>
          {upperItems.map((item, idx) => {
            return (
              <DrawerItem
                key={"" + idx}
                label={item.label}
                iconName={item.iconName}
                onItemPress={item.onItemPress}
              />
            );
          })}
        </View>

        {lowerItems ? (
          <View style={tw`mt-8 px-4 bg-surface`}>
            {lowerItems.map((item, idx) => {
              return (
                <DrawerItem
                  key={"" + idx}
                  label={item.label}
                  iconName={item.iconName}
                  onItemPress={item.onItemPress}
                />
              );
            })}
          </View>
        ) : null}
      </ScrollView>
    </_Drawer.Section>
  );
};

//@ts-ignore
DrawerItem = React.memo(DrawerItem);
//@ts-ignore
Drawer = React.memo(Drawer);

export { DrawerItem, Drawer as default };
