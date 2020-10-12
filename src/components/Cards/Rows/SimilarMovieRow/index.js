import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image
} from "react-native";

import { withNavigation } from "react-navigation";

// import Image from "react-native-scalable-image";

import { width, fsr } from "../../../commons/metrics";
import { TouchableOpacity } from "../../../commons/TouchableOpacity";
import { secondaryTint } from "../../../../styles/Colors";

const renderScoreRow = voteAverage => {
  return (
    <View style={styles.ratingContainer}>
      <Text style={styles.textPercent}>{voteAverage}</Text>
    </View>
  );
};

const getImageApi = image =>
  image ? { uri: `https://image.tmdb.org/t/p/w500/${image}` } : null;

class MovieListRow extends Component {
  state = {
    movies: [],
    isLoading: true
  };

  async componentDidMount() {
    this.loadMovies();
  }

  loadMovies = async () => {
    try {
      const apiKey = "3c88452407225bc665094772b7af5233";
      const { id } = this.props.id;

      const request = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=en-US&page=1`;

      fetchRequest = await (await fetch(request)).json();
      const results = fetchRequest.results;
      // console.log(results);
      this.setState({
        isLoading: false,
        movies: results
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  renderMovies = ({ item }) => {
    return (
      <View style={styles.containerItem}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.push("MovieDetails", {
              id: item.id,
              title: item.title
            })
          }
          activeOpacity={0.85}
          style={styles.posterContainer}
        >
          <Image
            source={getImageApi(item.poster_path)}
            style={styles.image}
            height={width * 0.35}
            width={width * 0.25}
          />
          {renderScoreRow(item.vote_average)}
        </TouchableOpacity>
        <View style={styles.textView}>
          <Text numberOfLines={2} style={styles.title}>
            {item.title}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const { isLoading, movies } = this.state;
    return isLoading ? (
      <View style={styles.indicator}>
        <ActivityIndicator />
      </View>
    ) : (
      <View style={styles.container}>
        <Text style={styles.header}>You may also like</Text>
        <FlatList
          data={movies}
          renderItem={this.renderMovies}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
}
export default withNavigation(MovieListRow);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 15
  },
  indicator: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  header: {
    fontSize: fsr(3),
    color: "white",
    fontWeight: "700",
    paddingBottom: 10
    // marginLeft: 18
  },
  containerItem: {
    width: width * 0.25,
    marginHorizontal: 7
  },
  posterContainer: {
    // marginHorizontal: 7,
    height: width * 0.35,
    width: width * 0.25,
    backgroundColor: secondaryTint,
    borderRadius: 8
  },
  image: {
    borderRadius: 8
  },
  textView: {
    marginTop: 5
  },
  title: {
    fontWeight: "700",
    fontSize: fsr(2.1),
    color: "white",
    textAlign: "center"
  },
  ratingContainer: {
    minWidth: "30%",
    width: "40%",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.4)",
    position: "absolute",
    top: 7,
    right: 7,
    paddingVertical: 2
  },
  textPercent: {
    fontSize: fsr(2.1),
    fontWeight: "500",
    color: "white",
    textAlign: "center"
  }
});
