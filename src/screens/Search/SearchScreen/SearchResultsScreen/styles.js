import { StyleSheet } from "react-native";

import { darkBlue, lightGray, primaryTint } from "../../../../styles/Colors";
import { fsr } from "../../../../components/commons/metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryTint,
    justifyContent: "center",
  },
  containerList: {
    justifyContent: "center",
    flex: 1,
  },
  containerMainText: {
    paddingHorizontal: 20,
  },
  buttonGrid: {
    padding: 5,
    alignSelf: "flex-end",
  },
  buttonShare: {
    paddingRight: 15,
    paddingLeft: 20,
  },
  loadingMore: {
    paddingTop: 20,
    paddingBottom: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingButton: {
    padding: 10,
    width: "50%",
    borderWidth: 1,
    borderRadius: 100,
    borderColor: lightGray,
  },
  loadingText: {
    fontSize: fsr(2.1),
    color: darkBlue,
    textAlign: "center",
  },
});

export default styles;
