import { StyleSheet } from "react-native";

import { white, inactiveTint, primaryTint } from "../../styles/Colors";
import { fsr } from "../../components/commons/metrics";

const styles = StyleSheet.create({
  buttonFilter: {
    paddingRight: 15,
    paddingLeft: 20,
  },
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
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textMain: {
    fontSize: fsr(3),
    fontWeight: "bold",
    color: white,
    width: "80%",
  },
  buttonGrid: {
    padding: 5,
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  loadingMore: {
    paddingTop: 20,
    paddingBottom: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingButton: {
    padding: 10,
    width: "30%",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: inactiveTint,
  },
  loadingText: {
    fontSize: fsr(2.1),
    color: white,
    textAlign: "center",
  },
});

export default styles;
