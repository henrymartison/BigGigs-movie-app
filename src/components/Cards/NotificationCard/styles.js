import { StyleSheet } from "react-native";

import { white, blue, lightGray, primaryTint } from "../../../styles/Colors";
import { fsr } from "../../commons/metrics";

const styles = StyleSheet.create({
  containerError: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: primaryTint,
    width: "100%"
  },
  errorInfo: {
    fontSize: fsr(2.6),
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
  }
});

export default styles;
