import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { inactiveTint, primaryTint } from "../styles/Colors";

const NotificationScreen = ({ title, description }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    backgroundColor: primaryTint,
  },
  title: {
    textAlign: "center",
    fontSize: 27,
    fontWeight: "600",
    color: "white",
    marginBottom: 4,
  },
  description: {
    textAlign: "center",
    fontSize: 22,
    color: inactiveTint,
  },
});
