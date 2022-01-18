import { StyleSheet } from "react-native";

import {
  darkBlue,
  freeze,
  white,
  darkish,
  secondaryTint,
  primary,
} from "../../../styles/Colors";
import { fsr } from "../metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 18,
    paddingBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  containerInput: {
    height: 37,
    backgroundColor: secondaryTint,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
  },
  inputDirection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    padding: 10,
  },
  textInput: {
    flex: 1,
    height: "100%",
    fontSize: fsr(2.2),
    color: white,
    width: "100%",
  },
  cancelText: {
    color: primary,
    fontSize: fsr(2.6),
  },
  cancelContainer: {
    paddingHorizontal: 10,
  },
  filter: {
    paddingHorizontal: 15,
  },
});

export default styles;
