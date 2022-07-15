import React from "react";
import {
  Image,
  Platform,
  UIManager,
  LayoutAnimation,
  Alert,
  TouchableOpacity,
} from "react-native";
import Text, { View } from "../../components/Themed";
import tw from "../../lib/tailwind";
import { SafeAreaView } from "react-native-safe-area-context";
import Layout from "../../constants/Layout";
import { ScrollView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import {
  FormFieldsTypes,
  RootState,
  RootTabScreenProps,
  Server,
} from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons as Icon } from "@expo/vector-icons";
import SmartTextInput from "../../components/SmartTextInput";
import Button from "../../components/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import LoaderModal from "../../components/LoaderModal";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import myAxios from "../../adapters/instance";
import { Snackbar } from "react-native-paper";
import { AxiosResponse } from "axios";
import { updateProfile } from "../../store/slices/userSlice";
import store from "../../store";
import appStyles from "../../lib/appStyles";
import RippleButton from "../../components/RippleButton";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export type Info = {
  title: string;
  label: string;
};
export const Info = ({ label, title }: Info) => {
  return (
    <View style={tw.style(`bg-surface p-2 border-b`, { borderColor: "#eee" })}>
      <Text type="body2" style={tw`text-gray mb-2`}>
        {title}
      </Text>
      <Text>{label}</Text>
    </View>
  );
};

const EditProfileSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "That username is too short!")
    .max(50, "That username is too long!")
    .required("Username is required"),

  email: Yup.string()
    .email("That e-mail address is invalid!")
    .required("You didn't enter any e-mail address"),

  phone: Yup.string()
    .matches(/^0(7|8|9)(0|1)[0-9]{8}$/, "That mobile number is invalid")
    .required("You didn't enter any mobile number"),
});

