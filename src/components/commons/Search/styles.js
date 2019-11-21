import { StyleSheet } from "react-native";

import {
  darkBlue,
  freeze,
  white,
  darkish,
  secondaryTint
} from "../../../styles/Colors";
import { fsr } from "../metrics";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 5
  },
  containerInput: {
    height: 40,
    backgroundColor: secondaryTint,
    borderRadius: 6
  },
  inputDirection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    padding: 10
  },
  textInput: {
    flex: 1,
    height: "100%",
    fontSize: fsr(2.2),
    color: white,
    width: "100%"
  }
});

export default styles;
