import React, { useState } from "react";
import Text from "./Themed";
import tw from "../lib/tailwind";
import SafeArea from "./CustomSafeAreaView";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons as Icon } from "@expo/vector-icons";

export type ErrorProps = {
  errorMessage: string;
  reportCb: () => void;
};

const defaultError =
  "We regret to say this, something went wrong with this part of the app and that's our bad.\n\nIf you are seeing this, please press the button below to send a report to us and we'll get it fixed.";

/** App Error Component */
const Error = React.memo(
  ({ errorMessage = defaultError, reportCb }: ErrorProps) => {
    const [reportSent, setReportSent] = useState(false);
    const [showThankYou, setThankYou] = useState(false);

    const onReport = React.useCallback(() => {
      typeof reportCb == "function" && reportCb(); // call the reporter, it has the eror to report
      setReportSent(true);
      setThankYou(true);
    }, []);

    return (
      <SafeArea style={tw`items-center justify-center flex-row mx-auto`}>
        <Icon
          name="sad-outline"
          color={tw.color("on-background")}
          style={tw`self-center mb-3`}
          size={80}
        />
        <Text style={tw`my-3`}>{errorMessage}</Text>
        {!reportSent ? (
          <TouchableOpacity onPress={onReport} activeOpacity={0.6}>
            <Text
              style={tw`p-3 w-full rounded-3xl mt-3 bg-primary text-secondary`}
            >
              Send a report
            </Text>
          </TouchableOpacity>
        ) : null}
        {showThankYou ? (
          <Text style={tw`font-sans-semibold text-lg text-primary mt-5`}>
            Report Sent. Thank You!.
          </Text>
        ) : null}
      </SafeArea>
    );
  }
);

export type ErrorBoundaryProps = {
  errorMessage: string;
  children: React.ReactNode;
};
export type ServerBugReport = {
  error: string;
  errorInfo: string;
};
export type ErrorBoundaryState = ServerBugReport & {
  hasError: boolean;
};

class ErrorBoundary extends React.PureComponent<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this._sendReport = this._sendReport.bind(this);
    this.state = {
      hasError: false,
      error: "",
      errorInfo: "",
    };
  }

  // A reference of this function will be passed to `Error` component to be called
  // When the user clicks on "Send Report"
  _sendReport() {
    //TODO: send real report to server about bug
    let bug: ServerBugReport = {
      errorInfo: this.state.errorInfo,
      error: this.state.error,
    };
    console.log(bug);
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: any) {
    this.setState({ error: error.message, errorInfo });
  }
  render() {
    return this.state.hasError ? (
      <Error
        errorMessage={this.props.errorMessage}
        reportCb={this._sendReport}
      />
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
