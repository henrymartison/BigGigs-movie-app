import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { withNavigation } from "react-navigation";

import {
  primaryTint,
  white,
  darkBlue,
  secondaryTint,
  inactiveTint,
} from "../../styles/Colors";
import { TouchableOpacity } from "../../components/commons/TouchableOpacity";
import { Ionicons } from "@expo/vector-icons";

import SegmentedControl from "@react-native-community/segmented-control";
import { NotificationCard } from "../../components/Cards";
import NotificationScreen from "../NotificationScreen";

export default class Watchlist extends Component {
  render() {
    return (
      <NotificationScreen
        title="No TV Shows or Movies"
        description="Your library is empty. TV shows and movies you save to your library
          will appear here."
      />
    );
  }
}
const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
    margin: 10,
  },
  segmentContainer: {
    marginBottom: 10,
  },
  segmentSection: {
    marginBottom: 25,
  },
  container: {
    paddingTop: 80,
  },
});
