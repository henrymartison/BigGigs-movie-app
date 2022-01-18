import { StyleSheet } from "react-native";

import {
  white,
  darkBlue,
  primaryTint,
  primary,
  secondaryTint,
  darkish,
  blue,
} from "../../../styles/Colors";
import { fsr } from "../../../components/commons/metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryTint,
  },
  containerList: {
    marginTop: 25,
  },
  sectionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 5,
  },
  item: {
    backgroundColor: secondaryTint,
    margin: 5,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  itemText: {
    fontSize: fsr(1.9),
    color: "#fff",
    textAlign: "left",
    fontWeight: "600",
  },
  titleText: {
    color: white,
    fontWeight: "700",
    fontSize: fsr(3.0),
    marginBottom: 10,
    marginHorizontal: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});

export default styles;
