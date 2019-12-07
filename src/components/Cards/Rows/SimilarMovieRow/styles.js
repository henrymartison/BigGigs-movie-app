import { StyleSheet } from "react-native";
import { fsr } from "../../../commons/metrics";
import { width } from "../../../../utils/device";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 15
  },
  indicator: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  header: {
    fontSize: fsr(3),
    color: "white",
    fontWeight: "700",
    paddingBottom: 10
    // marginLeft: 18
  },
  containerItem: {
    width: width * 0.25,
    marginHorizontal: 7
  },
  posterContainer: {
    // marginHorizontal: 7,
    height: width * 0.35,
    width: width * 0.25,
    backgroundColor: "#f2f2f2",
    borderRadius: 8
  },
  image: {
    borderRadius: 8
  },
  textView: {
    marginTop: 5
  },
  title: {
    fontWeight: "700",
    fontSize: fsr(2.1),
    color: "white",
    textAlign: "center"
  },
  ratingContainer: {
    minWidth: "30%",
    width: "40%",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.4)",
    position: "absolute",
    top: 7,
    right: 7,
    paddingVertical: 2
  },
  textPercent: {
    fontSize: fsr(2.1),
    fontWeight: "500",
    color: "white",
    textAlign: "center"
  }
});
