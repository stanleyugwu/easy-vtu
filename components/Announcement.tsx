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
import type { RemoteConfig, RootState } from "../types";
import RippleButton from "./RippleButton";
import isItTime from "../utils/isItTime";
import { useDispatch, useSelector } from "react-redux";
import { setAnnouncementModalLastSeen } from "../store/slices/appSlice";

const Announcement = () => {
  const announcement = JSON.parse(
    remoteConfig().getValue("announcement").asString()
  ) as RemoteConfig.Announcement;

  if(!announcement.title && !announcement.message) return null; // Assert there are announcements

  const [modalOpen, setModalOpen] = React.useState(true);
  const dispatch = useDispatch();

  const handleUpdateClick = React.useCallback(() => {
    Linking.openURL(announcement.buttonUrl as string).finally(() => {
      handleCloseModal();
    });
  }, [announcement.buttonUrl]);

  const handleCloseModal = React.useCallback(() => {
    setModalOpen(false);
  }, []);

  const lastAnnouncementTime = useSelector((state:RootState) => state.app.announcementModalLastSeen);
  
  // Checks if modal has been closed by user
  if (!modalOpen) return null;
  
  // assert if it's been over 24 hours since we showed dialog last
  const canShowDialog = isItTime(lastAnnouncementTime, 86400000/* 24 hours */);
  if(canShowDialog) {
    // dialog should show now, lets update the last seen time
    dispatch(setAnnouncementModalLastSeen(Date.now()));
  } else return null;

  return (
    <ModalWrapper
      style={{ height: "100%" }}
      onDismiss={handleCloseModal}
      onRequestClose={handleCloseModal}
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
        {announcement.buttonUrl ? (
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
