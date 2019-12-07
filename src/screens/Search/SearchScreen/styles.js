import { StyleSheet } from "react-native";

import { white, darkBlue, primaryTint, primary } from "../../../styles/Colors";
import { fsr } from "../../../components/commons/metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryTint
  },
  containerList: {
    marginTop: 25
  },
  item: {
    alignItems: "flex-start",
    marginBottom: 15,
    paddingHorizontal: 30
  },
  itemText: {
    fontSize: fsr(2.5),
    color: primary,
    textAlign: "left"
  },
  titleText: {
    color: white,
    fontWeight: "700",
    fontSize: fsr(3.3),
    marginBottom: 30,
    paddingLeft: 30
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center"
  }
});

export default styles;
