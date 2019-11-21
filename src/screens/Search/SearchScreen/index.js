import React, { Component } from "react";
import { ScrollView, View, Text, Dimensions } from "react-native";

import Search from "../../../components/commons/Search";
import { TouchableOpacity } from "../../../components/commons/TouchableOpacity";
import { width } from "../../../components/commons/metrics";

import Image from "react-native-scalable-image";

import genre from "../../../assets/genre/ids.json";

import styles from "./styles";
import { primaryTint, white } from "../../../styles/Colors";

export default class SearchScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: "Search",
      headerStyle: {
        backgroundColor: primaryTint,
        borderBottomColor: primaryTint
      },
      headerTitleStyle: { color: white }
      //   headerRight: (
      //     <TouchableOpacity
      //       style={styles.buttonShare}
      //       onPress={params.actionShare}
      //     >
      //       <Feather name='share' size={23} color={darkBlue} />
      //     </TouchableOpacity>
      //   ),
      //   headerLeft: (
      //     <TouchableOpacity
      //       style={styles.buttonShare}
      //       onPress={() => navigation.goBack()}
      //     >
      //       <Ionicons name='ios-arrow-back' size={27} color={darkBlue} />
      //     </TouchableOpacity>
      //   )
    };
  };

  state = {
    isLoading: true,
    isError: false,
    isVisible: false,
    showImage: false,
    creditId: null,
    backdropPath: "",
    likes: ""
  };

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

  getImageApi = backdropPath => {
    return backdropPath
      ? { uri: `https://image.tmdb.org/t/p/w500/${backdropPath}` }
      : notFound;
  };

  render() {
    const { navigate } = this.props.navigation;
    const { backdropPath, likes } = this.state;

    return (
      <View style={styles.container}>
        <Search typeRequest="search" navigate={navigate} />
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
