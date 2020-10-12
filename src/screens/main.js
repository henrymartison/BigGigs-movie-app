import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";

import SegmentedControlTab from "react-native-segmented-control-tab";
import MovieListScreen from "./Trending/MovieListScreen";
import { white, primaryTint, darkBlue, primary } from "../styles/Colors";
import { TouchableOpacity } from "../components/commons/TouchableOpacity";
import { Feather } from "@expo/vector-icons";
import CustomMenuIcon from "../components/commons/MenuIcon";
import TVList from "./TVSeries/TVList";

class Main extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: "Hooli",
      headerTitleStyle: {
        color: white,
        fontFamily: "balooBhaina-regular",
        fontSize: 21,
      },
      headerStyle: {
        backgroundColor: primaryTint,
        borderBottomColor: primaryTint,
      },
      headerRight: (
        <TouchableOpacity
          style={{ paddingRight: 10 }}
          //   onPress={params.actionFilter}
        >
          <Feather name="sliders" size={23} color={darkBlue} />
        </TouchableOpacity>
      ),
      headerLeft: (
        <CustomMenuIcon
          menutext="Menu"
          menustyle={{
            marginRight: 16,
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingLeft: 10,
          }}
          textStyle={{
            color: "white",
          }}
          option1Click={() => {
            navigation.navigate("Search");
          }}
          option2Click={() => {
            navigation.navigate("Watchlist");
          }}
          option3Click={() => null}
          option4Click={() => null}
        />
      ),
    };
  };
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
    };
  }

  handleSingleIndexSelect = (index = number) => {
    this.setState((prevState) => ({ ...prevState, selectedIndex: index }));
  };

  render() {
    const { selectedIndex } = this.state;
    return (
      <View style={styles.container}>
        <View
          style={{
            marginHorizontal: "20%",
            paddingBottom: 13,
          }}
        >
          <SegmentedControlTab
            values={["TV Series", "Movies"]}
            selectedIndex={selectedIndex}
            onTabPress={this.handleSingleIndexSelect}
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTabTextStyle={{ color: primaryTint }}
            tabTextStyle={{ color: primary }}
          />
        </View>

        {selectedIndex === 0 && <TVList />}
        {selectedIndex === 1 && <MovieListScreen />}
      </View>
    );
  }
}
export default withNavigation(Main);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryTint,
  },
  headerText: {
    padding: 8,
    fontSize: 14,
    color: "#444444",
    textAlign: "center",
  },
  tabContent: {
    color: "#444444",
    fontSize: 18,
    margin: 24,
  },
  Seperator: {
    marginHorizontal: -10,
    alignSelf: "stretch",
    borderTopWidth: 1,
    borderTopColor: "#888888",
    marginTop: 24,
  },
  tabStyle: {
    borderColor: primary,
    backgroundColor: primaryTint,
  },
  activeTabStyle: {
    backgroundColor: primary,
  },
});
