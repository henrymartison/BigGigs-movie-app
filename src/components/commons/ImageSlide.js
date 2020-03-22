import React from "react";
import { Image, Dimensions } from "react-native";
import { width } from "../../utils/device";
import { secondaryTint } from "../../styles/Colors";

class ImageSlide extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      height: 0,
      width: 0
    };
  }

  componentDidMount() {
    const { source, width: imageWidth } = this.props;

    if (source) {
      const { height, width } = Image.resolveAssetSource(source);
      //   const responsiveHeight = Math.round((imageWidth * height) / width);
      const responsiveHeight = Dimensions.get("window").height / 3 - 54;

      this.setState({
        height: responsiveHeight,
        width: imageWidth
      });
    }
  }

  render() {
    const { source } = this.props;
    const { height, width } = this.state;

    return (
      <Image
        source={source}
        style={{
          height,
          width,
          borderRadius: 8,
          backgroundColor: secondaryTint
        }}
        resizeMode="cover"
      />
    );
  }
}

ImageSlide.defaultProps = {
  source: null,
  width: width
};

export default ImageSlide;
