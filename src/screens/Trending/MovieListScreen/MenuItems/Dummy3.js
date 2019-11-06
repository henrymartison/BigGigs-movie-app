import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class Dummy3 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Dummy3</Text>
      </View>
    );
  }
}
export default Dummy3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
