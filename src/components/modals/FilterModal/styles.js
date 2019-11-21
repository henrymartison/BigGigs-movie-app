import { StyleSheet } from "react-native";

import { white, darkBlue } from "../../../styles/Colors";
import { fsr, height } from "../../commons/metrics";

const styles = StyleSheet.create({
  containerModal: {
    backgroundColor: "#15161b",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    height: height * 0.55
  },
  containerScroll: {
    padding: 22
  },
  modalTitle: {
    textAlign: "center",
    fontSize: fsr(2.5),
    fontWeight: "bold",
    color: darkBlue,
    padding: 22,
    paddingBottom: 18
  },
  containerSection: {
    marginBottom: 25
  },
  containerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
    paddingHorizontal: 10
  },
  optionSectionTitle: {
    fontSize: fsr(2.4),
    color: white,
    fontWeight: "bold",
    width: "100%"
  },
  optionTitle: {
    fontSize: fsr(2.3),
    color: white,
    width: "80%"
  },
  containerButton: {
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 22
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    // paddingHorizontal: 20,
    borderRadius: 100
  },
  buttonClose: {
    backgroundColor: white,
    borderWidth: 1,
    borderColor: darkBlue,
    paddingVertical: 9.1,
    flex: 0.23
  },
  buttonSave: {
    backgroundColor: darkBlue,
    borderWidth: 1,
    borderColor: darkBlue,
    // flex: 0.67,
    width: "60%"
  },
  buttonText: {
    fontSize: fsr(2.1),
    textAlign: "center"
  },
  buttonTextSave: {
    color: white,
    fontWeight: "bold"
  },
  icon: {
    fontSize: fsr(2.8)
  }
});

export default styles;
