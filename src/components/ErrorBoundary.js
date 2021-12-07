import React, { useState } from "react";
import Text from "./Type";
import tw from "../lib/tailwind";
import SafeArea from "./CustomSafeAreaView";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons as Icon } from "@expo/vector-icons";

const defaultError =
  "We regret to say this, something went wrong with this part of the app and that's our bad.\n\nIf you are seeing this, please press the button below to send a report to us and we'll get it fixed.";

const Error = React.memo(({ errorMessage = defaultError, reportCb }) => {
  const [reportSent, setReportSent] = useState(false);
  const [showThankYou, setThankYou] = useState(false);

  const onReport = React.useCallback(() => {
    reportCb();
    setReportSent(true);
    setThankYou(true);
  });

  return (
    <SafeArea containerStyle={tw`items-center justify-center flex-row mx-auto`}>
      <Icon
        name="sad-outline"
        color={tw.color("black")}
        style={tw`self-center mb-3`}
        size={80}
      />
      <Text style={tw`text-black my-3`}>{errorMessage}</Text>
      {!reportSent ? (
        <TouchableOpacity onPress={onReport} activeOpacity={0.6}>
          <Text style={tw`p-3 w-full rounded-3xl mt-3 bg-primary text-accent`}>
            Send a report
          </Text>
        </TouchableOpacity>
      ) : null}
      {showThankYou ? <Text style={tw`font-sans-semibold text-lg text-primary mt-5`}>Report Sent. Thank You!.</Text> : null}
    </SafeArea>
  );
});

class ErrorBoundary extends React.PureComponent {
  constructor(props) {
    super(props);
    this._sendReport = this._sendReport.bind(this);
    this.state = {
      hasError: false,
      error: "",
      errorInfo: "",
    };
  }

  _sendReport(){
    //TODO: send real report to server about bug
    console.log({...this.state.errorInfo,error:this.state.error});
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
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
