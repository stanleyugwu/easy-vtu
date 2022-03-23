import * as React from "react";
import {
  ImageBackground,
  ImageBackgroundProps,
  ImageSourcePropType,
  ViewStyle,
} from "react-native";

const tile1: ImageSourcePropType = require("../assets/images/tile_background.png");
const tile2: ImageSourcePropType = require("../assets/images/tile_signup.png");
const tile3: ImageSourcePropType = require("../assets/images/tile_splash.png");

/**
 * A HOC that wraps passed component in a selected background image
 * @param {1 | 2 | 3} [imageType] Type of image tile to use out of two tile images
 * @param {React.FunctionComponent | React.ComponentClass} Component Component to wrap
 * @param {ViewStyle} backgroundStyle
 */
const withTile = <ComponentProps extends object>(
  Component:
    | React.FunctionComponent<ComponentProps>
    | React.ComponentClass<ComponentProps>,
  imageType: 1 | 2 | 3 = 1,
  backgroundStyle?: ImageBackgroundProps["style"]
): React.NamedExoticComponent<ComponentProps> =>
  React.memo((props) => (
    <ImageBackground
      accessibilityLabel="tile background image"
      source={imageType == 1 ? tile1 : imageType === 2 ? tile2 : tile3}
      imageStyle={{ resizeMode: "cover" }}
      style={[{ width: "100%", height: "100%" }, backgroundStyle]}
    >
      <Component {...props} />
    </ImageBackground>
  ));

export default withTile;
