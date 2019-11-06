import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class Dummy1 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Dummy1</Text>
      </View>
    );
  }
}
export default Dummy1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
