import React from "react";
import tw from "../lib/tailwind";
import CurvedButton from "../components/Button";
import BackButton from "../components/BackButton";
import { ImageBackground, View, StatusBar } from "react-native";
import { Divider} from "react-native-paper";
import { BackHandler } from "react-native";
import PhoneInput from "react-native-phone-input";
import Text, { Title } from "../components/Type";
import axios from "axios";
import tileBg from "../../assets/tile_signup.png";
import CountryPickerModal from "../components/CountryPickerModal";
import InputField from "../components/InputField";
import SafeArea from "../components/CustomSafeAreaView";
import { useFormik } from "formik";
import LoaderModal from "../components/LoaderModal";

const formFieldsValidator = (values) => {
  const errors = {};

  //username validation
  const usernameRegex = /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/;
  if (!values.username) errors.username = `Please supply a username `;
  else if (!usernameRegex.test(values.username)) {
    errors.username =
      "username is invalid. It must be at-least 6 characters, with optional underscore and/or numbers.";
  }

  //email validation
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!values.emailAddress)
    errors.emailAddress = `Please supply an email address`;
  else if (!emailRegex.test(values.emailAddress)) {
    errors.emailAddress = "That e-mail address is invalid";
  }

  //password validation
  const passwordRegex =
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
  if (!values.password) errors.password = "Please enter a strong password";
  else if (!passwordRegex.test(values.password)) {
    errors.password = `Password must be six characters or more, and has at least one lowercase and one uppercase alphabetical character or one lowercase and one numeric character or one uppercase and one numeric character.`;
  }

  //password confirmation validation for mismatch
  if (
    (!values.confirmPassword && values.password) ||
    (values.confirmPassword && values.confirmPassword !== values.password)
  ) {
    errors.confirmPassword = "passwords doesn't match";
  }

  //referrer ID validation
  if(values.referrer && values.referrer.trim().length > 10) errors.referrer = "Invalid Referrer ID";

  return errors;
};

