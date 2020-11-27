import { StyleSheet } from "react-native";
import { fsr } from "../metrics";
import { white } from "../../../styles/Colors";

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  attributeText: {
    // paddingLeft: 10,
    fontSize: fsr(2),
    color: white,
  },
  iconLeft: {
    marginRight: 10,
  },
});

export default styles;
