import React, { useState } from "react";
import tw from "../lib/tailwind";
import CurvedButton from "../components/Button";
import { Dimensions } from "react-native";
import { Divider, Snackbar } from "react-native-paper";
import InputField from "../components/InputField";
import SafeArea from "../components/CustomSafeAreaView";
import Text, { View } from "../components/Themed";
import { Ionicons as Icon } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import useFormField from "../hooks/useFormField.hook";
import { signIn as signInAction } from "../store/slices/userSlice";
import LoaderModal from "../components/LoaderModal";
import { FormFieldsTypes, RootStackScreenProps, Server } from "../types";
import myAxios from "../adapters/instance";
import { AxiosResponse } from "axios";
import FadeInView from "../components/FadeInView";
import { ScrollView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import welcomeAnimation from "../assets/json/welcome_animation.json";
import AnimatedLottieView from "lottie-react-native";
import Layout from "../constants/Layout";

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

  const goToForgotPassword = React.useCallback(() => {
    navigation.navigate("Forgot-Password");
  }, []);

  //Sign in
  const _handleSignIn = () => {
    setRequestError(""); //hide snackbar error
    //assert empty values
    if (!emailValue || !emailValue.trim().length) {
      handleEmailChange(""); //manually initiate error
      return;
    } else if (!passwordValue || !passwordValue.trim().length) {
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

    dispatch(
      signInAction({
        accessToken:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTMwOTAwNSwiZXhwIjoxNjMxMzEyNjA1LCJuYmYiOjE2MzEzMDkwMDUsImp0aSI6IjRINUozclNSYWhZQjB1V0YiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.vIdA8M_BbgI71OVjENByCpR4kqweKJ9-IJxyKQo56nA",
        createdAt: "2022-03-02T18:15:45.000000Z",
        email: "stanleyugwu17@gmail.com",
        emailVerifiedAt: null,
        id: "da4b6451d15e",
        phone: "09033155169",
        image: "https://avatars.githubusercontent.com/u/48139995?v=4",
        isAdmin: false,
        isVerified: false,
        noOfReferrals: 0,
        referredBy: "",
        updatedAt: "2022-03-02T18:56:33.000000Z",
        username: "Devvie",
      })
    );
    return;

    myAxios
      .post<any, AxiosResponse<Server.LoginResponse>, FormFieldsTypes.Login>(
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
            image: "",
            isAdmin: false,
            isVerified: false,
            noOfReferrals: 0,
            referredBy: "",
            updatedAt: updated_at,
            username,
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
    <SafeArea
      style={{
        height: Layout.window.height,
        padding: 0,
        backgroundColor: tw.color("background"),
      }}
    >
      {signingIn ? <LoaderModal loadingText="Signing In" /> : null}
      <StatusBar
        backgroundColor={tw.color("background")}
        animated
        translucent
        style="dark"
      />
      <View style={tw`bg-background -mb-4`}>
        <AnimatedLottieView
          source={welcomeAnimation}
          style={{ width: "100%", height: 150, alignSelf: "center" }}
          resizeMode="contain"
          autoPlay={true}
          loop={true}
          duration={2000}
          speed={2}
        />
      </View>
      <ScrollView
        style={[
          tw`mx-auto w-full h-full px-4 bg-primary-dark`,
          { borderTopLeftRadius: 60, borderTopRightRadius: 60 },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <FadeInView
          slideUp
          delay={400}
          style={tw`w-full mb-0 bg-transparent mt-6`}
        >
          <Text
            type="heading"
            style={tw`font-sans-bold text-on-dark text-2xl ml-3 text-center`}
          >
            {"Glad To\nHave You Back!"}
          </Text>
          <FadeInView delay={1000} slideUp>
            <Divider
              style={tw`h-1 bg-on-dark mx-auto rounded-full w-10 mt-2 mb-8`}
            />
          </FadeInView>
        </FadeInView>

        <View style={tw`bg-transparent`}>
          <InputField
            fieldLabel="Email Address"
            fieldType="input"
            style={{ backgroundColor: "#eee" }}
            textInputStyle={{ backgroundColor: "#eee" }}
            fieldLabelIcon="ios-mail-sharp"
            value={emailValue}
            onChangeText={handleEmailChange}
            placeholder="Enter Email Address"
          />
          {emailError ? (
            <Text style={tw`text-red-400 pl-2 text-sm text-left font-sans`}>
              &gt; {emailError}
            </Text>
          ) : null}
        </View>

        <View style={tw`mt-4 bg-transparent`}>
          <InputField
            fieldLabel="Password"
            fieldType="input"
            placeholder="Enter Password"
            style={{ backgroundColor: "#eee" }}
            textInputStyle={{ backgroundColor: "#eee" }}
            fieldLabelIcon="md-key-sharp"
            value={passwordValue}
            extraInputProps={{ secureTextEntry: !passwordVisible }}
            onChangeText={handlePasswordChange}
            rightInputNode={eyeIcon}
          />
          {passwordError ? (
            <Text style={tw`text-red-400 pl-1 text-sm text-left font-sans`}>
              &gt; {passwordError}
            </Text>
          ) : null}
        </View>

        <Text
          style={tw`underline text-secondary my-4 font-sans-semibold text-center`}
          onPress={goToForgotPassword}
        >
          FORGOT PASSWORD?
        </Text>

        <CurvedButton
          label="Sign In"
          bgColor={tw.color("secondary")}
          labelColor={tw.color("primary")}
          leftIconName="enter-outline"
          onPress={_handleSignIn}
        />
      </ScrollView>
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

export default SignInScreen;
