import React, { Component } from "react";
import { ScrollView, View, Text } from "react-native";

import Search from "../../../components/commons/Search";
import { TouchableOpacity } from "../../../components/commons/TouchableOpacity";

import movieIds from "../../../assets/genre/movieIds.json";
import tvIds from "../../../assets/genre/tvIds.json";

import styles from "./styles";
import { primaryTint, white, primary } from "../../../styles/Colors";
import CustomMenuIcon from "../../../components/commons/MenuIcon";

export default class SearchScreen extends Component {
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

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isError: false,
      isVisible: false,
      showImage: false,
      creditId: null,
      backdropPath: "",
      likes: "",
      text: "",
    };

    this.arrayHolder = [];
  }

  shouldComponentUpdate() {
    return false;
  }

  actionCancel = () => {
    Keyboard.dismiss();
  };

  searchFilterFunc = (text) => {
    const newData = this.arrayHolder.filter(function (item) {
      const itemData = item.title ? item.title.toUpperCase() : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
  };

  getImageApi = (backdropPath) => {
    return backdropPath
      ? { uri: `https://image.tmdb.org/t/p/original/${backdropPath}` }
      : notFound;
  };

  renderItem = (item) => {
    return (
      <TouchableOpacity style={styles.item}>
        <Text>Action</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Search typeRequest="search" navigate={navigate} />
        </View>
        <ScrollView style={styles.containerList}>
          <View>
            <Text style={styles.titleText}>Movie Genres</Text>
            <View style={styles.sectionContainer}>
              {Object.keys(movieIds).map((id) => (
                <View key={id}>
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() =>
                      navigate("SearchResults", {
                        typeRequest: "discover",
                        name: movieIds[id].name,
                        category: "movie",
                        id,
                      })
                    }
                  >
                    <Text style={styles.itemText}>{movieIds[id].name}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          <View style={{ marginTop: 30 }}>
            <Text style={styles.titleText}>TV Show Genres</Text>
            <View style={styles.sectionContainer}>
              {Object.keys(tvIds).map((id) => (
                <View key={id}>
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() =>
                      navigate("SearchResults", {
                        typeRequest: "discover",
                        name: tvIds[id].name,
                        category: "tv",
                        id,
                      })
                    }
                  >
                    <Text style={styles.itemText}>{tvIds[id].name}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
