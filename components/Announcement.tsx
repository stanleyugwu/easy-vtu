import React from "react";
import Text, { View } from "./Themed";
import remoteConfig from "@react-native-firebase/remote-config";
import tw from "../lib/tailwind";
import ModalWrapper from "./ModalWrapper";
import { Image, Linking } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
// @ts-ignore
import announcementAnimation from "../assets/images/announcement_animation.gif";
import { Ionicons as Icon } from "@expo/vector-icons";
import type { RemoteConfig } from "../types";
import RippleButton from "./RippleButton";

const Announcement = () => {
  const announcement = JSON.parse(
    remoteConfig().getValue("announcement").asString()
  ) as RemoteConfig.Announcement;

  if(!announcement.title && !announcement.message) return null; // Assert there are announcements

  const [modalOpen, setModalOpen] = React.useState(true);

  const handleUpdateClick = React.useCallback(() => {
    Linking.openURL(announcement.updateUrl as string).finally(() => {
      handleCloseModal();
    });
  }, [announcement.updateUrl]);

  const handleCloseModal = React.useCallback(() => {
    setModalOpen(false);
  }, []);

  // Checks if modal has been closed by user
  if (!modalOpen) return null;

  return (
    <ModalWrapper
      style={{ height: "100%" }}
      onDismiss={handleCloseModal}
      onRequestClose={handleCloseModal}
      onBackgroundTouch={handleCloseModal}
    >
      <View
        style={[
          tw`bg-surface`,
          { height: announcement.message ? "90%" : "auto" },
        ]}
      >
        <View style={[tw`bg-primary p-3`]}>
          <Icon
            name="close-sharp"
            size={30}
            color={tw.color("secondary")}
            style={tw`absolute text-secondary right-2 top-2`}
            onPress={handleCloseModal}
          />
          <Image source={announcementAnimation} style={tw`w-36 h-20 mx-auto`} />
          <Text type="title" style={tw`text-center text-on-primary`}>
            {announcement.title || "Announcement!!!"}
          </Text>
        </View>
        {announcement.message ? (
          <ScrollView style={{ padding: 10 }}>
            <Text style={tw`py-2`}>{announcement.message}</Text>
          </ScrollView>
        ) : null}
        {announcement.updateUrl ? (
          <View style={{ height: "10%", backgroundColor: "transparent" }}>
            <RippleButton
              style={tw`bg-primary mx-4 rounded-xl`}
              onPress={handleUpdateClick}
            >
              <View style={tw`bg-transparent p-4`}>
                <Text type="button" style={tw`text-secondary text-center`}>
                  UPDATE NOW
                </Text>
              </View>
            </RippleButton>
          </View>
        ) : null}
      </View>
    </ModalWrapper>
  );
};

export default React.memo(Announcement);
