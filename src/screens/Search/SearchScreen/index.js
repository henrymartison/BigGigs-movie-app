import React, { Component } from "react";
import { ScrollView, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

import * as Animatable from "react-native-animatable";

import Search from "../../../components/commons/Search";
import { TouchableOpacity } from "../../../components/commons/TouchableOpacity";
import { width } from "../../../components/commons/metrics";

import Image from "react-native-scalable-image";

import genre from "../../../assets/genre/ids.json";

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
        fontSize: 21
      },
      headerStyle: {
        backgroundColor: primaryTint,
        borderBottomColor: primaryTint
      },
      headerLeft: (
        <CustomMenuIcon
          menutext="Menu"
          menustyle={{
            marginRight: 16,
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingLeft: 10
          }}
          textStyle={{
            color: "white"
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
      )
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
      text: ""
    };

    this.arrayHolder = [];
  }

  shouldComponentUpdate() {
    return false;
  }

  requestMoviesInfo = async () => {
    try {
      this.setState({ isLoading: true });

      const { id } = genre[id];

      const data = await request(`movie/16`, {
        include_image_language: "en,null",
        append_to_response: "credits,videos,images"
      });

      this.setState({
        isLoading: false,
        isError: false,
        id,
        likes: data.vote_count || "",
        backdropPath: data.backdrop_path || "",
        posterPath: data.poster_path || "",
        title: data.title || "",
        images: this.formatImageUrl(data.images.backdrops)
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        isError: true
      });
    }
  };

  actionCancel = () => {
    Keyboard.dismiss();
  };

  searchFilterFunc = text => {
    const newData = this.arrayHolder.filter(function(item) {
      const itemData = item.title ? item.title.toUpperCase() : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
  };

  getImageApi = backdropPath => {
    return backdropPath
      ? { uri: `https://image.tmdb.org/t/p/w500/${backdropPath}` }
      : notFound;
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Search typeRequest="search" navigate={navigate} />
        </View>
        <ScrollView style={styles.containerList}>
          <Text style={styles.titleText}>Explore Genres</Text>
          {Object.keys(genre).map(id => (
            <TouchableOpacity
              style={styles.item}
              key={id}
              onPress={() =>
                navigate("SearchResults", {
                  typeRequest: "discover",
                  name: genre[id].name,
                  id
                })
              }
            >
              <Text style={styles.itemText}>{genre[id].name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}
