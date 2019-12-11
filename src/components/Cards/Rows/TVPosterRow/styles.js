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
    marginTop: 15,
    backgroundColor: secondaryTint
  },
  playButtonContainer: {
    width: Platform.OS === "ios" ? "40%" : "35%",
    height: 30,
    backgroundColor: primary,
    position: "absolute",
    top: 41,
    right: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4
  },
  playButtonText: {
    fontWeight: "600",
    fontSize: 17,
    color: secondaryTint,
    paddingLeft: 10
  },
  saveButtonContainer: {
    // backgroundColor: primary,
    position: "absolute",
    top: 38,
    right: 30,
    paddingHorizontal: 10
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
    top: -18,
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
    marginTop: 5,
    alignItems: "center"
  },
  buttonPlay: {
    marginLeft: 5
  },
  star: {
    marginRight: 5
  },

  textPercent: {
    color: white,
    fontSize: fsr(2.3),
    fontWeight: "500"
  },
  currentStatus: {
    width: Platform.OS === "ios" ? "40%" : "35%",
    height: 30,
    backgroundColor: "transparent",
    position: "absolute",
    top: 41,
    right: 80,
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 4,
    flexDirection: "row"
  },
  statusText: {
    fontWeight: "600",
    fontSize: 19,
    color: white,
    marginLeft: 4
  },
  currentStatusText: {
    fontSize: 18,
    fontWeight: "500",
    color: "mediumseagreen",
    marginLeft: 4
  },
  statusIndicator: {
    height: 8,
    width: 8,
    borderRadius: 8 / 2,
    backgroundColor: "grey"
  },
  running: {
    color: "mediumseagreen"
  },
  ended: {
    color: "tomato"
  },
  pending: {
    color: "orange"
  }
});

export default styles;
