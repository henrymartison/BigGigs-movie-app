import { StyleSheet, Dimensions } from "react-native";

import {
  blue,
  white,
  lightRed,
  lightYellow,
  lightGreen,
  secondaryTint,
} from "../../../../styles/Colors";
import { fsr } from "../../../../components/commons/metrics";

const styles = StyleSheet.create({
  containerItem: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    marginBottom: 20,
    flexDirection: "row",
  },
  containerTwoItem: {
    paddingTop: 10,
    marginBottom: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width / 3,
  },
  photo: {
    borderRadius: 8,
    backgroundColor: secondaryTint,
  },
  item: {
    marginLeft: 20,
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
  textTitle: {
    fontSize: fsr(2.6),
    color: white,
    fontWeight: "bold",
  },
  textTwoTitle: {
    textAlign: "center",
    fontSize: fsr(2),
    color: white,
    fontWeight: "bold",
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 20,
  },
  textRow: {
    flexDirection: "row",
  },
  containerSubTitle: {
    marginTop: 3,
    marginBottom: 3,
  },
  containerReview: {
    justifyContent: "space-between",
    marginRight: 20,
  },
  textSmall: {
    fontSize: fsr(2.1),
    color: white,
  },
  trace: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: fsr(2.1),
    color: blue,
  },
  score: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  ratingContainer: {
    minWidth: "25%",
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,.4)",
    position: "absolute",
    top: 7,
    right: 7,
    paddingVertical: 2,
  },
  low: {
    color: lightRed,
  },
  mid: {
    color: lightYellow,
  },
  high: {
    color: lightGreen,
  },
  textPercent: {
    fontSize: fsr(2.1),
    fontWeight: "600",
    color: white,
    textAlign: "center",
  },
  containerModal: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  containerError: {
    backgroundColor: white,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingMore: {
    marginTop: 20,
    marginBottom: 30,
  },
});

export default styles;
