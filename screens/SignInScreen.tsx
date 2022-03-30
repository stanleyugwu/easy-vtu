import React, { useState } from "react";
import tw from "../lib/tailwind";
import CurvedButton from "../components/Button";
import { Image } from "react-native";
import { Divider } from "react-native-paper";
import InputField from "../components/InputField";
import SafeArea from "../components/CustomSafeAreaView";
import Text, { View } from "../components/Themed";
import { Ionicons as Icon } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import useFormField from "../hooks/useFormField.hook";
import { signIn as setSignIn } from "../store/slices/userSlice";
import LoaderModal from "../components/LoaderModal";
import axios from "axios";
import { signIn } from "../adapters/auth.adapter";
import { RootStackScreenProps } from "../types";
import withTile from "../hooks/withTile";

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

/**
 * App sign in screen
 */
const SignInScreen = ({ navigation }: RootStackScreenProps<"Sign-In">) => {
  const dispatch = useDispatch();
  var isMounted = true; //app mount tracker

  //axios cancelToken source
  const source = axios.CancelToken.source();

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
    source.cancel("Sign-In Cancelled!");
  });

  const goToSignUp = React.useCallback(() => {
    navigation.navigate("Sign-Up");
  }, []);

  const goToForgotPassword = React.useCallback(() => {
    navigation.navigate("Forgot-Password");
  }, []);

  //Sign in
  const _handleSignIn = () => {
    const profile = {
      id: 123,
      username: "devvie",
      email: "stanley@gmail.com",
      image: "https://via.placeholder.com/600/92c952",
      isAdmin: false,
      referrals: 0,
      phone: "+2348066413705",
      password: "1234567",
      createdAt: "Thu, 07 Oct 2021 17:28:14 GMT",
    };

    //set user's profile and initiate sign in
    dispatch(setSignIn(profile));
    return;
    // dispatch(setSignIn(profile))
    // return

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

    // signIn(source.token,loginCreds.email,loginCreds.password)
    // .then(response => {
    //     console.log(response)
    //     /**
    //      * sets user access_token.
    //      * setting token is not handled by signIn reducer because there might
    //      * be a need to set token without signing in i.e setting profile, e.g when user is using
    //      * a service as a guest
    //      */
    //     dispatch(setToken(response.data.access_token));
    //     let data = response.data.data;
    //     //set user's wallet balance
    //     dispatch(addMoney(parseInt(data.wallet_balance,10)));
    //     //construct profile object based on store keys
    //     const profile = {
    //         id:data.id,
    //         username : data.username,
    //         email: data.email,
    //         image:data.image,
    //         isAdmin:data.isAdmin,
    //         referrals:data.no_of_referrals,
    //         phone: data.phone,
    //         password: loginCreds.password,
    //         createdAt:data.created_at
    //     }
    //     //set user's profile and initiate sign in
    //     dispatch(setSignIn(profile))
    // })
    // .catch(error => {
    //     console.log(error)
    //     isMounted && setError(error.message);
    //     isMounted && setSigningIn(false);
    // })
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
    <SafeArea style={tw`p-0 h-full`}>
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
          style={tw`bg-primary`}
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
    </SafeArea>
  );
};

export default withTile(SignInScreen, 2);
