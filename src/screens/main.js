import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";

import SegmentedControl from "@react-native-community/segmented-control";

import { white, primaryTint, darkBlue } from "../styles/Colors";
import { TouchableOpacity } from "../components/commons/TouchableOpacity";
import { Feather } from "@expo/vector-icons";
import CustomMenuIcon from "../components/commons/MenuIcon";
import { HomeList } from "./HomeScreen";

class Main extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "MovieCouch 🛋️",
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
      values: [
        { title: "TV Series", media_type: "tv" },
        { title: "Movies", media_type: "movie" },
      ],
      media_type: "tv",
    };
  }

  _onChange = (event) => {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex,
    });
  };

  _onValueChange = (value) => {
    this.setState({
      media_type: value,
    });
  };

  render() {
    const { selectedIndex, values } = this.state;
    return (
      <View style={styles.container}>
        <View
          style={{
            marginHorizontal: "20%",
            paddingBottom: 13,
          }}
        >
          <SegmentedControl
            values={values.map((e) => e.title)}
            selectedIndex={selectedIndex}
            onChange={this._onChange}
            onValueChange={this._onValueChange}
            tintColor="#69696f"
            fontStyle={{ fontSize: 14, color: white }}
            appearance="dark"
          />
        </View>

        {selectedIndex === 0 && (
          <HomeList
            media_type="tv"
            detailsRoute={"TVDetails"}
            category={"tv"}
          />
        )}
        {selectedIndex === 1 && (
          <HomeList
            media_type="movie"
            detailsRoute={"MovieDetails"}
            category={"movie"}
          />
        )}
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
