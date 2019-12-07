import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { primaryTint, white, darkBlue } from "../../styles/Colors";
import { TouchableOpacity } from "../../components/commons/TouchableOpacity";
import { Ionicons } from "@expo/vector-icons";
import SlideShow from "../../components/carousels/MovieCarousel";

class Watchlist extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Watchlist",
    headerTitleStyle: { color: white },
    headerStyle: {
      backgroundColor: primaryTint,
      borderBottomColor: primaryTint
    },
    headerLeft: (
      <TouchableOpacity
        style={{ paddingLeft: 10 }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="ios-arrow-back" size={27} color={darkBlue} />
      </TouchableOpacity>
    )
  });
  render() {
    return (
      <View style={styles.container}>
        <SlideShow />
      </View>
    );
  }
}
export default Watchlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryTint
  }
});
