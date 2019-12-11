import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Feather, Ionicons } from "@expo/vector-icons";

import {
  primary,
  white,
  secondaryTint,
  darkBlue
} from "../../../../styles/Colors";
import { fsr } from "../../../commons/metrics";
import { TouchableOpacity } from "../../../commons/TouchableOpacity";

const TVSeasons = ({ data = {}, numberOfSeasons }) => (
  <View style={styles.container}>
    <View style={styles.separator} />
    <Text style={styles.header}>Seasons ({numberOfSeasons})</Text>
    {data.map(item => (
      <View key={item.name}>
        <TouchableOpacity style={styles.rowContainer}>
          <View style={styles.checkRow}>
            <Feather name="check-circle" size={18} color={primary} />
            <Text style={styles.rowText}>{item.name}</Text>
          </View>
          <Ionicons name="ios-arrow-forward" color={darkBlue} size={18} />
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
    ))}
  </View>
);
export default TVSeasons;

const styles = StyleSheet.create({
  container: {
    marginTop: 15
  },
  header: {
    fontSize: fsr(2.6),
    fontWeight: "700",
    color: white,
    marginVertical: 15
  },
  rowContainer: {
    height: 50,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  rowText: {
    fontSize: fsr(2.4),
    color: white,
    paddingHorizontal: 10
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: secondaryTint
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center"
  }
});
