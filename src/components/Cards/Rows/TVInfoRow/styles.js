import { StyleSheet } from "react-native";

import { blue, white, darkBlue } from "../../../../styles/Colors";
import { fsr } from "../../../commons/metrics";

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  title: {
    fontSize: fsr(2.2),
    fontWeight: "bold",
    color: darkBlue
  },
  description: {
    fontSize: fsr(2.2),
    color: white,
    fontWeight: "500"
  }
});

export default styles;
