import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";

import { primaryTint, white, darkBlue } from "../../styles/Colors";
import { TouchableOpacity } from "../../components/commons/TouchableOpacity";
import { Ionicons } from "@expo/vector-icons";

import SegmentedControlTab from "react-native-segmented-control-tab";
import MovieListScreen from "../Trending/MovieListScreen";

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

  constructor() {
    super();
    this.state = {
      selectedIndex: 0
    };
  }

  handleSingleIndexSelect = (index = number) => {
    //handle tab selection for single Tab Selection SegmentedControlTab
    this.setState(prevState => ({ ...prevState, selectedIndex: index }));
  };

  render() {
    const { selectedIndex, selectedIndices, customStyleIndex } = this.state;
    return (
      <View style={styles.container}>
        {/* Additional badges in Simple Segmented Control*/}
        <Text style={styles.headerText}>
          Simple Segmented Control with Single Selection + Badges
        </Text>
        <SegmentedControlTab
          badges={[12, 24]}
          values={["Segment One", "Segment two"]}
          selectedIndex={selectedIndex}
          onTabPress={this.handleSingleIndexSelect}
        />

        {selectedIndex === 0 && <MovieListScreen />}
        {selectedIndex === 1 && <Text style={styles.tabContent}> Tab two</Text>}
      </View>
    );
  }
}
export default withNavigation(Watchlist);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerText: {
    padding: 8,
    fontSize: 14,
    color: "#444444",
    textAlign: "center"
  },
  tabContent: {
    color: "#444444",
    fontSize: 18,
    margin: 24
  },
  Seperator: {
    marginHorizontal: -10,
    alignSelf: "stretch",
    borderTopWidth: 1,
    borderTopColor: "#888888",
    marginTop: 24
  },
  tabStyle: {
    borderColor: "#D52C43"
  },
  activeTabStyle: {
    backgroundColor: "#D52C43"
  }
});
