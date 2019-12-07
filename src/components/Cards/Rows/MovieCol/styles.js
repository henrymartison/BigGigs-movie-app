import { StyleSheet, Dimensions } from "react-native";

import {
  darkBlue,
  blue,
  white,
  lightRed,
  lightYellow,
  lightGreen,
  secondaryTint
} from "../../../../styles/Colors";
import { fsr } from "../../../../components/commons/metrics";
const styles = StyleSheet.create({
  containerItem: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    marginBottom: 20,
    flexDirection: "row"
  },
  containerTwoItem: {
    // marginTop: 10,
    marginHorizontal: 10,
    // margin: 20,
    // flexDirection: 'row',
    alignItems: "flex-start",
    // justifyContent: 'center',
    width: Dimensions.get("window").width / 4
  },
  photo: {
    borderRadius: 8,
    backgroundColor: secondaryTint
  },
  item: {
    marginLeft: 20,
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1
  },
  textTitle: {
    fontSize: fsr(2.6),
    color: white,
    fontWeight: "bold"
  },
  textTwoTitle: {
    // textAlign: "center",
    fontSize: fsr(2),
    color: white,
    fontWeight: "bold",
    // paddingRight: 20,
    // paddingLeft: 20,
    paddingTop: 4
  },
  textRow: {
    flexDirection: "row"
  },
  containerSubTitle: {
    marginTop: 3,
    marginBottom: 3
  },
  containerReview: {
    justifyContent: "space-between",
    marginRight: 20
  },
  textSmall: {
    fontSize: fsr(2.1),
    color: white
  },
  trace: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: fsr(2.1),
    color: blue
  },
  score: {
    minWidth: "25%",
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 100
  },
  ratingContainer: {
    minWidth: "25%",
    // width: 50,
    borderRadius: 8,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'rgba(0,0,0,.4)',
    position: "absolute",
    top: 5,
    left: 5
  },
  low: {
    backgroundColor: lightRed
  },
  mid: {
    backgroundColor: lightYellow
  },
  high: {
    backgroundColor: lightGreen
  },
  textPercent: {
    fontSize: 13,
    fontWeight: "500",
    color: white,
    textAlign: "center",
    paddingLeft: 10
  },
  containerModal: {
    justifyContent: "center",
    alignItems: "center"
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0
  },
  containerError: {
    backgroundColor: white,
    alignItems: "center",
    justifyContent: "center"
  },
  loadingMore: {
    marginTop: 20,
    marginBottom: 30
  }
});

export default styles;
