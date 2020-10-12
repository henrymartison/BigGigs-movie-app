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
    height: width * 0.8
    // backgroundColor: "red"
  },
  mainPhoto: {
    width: "90%",
    height: 150,
    marginHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
    backgroundColor: secondaryTint
  },
  playButtonContainer: {
    width: Dimensions.get("window").width / 2 - 25,
    // width: Platform.OS === "ios" ? "40%" : "35%",
    height: 33,
    // backgroundColor: primary,
    // position: "absolute",
    // top: 76,
    zIndex: 1000,
    // right: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    borderColor: "#82c596",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  playButtonText: {
    fontWeight: "600",
    fontSize: 15,
    color: primary,
    paddingLeft: 10
  },
  saveButtonContainer: {
    width: Dimensions.get("window").width / 2 - 25,
    // width: Platform.OS === "ios" ? "40%" : "35%",
    height: 33,
    // backgroundColor: primary,
    // position: "absolute",
    // top: 41,
    // right: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    borderColor: primary,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  containerMainPhotoInfo: {
    // position: "absolute",
    width: "100%",
    height: "100%"
    // backgroundColor: "red"
    // marginHorizontal: 20
  },
  containerBackgroundPhotoInfo: {
    alignSelf: "flex-end",
    // position: "absolute",
    top: 5,
    // right: 100,
    right: 40,
    // backgroundColor: "green",
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
    // marginTop: 5,
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
    fontSize: fsr(2.6),
    fontWeight: "900"
  },
  textPercent2: {
    color: "#a8a8a8",
    fontSize: fsr(2),
    fontWeight: "600"
  },
  currentStatus: {
    width: "100%",
    // height: 30,
    backgroundColor: "transparent",
    // position: "absolute",
    // top: 41,
    // right: 80,
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
