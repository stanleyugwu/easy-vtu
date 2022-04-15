import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const swidth = Dimensions.get("screen").width;
const sheight = Dimensions.get("screen").height;

export default {
  window: {
    width,
    height,
  },
  screen: {
    width:swidth,
    height:sheight,
  },
  isSmallDevice: width < 375,
};

