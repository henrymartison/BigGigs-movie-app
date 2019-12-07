import { StyleSheet } from "react-native";

import { white, blue, lightGray, primaryTint } from "../../../styles/Colors";
import { fsr } from "../../commons/metrics";
import { width } from "../../../utils/device";

const styles = StyleSheet.create({
  containerError: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: primaryTint,
    width: "100%"
  },
  errorInfo: {
    fontSize: fsr(2.2),
    color: white,
    textAlign: "center",
    padding: 25
  },
  loadingButton: {
    padding: 10,
    width: "50%",
    borderWidth: 1,
    borderRadius: 100,
    borderColor: lightGray
  },
  loadingText: {
    fontSize: fsr(2.1),
    color: blue,
    textAlign: "center"
  },
  image: {
    height: width * 0.24,
    width: width * 0.24
  }
});

export default styles;