const SignUpScreen = (props) => {
  const [formStep, setFormStep] = React.useState(1);
  const [countryModalVisible, setCountryModalVisible] = React.useState(false);
  const [mobileNumberError, setMobileNumberError] = React.useState("");

  var isMounted = true; //variable to track unmounts to avoid memory leaks
  var source = React.useRef(axios.CancelToken.source()).current; //axios cancelToken source

  //create listener to set isMounted to false, and cancel any ongoing request when user leaves screen
  props.navigation.addListener("beforeRemove", () => {
    isMounted = false;
    source.cancel("Sign-Up Cancelled!"); //cancel any axios request using `source` token
  });

  //mobile number input component ref
  const phoneInputRef = React.useRef();
  const phoneNumberCache = React.useRef();

  React.useEffect(() => {
    //add back press handler
    const NativeEventSubScription = BackHandler.addEventListener('hardwareBackPress', () => {
      if(formStep === 2){
        setFormStep(1);
        return true//handled, dont bubble
      }
      return false;//let system decide
    })

    // when formStep changes, `PhoneInput` remounts or unmounts.
    // check for cached number and re-assign it.
    // this logic has to live in React.useEffect, exexuting it inside ref assignment function of
    // `PhoneInput` would cause issues when selecting country
    if (formStep == 1 && phoneNumberCache.current) {
      phoneInputRef.current?.setValue?.(phoneNumberCache.current);
    }
    return NativeEventSubScription.remove;//unsub from backHandler
  }, [formStep]);

  // const trash = signUp(
  //   source.token,
  //   inputs.name,
  //   inputs.emailAddress,
  //   inputs.password,
  //   phoneNumber,
  //   inputs.referrer ? inputs.referrer : null
  // )
  //   .then((response) => {
  //     //hope that data.message would be a string on success
  //     let data = response.data;
  //     console.log(data.message);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     isMounted && setSigningUp(false);

  //     //check for keywords in error string to determine if error is in form step 1
  //     const errorInStep1 =
  //       error.message.includes("username") ||
  //       error.message.includes("password");

  //     //show error to user and slide to form step 1 if the error is there
  //     isMounted && setError(`A-${error.message}`);
  //     errorInStep1 && isMounted && setFormStep(1);
  //   });

  // Country modal event handlers and callback
  const onCountrySelectCb = React.useCallback((country) => {
    phoneInputRef.current.selectCountry(country.iso2);
    setCountryModalVisible(false);
  });
  const closeCountryModal = React.useCallback(() => {
    setCountryModalVisible(false);
  });
  //memoize function to be called on flag press, so to avoid rerender of `PhoneInput`
  // incase its performance optimisation is relying on referential equality
  const openCountryModal = React.useCallback(() => {
    setCountryModalVisible(true);
  });

  const formik = useFormik({
    initialValues: {
      username: "devvie",
      emailAddress: "stanley@gmail.com",
      password: "123456",
      confirmPassword: "123456",
      referrer: "",
    },
    onSubmit(values) {
      formik.setSubmitting(true);
      // SERVER TIME!!
      console.log("values", values);
    },
    validate: formFieldsValidator,
  });

  const handleSubmit = React.useCallback(async () => {
    // formstep1view would unmount when user goes to formStep 2, and that causes issues
    // when validating phone input as `PhoneInput` ref would be re-assigned when user comes back
    // to formStep 1 causing it to loose its previous value and fail its validation.
    // SOLUTION: we cache number input before going to formStep 2, so we can re-assign it to
    // `PhoneInput` when user is back to formStep 1

    try {
      let errors = await formik.validateForm(formik.values); //validate form inputs
      const noError = !Object.keys(errors).length;

      // if in step 1
      if (formStep == 1) {
        let numberValid = phoneInputRef.current?.isValidNumber?.(); //validate number

        if (!numberValid)
          return setMobileNumberError("mobile number is invalid"); //dont continue when number is invalid

        /*=> at this point, number is valid. <= */
        if (noError) return formik.handleSubmit(); // check if theres no error and submit form

        // there's error, check if its not in step 1 and move to step 2
        if (!errors.username && !errors.emailAddress) {
          let currentNumber = phoneInputRef.current?.getValue?.(); //get entered number
          phoneNumberCache.current = currentNumber; //cache number
          return setFormStep(2);
        }
        return; //needed to terminate validation at this point
      }

      // step 2 validation
      // if user made it to step 2, then theres no errors in step 1
      // and errors in step 2 would be shown. We just check if theres no error at all and submit
      if (noError) formik.handleSubmit();
    } catch (error) {
      // formik vaidation error
      console.log(error);
    }
  });

  //view for first step of sign up
  const formStep1View = (
    <View>
      {/* username field */}
      <View>
        <InputField
          fieldLabel="Username"
          value={formik.values.username}
          placeholder="Enter Username"
          onChangeText={formik.handleChange("username")}
          fieldLabelIcon="person-sharp"
          extraInputProps={{ autoFocus: true }}
        />
        {formik.errors.username ? (
          <Text style={tw`text-red-700 pl-1 text-sm text-left font-sans`}>
            {formik.errors.username}
          </Text>
        ) : null}
      </View>

      {/* email field */}
      <View>
        <InputField
          fieldLabel="Email Address"
          value={formik.values.emailAddress}
          placeholder="Enter Email Address"
          onChangeText={formik.handleChange("emailAddress")}
          fieldLabelIcon="ios-mail-sharp"
        />
        {formik.errors.emailAddress ? (
          <Text style={tw`text-red-700 pl-1 text-sm text-left font-sans`}>
            &gt; {formik.errors.emailAddress}
          </Text>
        ) : null}
      </View>

      {/* phone field */}
      <InputField 
        fieldLabel="Mobile Number" 
        fieldLabelIcon="ios-phone-portrait"
      >
        <PhoneInput
          initialCountry="ng"
          ref={phoneInputRef}
          allowZeroAfterCountryCode={true}
          autoFormat={true}
          offset={10}
          textStyle={tw.style("text-base")}
          onPressFlag={openCountryModal}
          onChangePhoneNumber={() => setMobileNumberError("")}
          textProps={{
            multiline:false,
            placeholder: "Enter Mobile Number",
            style: tw`text-base text-black font-sans-semibold`,
          }}
          style={tw`px-4 h-12 mt-3 border-b border-primary bg-white`}
        />
      </InputField>
      {mobileNumberError ? (
        <Text style={tw`text-red-700 pl-1 text-sm text-left font-sans`}>
          &gt; {mobileNumberError}
        </Text>
      ) : null}
    </View>
  );

  //view for second step of sign up
  const formStep2View = (
    <View>
      {/* password field */}
      <View>
        <InputField
          fieldLabel="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          fieldLabelIcon="md-key-sharp"
          placeholder="Enter password"
        />
        {formik.errors.password ? (
          <Text style={tw`text-red-700 pl-1 text-sm text-left font-sans`}>
            &gt; {formik.errors.password}
          </Text>
        ) : null}
      </View>

      {/* confirm password field */}
      <View style={tw`my-3`}>
        <InputField
          fieldLabel="Confirm Password"
          value={formik.values.confirmPassword}
          onChangeText={formik.handleChange("confirmPassword")}
          fieldLabelIcon="md-key-sharp"
          placeholder="Re-Enter password"
          extraFieldProps={{ error: formik.errors.confirmPassword }}
        />
        {formik.errors.confirmPassword && formik.values.password ? (
          <Text style={tw`text-red-700 pl-1 text-sm text-left font-sans`}>
            &gt; {formik.errors.confirmPassword}
          </Text>
        ) : null}
      </View>

      {/* referrer field */}
      <View>
        <InputField
          fieldLabel="Who Reffered You? (optional)"
          value={formik.values.referrer}
          onChangeText={formik.handleChange("referrer")}
          fieldLabelIcon="md-key-sharp"
          placeholder="Referrer ID"
          fieldRequired={false}
        />
        {formik.errors.referrer ? (
          <Text style={tw`text-red-700 pl-1 text-sm text-left font-sans`}>
            {formik.errors.referrer}
          </Text>
        ) : null}
      </View>
    </View>
  );

  //memoize countryModal component for performance
  const countryModal = React.useMemo(() => {
    return (
      <CountryPickerModal
        onRequestClose={closeCountryModal}
        onCountrySelect={onCountrySelectCb}
        onBackgroundTouch={closeCountryModal}
      />
    );
  });

  const loaderModal = React.useMemo(() => (
    <LoaderModal loadingText="Signing Up"/>
  ),[formik.isSubmitting]);

  return (
    <SafeArea containerStyle={tw`p-0`}>
      <StatusBar backgroundColor={tw.color("primary")} />
      <ImageBackground
        source={tileBg}
        imageStyle={{ resizeMode: "cover" }}
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignContent: "center",
          flex: 1,
        }}
      >
        <View
          style={tw.style(
            "mx-auto w-full h-full px-4",
            formStep == 1 ? "mt-14" : "mt-8"
          )}
        >
          {formStep == 2 ? (
            <BackButton buttonText="STEP 1" textStyle={tw`font-sans-semibold`} onPress={() => setFormStep(1)} />
          ) : null}
          <View style={tw`w-full mb-5`}>
            <Title>{formStep == 1 ? "Sign Up. It's Free" : "Final step"}</Title>
            <Divider
              style={tw`h-1 bg-primary rounded-full w-20 mx-auto mt-2 mb-4`}
            />
          </View>
          {formStep == 1 ? formStep1View : formStep2View}

          <Text style={tw`my-4 mx-auto`}>
            Already a member?{" "}
            <Text
              style={tw`text-primary underline font-sans-bold`}
              onPress={(_) => props.navigation.navigate("Sign-In")}
            >
              SIGN IN
            </Text>
          </Text>

          <CurvedButton
            label={formStep == 1 ? "Continue" : "Complete Signup"}
            onPress={handleSubmit}
            disabled={formik.isValidating || formik.isSubmitting}
          />
        </View>
      </ImageBackground>
      {countryModalVisible ? countryModal : null}
      {formik.isSubmitting ? loaderModal : null}
    </SafeArea>
  );
};

export default SignUpScreen;
