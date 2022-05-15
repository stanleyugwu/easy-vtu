import React from "react";
import tw from "../lib/tailwind";
import { Divider, Snackbar } from "react-native-paper";
import {
  LayoutAnimation,
  BackHandler,
  Platform,
  UIManager,
} from "react-native";
import Text, { View } from "../components/Themed";
import { AxiosResponse } from "axios";
import InputField from "../components/InputField";
import { useFormik } from "formik";
import LoaderModal from "../components/LoaderModal";
import withTile from "../hooks/withTile";
import type { FormFieldsTypes, RootStackScreenProps, Server } from "../types";
import SafeAreaView from "../components/CustomSafeAreaView";
import FadeInView from "../components/FadeInView";
import * as Yup from "yup";
import myAxios from "../adapters/instance";
import StatusModal from "../components/StatusModal";
import Layout from "../constants/Layout";
import { StatusBar } from "expo-status-bar";
import Button from "../components/Button";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "That username is too short!")
    .max(50, "That username is too long!")
    .required("Username is required"),

  emailAddress: Yup.string()
    .email("That e-mail address is invalid!")
    .when("username", (username, schema) => {
      if (username && SignupSchema.fields.username.isValidSync(username))
        return schema.required("You didn't enter any e-mail address");
    }),
  mobileNumber: Yup.string()
    .matches(/^0(7|8|9)(0|1)[0-9]{8}$/, "That mobile number is invalid")
    .required("You didn't enter any mobile number"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password too long!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      "Password must contain One uppercase, One lowercase, One number and One special character"
    )
    .required("You didn't enter any password"),

  confirmPassword: Yup.string()
    .when("password", (password, schema) => {
      if (password && SignupSchema.fields.password.isValidSync(password))
        return schema.required("Confirmation Password is required");
    })
    .oneOf([Yup.ref("password")], "Passwords must match!"),

  referrer: Yup.string()
    .min(2, "Referrer id is too short!")
    .max(150, "Referrer id is too long!"),
});

export type FormikSignupValuesTypes = Record<
  | "username"
  | "password"
  | "emailAddress"
  | "mobileNumber"
  | "confirmPassword"
  | "referrer",
  string
>;

