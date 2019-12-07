import { StyleSheet } from "react-native";

import {
  white,
  pink,
  blue,
  primaryTint,
  primary
} from "../../../styles/Colors";
import { fsr } from "../../../components/commons/metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: primaryTint
  },
  buttonShare: {
    paddingRight: 15,
    paddingLeft: 20
  },
  containerMovieInfo: {
    margin: 20,
    marginTop: 35
  },
  subTitleInfo: {
    fontSize: fsr(2.1),
    color: white,
    textAlign: "justify"
  },
  readMore: {
    color: primary,
    marginTop: 5,
    textAlign: "left",
    fontWeight: "600"
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0
  },
  ratingContainer: {
    minWidth: "25%",
    // width: 50,
    borderRadius: 8,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: "rgba(0,0,0,.4)",
    position: "absolute",
    top: 7,
    right: 7,
    paddingVertical: 2
  }
});

export default styles;
