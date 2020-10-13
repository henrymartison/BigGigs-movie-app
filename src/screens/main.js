import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";

import SegmentedControlTab from "react-native-segmented-control-tab";
import SegmentedControl from "@react-native-community/segmented-control";

import MovieListScreen from "./Trending/MovieListScreen";
import {
  white,
  primaryTint,
  darkBlue,
  primary,
  inactiveTint,
} from "../styles/Colors";
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
          <SegmentedControl
            values={["TV Series", "Movies"]}
            selectedIndex={selectedIndex}
            onTabPress={this.handleSingleIndexSelect}
            onChange={(event) => {
              this.setState({
                selectedIndex: event.nativeEvent.selectedSegmentIndex,
              });
            }}
            tintColor="#69696f"
            // backgroundColor=""
            fontStyle={{ fontSize: 14, color: white }}
            appearance="dark"
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
});
