import React, { useState } from "react";
import tw from "../lib/tailwind";
import CurvedButton from "../components/Button";
import { Dimensions, Image } from "react-native";
import { Divider, Snackbar } from "react-native-paper";
import InputField from "../components/InputField";
import SafeArea from "../components/CustomSafeAreaView";
import Text, { View } from "../components/Themed";
import { Ionicons as Icon } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import useFormField from "../hooks/useFormField.hook";
import { signIn as signInAction } from "../store/slices/userSlice";
import LoaderModal from "../components/LoaderModal";
import { RootStackScreenProps, Server } from "../types";
import withTile from "../hooks/withTile";
import myAxios from "../adapters/instance";
import { AxiosResponse } from "axios";

//Images
const appIcon = require("../assets/images/icon.png");

// should follow `useFormField` hook validator rules
const emailValidator = (emailAddress: string) => {
  //validate email address
  if (!emailAddress.trim()) return `You didn't enter any e-mail address`;

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(emailAddress)) {
    return "That e-mail address is invalid";
  }
  return true;
};

// should follow `useFormField` hook validator rules
const passwordValidator = (password: string) => {
  //validate password
  if (!password || !password.trim()) return `You didn't enter any password`;
  return true;
};

const screenHeight = Dimensions.get("window").height;

/**
 * App sign in screen
 * It's worth noting that we show validation errors inline to the input fields they occured and we show
 * server or request error via a snackbar
 */
const SignInScreen = ({ navigation }: RootStackScreenProps<"Sign-In">) => {
  const dispatch = useDispatch();
  var isMounted = true; //app mount tracker

  // This will hold the error for requests and determine if snackbar is shown
  const [requestError, setRequestError] = React.useState("");

  //axios abort controller source
  let controller = new AbortController();

  const [emailValue, emailError, handleEmailChange] = useFormField({
    validator: emailValidator,
    initialValue: "",
  });

  const [passwordValue, passwordError, handlePasswordChange] = useFormField({
    validator: passwordValidator,
    initialValue: "",
  });

  const [signingIn, setSigningIn] = useState(false);
  /** Determines whether typed in password is obscured */
  const [passwordVisible, setPasswordVisible] = useState(false);

  //cancel request and reset mount variable to avoid mem-leak
  navigation.addListener("beforeRemove", () => {
    isMounted = false;
    controller.abort();
  });

  const goToSignUp = React.useCallback(() => {
    navigation.navigate("Sign-Up");
  }, []);

  const goToForgotPassword = React.useCallback(() => {
    navigation.navigate("Forgot-Password");
  }, []);

  //Sign in
  const _handleSignIn = () => {
    setRequestError(""); //hide snackbar error
    //assert empty values
    if (emailValue === "" || passwordValue === "") {
      handleEmailChange(""); //manually initiate error
      handlePasswordChange(""); //manually initiate error
      return;
    }

    //assert existing errors
    if (emailError || passwordError) return false;

    //no errors
    setSigningIn(true);

    // regenerate new abortcontroller every time a request is about to be made
    // so as to avoid permanently cancelling a request
    controller = new AbortController();

    myAxios
      .post<any, AxiosResponse<Server.LoginResponse>, any>(
        "/api/login",
        {
          email: emailValue,
          password: passwordValue,
        },
        {
          signal: controller.signal,
        }
      )
      .then((response) => {
        // @ts-ignore
        const accessToken = response.data.access_token,
          {
            created_at,
            email,
            email_verified_at,
            phone,
            unique_id,
            updated_at,
            username,
          } = response.data.data;

          // Sign user in
        dispatch(
          signInAction({
            accessToken,
            createdAt: created_at,
            email,
            emailVerifiedAt: email_verified_at,
            id: unique_id,
            phone,
            image:"",
            isAdmin:false,
            isVerified:false,
            noOfReferrals:0,
            referredBy:"",
            updatedAt:updated_at,
            username
          })
        );
        
        // isMounted && setSigningIn(false);
      })
      .catch((error: Server.RequestError) => {
        setRequestError(error.message);
        isMounted && setSigningIn(false);
      });
  };

  //eye slash icon
  const eyeIcon = React.useMemo(
    () => (
      <Icon
        onPress={() => setPasswordVisible(!passwordVisible)}
        name={passwordVisible ? "eye-off-sharp" : "eye-sharp"}
        size={22}
        color={tw.color("primary")}
      />
    ),
    [passwordVisible]
  );

  return (
    <SafeArea style={{ height: screenHeight, padding: 0 }}>
      {signingIn ? <LoaderModal loadingText="Signing In" /> : null}
      <View style={tw`mx-auto w-full h-full px-4 mt-5 bg-transparent`}>
        <Image
          source={appIcon}
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
            alignSelf: "center",
            flexGrow: 0,
          }}
        />
        <Text type="title" style={tw`text-center`}>
          Welcome Back!
        </Text>
        <Divider
          style={tw`h-1 bg-primary rounded-full w-20 mx-auto mt-1 mb-6`}
        />

        <View style={tw`bg-transparent`}>
          <InputField
            fieldLabel="Email Address"
            fieldType="input"
            fieldLabelIcon="ios-mail-sharp"
            value={emailValue}
            onChangeText={handleEmailChange}
            placeholder="Enter Email Address"
          />
          {emailError ? (
            <Text style={tw`text-red-700 pl-2 text-sm text-left font-sans`}>
              &gt; {emailError}
            </Text>
          ) : null}
        </View>

        <View style={tw`mt-4 bg-transparent`}>
          <InputField
            fieldLabel="Password"
            fieldType="input"
            placeholder="Enter Password"
            fieldLabelIcon="md-key-sharp"
            value={passwordValue}
            extraInputProps={{ secureTextEntry: !passwordVisible }}
            onChangeText={handlePasswordChange}
            rightInputNode={eyeIcon}
          />
          {passwordError ? (
            <Text style={tw`text-red-700 pl-1 text-sm text-left font-sans`}>
              &gt; {passwordError}
            </Text>
          ) : null}
        </View>

        <Text
          style={tw`underline text-primary my-4 font-sans-semibold text-center`}
          onPress={goToForgotPassword}
        >
          FORGOT PASSWORD?
        </Text>

        <CurvedButton
          label="Sign In"
          leftIconName="enter-outline"
          onPress={_handleSignIn}
        />
        <Text style={tw`mt-4 text-center`}>
          Not a member yet?{" "}
          <Text
            style={tw`underline text-primary font-sans-semibold`}
            onPress={goToSignUp}
          >
            SIGN UP
          </Text>
        </Text>
      </View>
      {/* Below snack will be used to show errors */}
      <Snackbar
        visible={!!requestError}
        style={tw`bg-error`}
        children={requestError}
        action={{ label: "OKAY", color: tw.color("on-dark") }}
        onDismiss={() => setRequestError("")}
      />
    </SafeArea>
  );
};

export default withTile(SignInScreen, 2);
