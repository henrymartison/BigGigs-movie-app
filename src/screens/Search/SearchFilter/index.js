import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { primaryTint, white, darkBlue } from "../../../styles/Colors";
import { TouchableOpacity } from "../../../components/commons/TouchableOpacity";
import { Ionicons } from "@expo/vector-icons";

class SearchFilter extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: primaryTint,
      borderBottomColor: primaryTint
    },
    title: "Filter",
    headerTitleStyle: {
      color: white,
      fontSize: 16
    },
    headerLeft: (
      <TouchableOpacity
        style={{ paddingLeft: 10 }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="ios-arrow-back" size={27} color={darkBlue} />
      </TouchableOpacity>
    )
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>SearchFilter</Text>
      </View>
    );
  }
}
export default SearchFilter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
