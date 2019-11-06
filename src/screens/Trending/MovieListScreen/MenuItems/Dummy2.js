import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class Dummy2 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Dummy2</Text>
      </View>
    );
  }
}
export default Dummy2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
