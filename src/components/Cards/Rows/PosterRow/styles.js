import { StyleSheet, Dimensions, Platform } from "react-native";

import {
  white,
  pink,
  primaryTint,
  secondaryTint,
  primary
} from "../../../../styles/Colors";
import { fsr, width } from "../../../commons/metrics";

const styles = StyleSheet.create({
  containerMainPhoto: {
    width,
    height: width * 0.58
  },
  mainPhoto: {
    width: "90%",
    height: "80%",
    marginHorizontal: 20,
    borderRadius: 8,
    marginTop: 15
  },
  play: {
    position: "absolute",
    zIndex: 1000,
    bottom: -30,
    right: 20,
    borderRadius: width * 0.32,
    backgroundColor: secondaryTint,
    width: width * 0.16,
    height: width * 0.16,
    justifyContent: "center",
    alignItems: "center"
  },
  playButtonContainer: {
    width: Platform.OS === "ios" ? "50%" : "45%",
    height: 30,
    backgroundColor: primary,
    position: "absolute",
    top: 40,
    right: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4
  },
  containerMainPhotoInfo: {
    // position: "absolute",
    width: "100%",
    height: "100%"
    // backgroundColor: "red"
    // marginHorizontal: 20
  },
  containerBackgroundPhotoInfo: {
    position: "absolute",
    top: -15,
    // right: 100,
    right: 40,
    // backgroundColor: "red",
    // paddingLeft: 180
    // marginLeft: 180,
    alignItems: "flex-start",
    justifyContent: "center",
    // flex: 1,
    width: Platform.OS === "ios" ? "50%" : "45%"
  },
  photoInfo: {
    fontSize: fsr(2.5),
    color: white,
    fontWeight: "bold"
  },
  photoStar: {
    flexDirection: "row",
    marginTop: 5
  },
  buttonPlay: {
    marginLeft: 5
  },
  star: {
    marginRight: 5
  }
});

export default styles;