const SignUpScreen = ({ navigation }: RootStackScreenProps<"Sign-Up">) => {
  const [formStep, setFormStep] = React.useState(1);
  const [requestError, setRequestError] = React.useState("");
  const [statusModalVisible, setStatusModalVisible] = React.useState(false);
  let controller = new AbortController(); //controller for terminating requests

  var isMounted = true; //variable to track unmounts to avoid memory leaks

  //create listener to set isMounted to false, and cancel any ongoing request when user leaves screen
  navigation.addListener("beforeRemove", () => {
    isMounted = false;
    controller.abort(); //cancel any axios request using `controller` token
  });

  // custom variable to track is form is submitting
  // formik.isSubmitting fails when you schedule a setTimeout with its value
  var formSubmitting = false;

  // This will be called by `handleSubmit` after all validation was successful.
  // It'll make the request to server
  const submitForm = (values: FormikSignupValuesTypes) => {
    controller = new AbortController();
    formSubmitting = true;

    // we'll abort request after 13 seconds
    setTimeout(() => {
      if (formik.isSubmitting && formSubmitting) {
        controller.abort();
        formik.setSubmitting(false);
        setRequestError("Your request took too long, please try again!");
      }
    }, 15000);

    // make the actual request
    myAxios
      .post<any, AxiosResponse<Server.SignUpResponse>, FormFieldsTypes.SignUp>(
        "/api/register",
        {
          email: values.emailAddress,
          password: values.password,
          password_confirmation: values.confirmPassword,
          username: values.username,
          phone: values.mobileNumber,
          referrer: values.referrer,
        },
        {
          signal: controller.signal,
        }
      )
      .then((response) => {
        // user registered
        formik.setSubmitting(false);
        formSubmitting = false;
        setTimeout(() => {
          // we'll automatically move to sign in screen after 8 seconds of successful sign up
          if (isMounted) handleConfirmRegisteration();
        }, 8000);
        setStatusModalVisible(true);
      })
      .catch((error: Server.RequestError) => {
        /**
         * Incase of error from the server, we'll check the error string and
         * try to see if the error is about `email` or `username` or `mobile number` so we can move user to
         * step 1 where the email and username fields are
         */
        if (
          error.message?.includes("email") ||
          error.message?.includes("username") ||
          error.message?.includes("number")
        ) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
          setFormStep(1);
        }
        setRequestError(error.message);
        formSubmitting = false;
        formik.setSubmitting(false);
      });
  };

  const formik = useFormik<FormikSignupValuesTypes>({
    initialValues: {
      username: "",
      emailAddress: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
      referrer: "",
    },
    onSubmit: submitForm,
    validationSchema: SignupSchema,
  });

  React.useEffect(() => {
    //add back press handler to do different things depending on the form step user is on
    const NativeEventSubScription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (formik.isSubmitting) {
          // form is being submitted and the user presss back button. We'll cancel the request then
          controller.abort();
          formik.setSubmitting(false);
          return;
        } else if (formStep === 2) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
          setFormStep(1);
          return true; //handled, dont bubble
        }
        return false; //let system decide
      }
    );
    return NativeEventSubScription.remove; //unsub from backHandler
  }, [formStep, formik.isSubmitting]);

  /**
   * This function will be called when the user clicks on "PROCEED" on step 1 or "SIGN UP" o step 2.
   * It will validate the inputs, navigate to step 1 if there's error there, and when everything is valid,
   * it'll call `formik.handleSubmit()` which will in-turn call our `submitForm` function to make the server
   * request. Any other error after request will be shown via a **SnackBar** component
   */
  const handleSubmit = async () => {
    try {
      let errors = await formik.validateForm(formik.values); //validate form inputs
      const noError = !Object.keys(errors).length;

      // if in step 1
      if (formStep == 1) {
        /*=> at this point, number is valid. <= */
        if (noError) {
          // check if there's no error and go to next step
          // we're not submitting on step 1 even if details are valid
          // because user might want to re-check step 2 before submitting
          LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
          return setFormStep(2);
        }

        // there's error, check if it's not in step 1 and move to step 2
        if (!errors.username && !errors.emailAddress && !errors.mobileNumber) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
          return setFormStep(2);
        }

        return; // terminate validation at this point
      }

      // step 2 validation
      // if user made it to step 2, then theres no errors in step 1
      // and errors in step 2 would be shown. We just check if theres no error at all and submit
      if (noError) formik.handleSubmit();
    } catch (error) {
      // formik vaidation error
      console.log(error);
    }
  };

  const handleConfirmRegisteration = () => {
    setStatusModalVisible(false);
    formik.setValues(formik.initialValues); //reset form
    navigation.replace("Sign-In");
  };

  //view for first step of sign up
  const formStep1View = (
    <View
      style={tw.style(`bg-transparent`, formStep == 2 && "hidden")}
      key="form-step-1"
    >
      {/* username field */}
      <View style={tw`bg-transparent`}>
        <InputField
          fieldType="input"
          fieldLabel="Username"
          style={{
            backgroundColor: "#eee",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
          textInputStyle={{ backgroundColor: "#eee" }}
          value={formik.values.username}
          placeholder="Enter Username"
          onChangeText={formik.handleChange("username")}
          fieldLabelIcon="person-sharp"
          extraInputProps={{ autoFocus: true, textContentType:"username" }}
        />
        {formik.errors.username ? (
          <Text style={tw`text-red-400 pl-1 text-sm text-left font-sans`}>
            {formik.errors.username}
          </Text>
        ) : null}
      </View>

      {/* email field */}
      <View style={tw`bg-transparent mt-3 mb-3`}>
        <InputField
          fieldType="input"
          fieldLabel="Email Address"
          value={formik.values.emailAddress}
          style={{ backgroundColor: "#eee" }}
          textInputStyle={{ backgroundColor: "#eee" }}
          placeholder="Enter Email Address"
          onChangeText={formik.handleChange("emailAddress")}
          fieldLabelIcon="ios-mail-sharp"
          extraInputProps={{textContentType:"emailAddress",keyboardType:"email-address"}}
        />
        {formik.errors.emailAddress ? (
          <Text style={tw`text-red-400 pl-1 text-sm text-left font-sans`}>
            &gt; {formik.errors.emailAddress}
          </Text>
        ) : null}
      </View>

      {/* phone field */}
      <InputField
        fieldType="input"
        fieldLabel="Mobile Number"
        style={{ backgroundColor: "#eee" }}
        textInputStyle={{ backgroundColor: "#eee" }}
        fieldLabelIcon="ios-phone-portrait"
        value={formik.values.mobileNumber}
        onChangeText={formik.handleChange("mobileNumber")}
        placeholder="Enter Mobile Number"
        extraInputProps={{ textContentType: "telephoneNumber", keyboardType:"number-pad" }}
      />
      {formik.errors.mobileNumber ? (
        <Text style={tw`text-red-400 pl-1 text-sm text-left font-sans`}>
          {formik.errors.mobileNumber}
        </Text>
      ) : null}
    </View>
  );

  //view for second step of sign up
  const formStep2View = (
    <View
      style={tw.style(`bg-transparent`, formStep == 1 && "hidden")}
      key="form-step-2"
    >
      {/* password field */}
      <View style={tw`bg-transparent`}>
        <InputField
          fieldType="input"
          fieldLabel="Password"
          style={{ backgroundColor: "#eee" }}
          textInputStyle={{ backgroundColor: "#eee" }}
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          fieldLabelIcon="md-key-sharp"
          placeholder="Enter password"
        />
        {formik.errors.password ? (
          <Text style={tw`text-red-400 pl-1 text-sm text-left font-sans`}>
            &gt; {formik.errors.password}
          </Text>
        ) : null}
      </View>

      {/* confirm password field */}
      <View style={tw`my-3 bg-transparent`}>
        <InputField
          fieldType="input"
          fieldLabel="Confirm Password"
          style={{ backgroundColor: "#eee" }}
          textInputStyle={{ backgroundColor: "#eee" }}
          value={formik.values.confirmPassword}
          onChangeText={formik.handleChange("confirmPassword")}
          fieldLabelIcon="md-key-sharp"
          placeholder="Re-Enter password"
          extraInputProps={{ error: !!formik.errors.confirmPassword }}
        />
        {formik.errors.confirmPassword && formik.values.password ? (
          <Text style={tw`text-red-400 pl-1 text-sm text-left font-sans`}>
            &gt; {formik.errors.confirmPassword}
          </Text>
        ) : null}
      </View>

      {/* referrer field */}
      <View style={tw`bg-transparent`}>
        <InputField
          fieldType="input"
          style={{ backgroundColor: "#eee" }}
          textInputStyle={{ backgroundColor: "#eee" }}
          fieldLabel="Who Reffered You? (optional)"
          value={formik.values.referrer}
          onChangeText={formik.handleChange("referrer")}
          fieldLabelIcon="md-key-sharp"
          placeholder="Referrer ID"
          fieldRequired={false}
        />
        {formik.errors.referrer ? (
          <Text style={tw`text-red-400 pl-1 text-sm text-left font-sans`}>
            {formik.errors.referrer}
          </Text>
        ) : null}
      </View>
    </View>
  );

  const loaderModal = React.useMemo(
    () => <LoaderModal loadingText="Signing Up" />,
    [formik.isSubmitting]
  );

  const statusModal = React.useMemo(
    () => (
      <StatusModal
        status="success"
        statusTextTitle="Registeration Successful"
        statusText={`An email has been sent to ${formik.values.emailAddress}. Follow the instructions in the email to verify your account.`}
        onClose={handleConfirmRegisteration}
      />
    ),
    [formik.values.emailAddress]
  );

  return (
    <SafeAreaView
      scrollable
      scrollViewProps={{
        contentContainerStyle: {
          padding: 0,
          backgroundColor: tw.color("background"),
          height: Layout.window.height,
          justifyContent: "space-between",
        },
      }}
    >
      <StatusBar
        backgroundColor={tw.color("background")}
        animated
        translucent
        style="dark"
      />
      <FadeInView
        slideUp
        delay={400}
        style={tw`w-full mb-0 bg-transparent mt-10`}
      >
        <Text
          type="heading"
          style={tw`font-sans-bold text-2xl ml-3 text-center text-on-background`}
        >
          {formStep === 1
            ? "Sign Up Now, \nIt's Free 🤟"
            : "Just One \nFinal Step 💪"}
        </Text>
        <FadeInView delay={1000} slideUp>
          <Divider
            style={tw`h-1 bg-on-background mx-auto rounded-full w-10 mt-2 mb-4`}
          />
        </FadeInView>
      </FadeInView>

      <View
        style={tw.style("mx-auto w-full px-4 pt-7 pb-4 bg-primary-dark", {
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60,
        })}
      >
        {/* Views corresponding to form steps */}
        {[formStep1View, formStep2View]}

        <Text style={tw`my-4 mx-auto text-on-dark`}>
          Already a member?{" "}
          <Text
            style={tw`text-secondary underline font-sans-bold`}
            onPress={(_) => navigation.navigate("Sign-In")}
          >
            SIGN IN
          </Text>
        </Text>
        <Button
          label={formStep === 1 ? "PROCEED" : "SIGN UP"}
          bgColor={tw.color("secondary")}
          labelColor={tw.color("primary")}
          rightIconName="chevron-forward"
          onPress={handleSubmit}
          disabled={formik.isValidating || formik.isSubmitting}
        />
      </View>
      {formik.isSubmitting ? loaderModal : null}
      {statusModalVisible ? statusModal : null}
      {/* Below snack will be used to show server request errors */}
      <Snackbar
        visible={!!requestError}
        style={tw`bg-error`}
        children={requestError}
        action={{ label: "OKAY", color: tw.color("on-dark") }}
        onDismiss={() => setRequestError("")}
      />
    </SafeAreaView>
  );
};

export default withTile(SignUpScreen, 3);
