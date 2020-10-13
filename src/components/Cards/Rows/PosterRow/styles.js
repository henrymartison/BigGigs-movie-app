import { StyleSheet, Dimensions } from "react-native";

import { white, secondaryTint, primary } from "../../../../styles/Colors";
import { fsr, width } from "../../../commons/metrics";

const styles = StyleSheet.create({
  containerMainPhoto: {
    width,
    position: "relative",
    // backgroundColor: "red",
  },
  mainPhoto: {
    width: "90%",
    height: 150,
    marginHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
    backgroundColor: secondaryTint,
  },
  posterPhoto: {
    height: width * 0.35,
    width: width * 0.25,
    borderRadius: 8,
    backgroundColor: secondaryTint,
    position: "absolute",
    top: (width * 0.8) / 3 + 14,
    left: 40,
  },
  containerBackgroundPhotoInfo: {
    width: "60%",
    alignSelf: "flex-end",
    marginVertical: 15,
  },
  optionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    width: "100%",
  },
  playButtonContainer: {
    flex: 1,
    height: 33,
    zIndex: 1000,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    borderColor: "#82c596",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  playButtonText: {
    fontWeight: "600",
    fontSize: 15,
    color: primary,
    paddingLeft: 10,
  },
  photoInfo: {
    fontSize: fsr(2.5),
    color: white,
    fontWeight: "bold",
  },
  photoStar: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    marginRight: 5,
  },

  textPercent: {
    color: white,
    fontSize: fsr(2.6),
    fontWeight: "900",
  },
  textPercent2: {
    color: "#a8a8a8",
    fontSize: fsr(1.8),
    fontWeight: "600",
  },
  currentStatus: {
    width: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 4,
    flexDirection: "row",
  },
  statusText: {
    fontWeight: "600",
    fontSize: 19,
    color: white,
    marginLeft: 4,
  },
  currentStatusText: {
    fontSize: 18,
    fontWeight: "500",
    color: "mediumseagreen",
    marginLeft: 4,
  },
  statusIndicator: {
    height: 8,
    width: 8,
    borderRadius: 8 / 2,
    backgroundColor: "grey",
  },
  running: {
    color: "mediumseagreen",
  },
  ended: {
    color: "tomato",
  },
  pending: {
    color: "orange",
  },
});

export default styles;
