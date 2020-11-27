import React from "react";
import { View, StyleSheet } from "react-native";

export const Separator = ({ ml = null }) => (
  <View
    style={{
      flex: 1,
      height: StyleSheet.hairlineWidth,
      marginLeft: ml,
      backgroundColor: "#332f2f",
    }}
  />
);
