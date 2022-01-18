import { StyleSheet } from "react-native";
import { darkGray, primaryTint, white } from "../../../styles/Colors";
import { fsr } from "../../../components/commons/metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryTint,
    paddingHorizontal: 15,
  },
  thumbnailContainer: {
    backgroundColor: "#85a6d3",
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    backgroundColor: "#1c1c1e",
    height: 104,
    borderRadius: 10,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  profilename: {
    fontWeight: "600",
    fontSize: fsr(3),
    color: white,
  },
  profileOptionText: {
    fontSize: fsr(1.6),
    marginTop: 6,
    color: white,
  },
  thumbnailText: {
    color: "white",
    fontSize: fsr(2.5),
  },
  section: {
    backgroundColor: "#1c1c1e",
    // height: 104,
    borderRadius: 10,
    justifyContent: "center",
    marginTop: 10,
  },
  sectionHeading: {
    color: darkGray,
    fontSize: 15,
    textTransform: "uppercase",
    marginTop: 28,
  },
});

export default styles;