const ProfileScreen = ({ navigation }: RootTabScreenProps<"Profile">) => {
  const fluidWidth = (defaultWidth = "100%", tabletWidth = "80%") => {
    return Layout.window.width > 780 ? tabletWidth : defaultWidth;
  };
  const profile = useSelector((state: RootState) => state.user.profile);
  const baseUrl = myAxios.defaults.baseURL;
  const [editingProfile, setEditingProfile] = React.useState(false);
  const [updatingProfile, setUpdatingProfile] = React.useState<string>();
  const [uploadedImage, setUploadedImage] = React.useState<string>();

  const dispatch = useDispatch();

  // Snackbar triggers
  const [profileUpdateSuccessMsg, setProfileUpdateSuccessMsg] =
    React.useState<string>();
  const [profileUpdatError, setProfileUpdateError] = React.useState<string>();

  if (!profile) return null;

  /******************
   * FORMIK
   *******************/
  const onSubmitChanges = async (values: {
    username: string;
    email: string;
    phone: string;
  }) => {
    if (
      Object.values(values).join("") ===
        profile?.username + profile.email + profile.phone &&
      !uploadedImage
    ) {
      Alert.alert(
        "Nothing to update",
        "You didn't modify any detail so there's nothing to update"
      );
      return;
    }

    setProfileUpdateError(undefined); // clear any error

    // Let's handle profile pic upload if user changed profile pic
    // we intentionally await for pic upload before profile details update
    // so when we update profile details we can get updated profile pic url
    if (uploadedImage) {
      setUpdatingProfile("Updating profile picture...");
      const uploadUrl = baseUrl + "/api/change_picture";
      const token = store.getState().user.accessToken || "";
      try {
        //TODO: request for seperate endpoint for pic upload
        let response = await FileSystem.uploadAsync(uploadUrl, uploadedImage, {
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: "image",
          httpMethod: "POST",
          headers: { Authorization: token },
        });

        // we manually throw to catch-block if response is not OK
        if (response.status != 200) throw Error();

        // At this point, response is OK
        setProfileUpdateSuccessMsg("Profile pic updated successfully");
        // TODO: Update local image url with newly returned image url from server
        // TODO: clear uploadedImage state, since image state has been updated
      } catch (error) {
        setProfileUpdateError("Profile picture update failed!");
      }
    }

    // we don't update profile info if nothing changed
    if (
      Object.values(values).join("") ===
      profile?.username + profile.email + profile.phone
    ) {
      setUpdatingProfile(undefined);
      return;
    }

    // At this point it means something changed
    setUpdatingProfile("Updating profile info..."); // we're done with pic upload let's change loader status

    // Let's handle profile details upload, whether pic update failed or not
    myAxios
      .post<
        any,
        AxiosResponse<Server.UpdateProfile>,
        FormFieldsTypes.UpdateProfile
      >("/api/update_profile", {
        email: values.email,
        phone: values.phone,
        username: values.username,
      })
      .then(({ data: { data: profile = {} } = {} }) => {
        // updated successfully
        setUpdatingProfile(undefined); // hide loader, we're done with updates
        setProfileUpdateSuccessMsg("Profile info updated successfully"); // show success msg
        // update local state
        dispatch(
          updateProfile({
            id: profile.unique_id,
            username: profile.username,
            email: profile.email,
            phone: profile.phone,
            image: profile.image,
            emailVerifiedAt: profile.email_verified_at,
            createdAt: profile.created_at,
            updatedAt: profile.updated_at,
          })
        );

        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setEditingProfile(false);
      })
      .catch((error: Server.ErrorResponse) => {
        setUpdatingProfile(undefined);
        setProfileUpdateError(
          "Profile info update failed. Make sure you're connected to internet and try again"
        );
      });
  };

  const formik = useFormik({
    initialValues: {
      username: profile.username,
      email: profile.email,
      phone: profile.phone,
    },
    onSubmit: onSubmitChanges,
    validateOnMount: true,
    validationSchema: EditProfileSchema,
  });

  /*************
   * HANDLERS
   ************/
  const handleStartEditing = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setEditingProfile(true);
  };
  const handleChangeProfilePic = async () => {
    if (!editingProfile) setEditingProfile(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      allowsMultipleSelection: false,
      base64: false,
    });

    if (!result.cancelled) {
      setUploadedImage(result.uri);
    }
  };
  const handleChangePassword = () => {
    // go to change password screen
  };
  const handleCancelEditing = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    formik.resetForm();
    setEditingProfile(false);
    setUploadedImage(undefined);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          width: fluidWidth("100%", "80%"),
          padding: 10,
        }}
        keyboardShouldPersistTaps="always"
      >
        <StatusBar backgroundColor={tw.color("background")} style="dark" />

        <View
          style={{
            flexDirection: "row",
            marginBottom: 12,
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: 10,
          }}
        >
          <View style={tw`flex-row items-center justify-center`}>
            <Icon
              name="arrow-back"
              size={25}
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Text type="heading" style={tw`font-sans-bold p-1.5 ml-2 mt-2`}>
              {editingProfile ? "Edit Profile" : "Profile"}
            </Text>
          </View>
          {!editingProfile ? (
            <TouchableOpacity
              activeOpacity={0.7}
              style={tw`bg-primary flex-row p-1.5 px-2 rounded-md items-center`}
              onPress={handleStartEditing}
            >
              <Text type="subTitle" style={tw`text-secondary `}>
                Edit profile
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View
          style={tw.style(
            `bg-surface rounded-t-2xl pt-3 mt-4`,
            appStyles.boxShadowSmall
          )}
        >
          <View
            style={{
              alignSelf: "center",
              width: 120,
              justifyContent: "center",
              alignItems: "center",
              padding: 5,
              height: 120,
              borderWidth: 1,
              borderColor: tw.color("blue-100"),
              borderRadius: 999,
            }}
          >
            <Image
              source={{
                uri:
                  editingProfile && uploadedImage
                    ? uploadedImage
                    : //TODO: change url to profile image url
                      "https://cdn.dribbble.com/users/5205506/screenshots/11539440/media/430094ba50287040188fb9f581a2c8de.png?compress=1&resize=800x600",
                height: "100%",
                width: "100%",
              }}
              style={{
                borderRadius: 999,
                backgroundColor: tw.color("blue-100"),
                width: "100%",
                height: "100%",
              }}
            />
            <Icon
              name={"camera-outline"}
              onPress={handleChangeProfilePic}
              style={tw`absolute bottom-1 right-1 bg-secondary rounded-full p-1.5`}
              size={22}
            />
          </View>
          {editingProfile ? (
            <View style={tw`p-2 bg-surface`}>
              <SmartTextInput
                fieldLabel={"Username"}
                value={formik.values.username}
                style={tw`mt-6`}
                onChangeText={formik.handleChange("username")}
                fieldType="input"
                placeholder="Enter Username"
                error={!!formik.errors.username}
                leftInputIcon="person-outline"
              />
              <SmartTextInput
                fieldLabel={"Email Address"}
                value={formik.values.email}
                fieldType="input"
                extraInputProps={{ keyboardType: "email-address" }}
                placeholder="Enter Email Address"
                onChangeText={formik.handleChange("email")}
                leftInputIcon="mail-outline"
                error={!!formik.errors.email}
              />
              <SmartTextInput
                fieldLabel={"Mobile Number"}
                value={formik.values.phone}
                placeholder="Enter Mobile Number"
                extraInputProps={{ keyboardType: "number-pad" }}
                onChangeText={formik.handleChange("phone")}
                fieldType="input"
                leftInputIcon="call-outline"
                error={!!formik.errors.phone}
              />
              {formik.errors.email ||
              formik.errors.phone ||
              formik.errors.username ? (
                <Text type="subTitle2" style={tw`text-error text-center mt-4`}>
                  {formik.errors.username ||
                    formik.errors.email ||
                    formik.errors.phone}
                </Text>
              ) : null}
              <Button
                label={"Save Changes"}
                style={tw`mt-6`}
                onPress={formik.handleSubmit}
              />
              <Text
                type="subTitle"
                style={tw`self-center underline text-primary mt-4`}
                onPress={handleCancelEditing}
              >
                Cancel Editing
              </Text>
            </View>
          ) : (
            <View style={tw`bg-transparent`}>
              <Text type="title" style={tw`text-center`}>
                {profile.username}
              </Text>
              {profile.isAdmin || profile.isVerified ? (
                <View
                  style={tw`justify-center items-center flex-row bg-surface`}
                >
                  {profile.isVerified ? (
                    <Text
                      type="subTitle2"
                      style={tw`bg-green-400 text-xs mr-1 p-0.5 px-2 text-background rounded-2xl`}
                    >
                      Verified
                    </Text>
                  ) : null}
                  {profile.isAdmin ? (
                    <Text
                      type="subTitle2"
                      style={tw`ml-1 p-0.5 px-2 text-xs bg-blue-400 text-background rounded-2xl`}
                    >
                      Admin
                    </Text>
                  ) : null}
                </View>
              ) : null}
              <Text style={tw`text-center`}>{profile.email}</Text>
              <Text
                type="subTitle"
                style={tw`text-center mb-4 text-on-background`}
              >
                {profile.phone}
              </Text>
              <View style={tw`bg-surface p-1.5 border-t border-background`}>
                <Info
                  label={profile.referredBy || "None"}
                  title="Referred By"
                />
                <Info
                  label={profile.noOfReferrals.toString()}
                  title="No Of Referrals"
                />
                {profile.createdAt ? (
                  <Info
                    label={new Date(profile.createdAt).toDateString()}
                    title="Registeration Date"
                  />
                ) : null}
                <View
                  style={tw.style(
                    `flex-row justify-between items-center bg-transparent border-b`,
                    { borderColor: "#eee" }
                  )}
                >
                  <Info label={"************"} title="Password" />
                  <RippleButton
                    style={tw`bg-primary mr-4 rounded-lg justify-center`}
                    onPress={handleChangePassword}
                    rippleColor={tw.color("secondary")}
                  >
                    <View style={tw`p-1`}>
                      <Text
                        type="button"
                        onPress={() => navigation.navigate("Forgot-Password")}
                        style={tw`text-secondary-dark`}
                      >
                        CHANGE
                      </Text>
                    </View>
                  </RippleButton>
                </View>
                {profile.updatedAt ? (
                  <Info
                    label={new Date(profile.updatedAt).toDateString()}
                    title="Last Account Update"
                  />
                ) : null}
                {profile.emailVerifiedAt ? (
                  <Info
                    label={new Date(profile.emailVerifiedAt).toDateString()}
                    title="Email Verification Date"
                  />
                ) : null}
              </View>
            </View>
          )}
        </View>

        {!!updatingProfile ? (
          <LoaderModal loadingText={updatingProfile} />
        ) : null}
      </ScrollView>
      <Snackbar
        onDismiss={() => setProfileUpdateSuccessMsg(undefined)}
        visible={!!profileUpdateSuccessMsg}
        style={{ backgroundColor: "green" }}
        duration={2000}
      >
        <Icon name="checkmark-circle-outline" size={23} />{" "}
        {profileUpdateSuccessMsg}
      </Snackbar>

      <Snackbar
        duration={2000}
        style={tw`bg-black`}
        visible={!!profileUpdatError}
        onDismiss={() => setProfileUpdateError(undefined)}
      >
        <Icon name="cloud-offline-outline" size={23} /> {profileUpdatError}
      </Snackbar>
    </SafeAreaView>
  );
};

export default ProfileScreen;
