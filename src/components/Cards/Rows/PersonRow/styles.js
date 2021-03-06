import { StyleSheet } from "react-native";

import { blue, white } from "../../../../styles/Colors";

const styles = StyleSheet.create({
  containerCast: {
    marginRight: 10,
    alignItems: "center",
    width: 80
    // justifyContent: "center"
  },
  titleCast: {
    marginTop: 10,
    color: white,
    textAlign: "center"
  },
  titleCharacter: {
    fontWeight: "bold"
  },
  castPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 13
  },
  productionCompaniesPhoto: {
    width: "100%",
    height: 60,
    borderRadius: 4,
    marginTop: 13
  }
});

export default styles;
