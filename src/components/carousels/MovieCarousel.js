import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

export default class MovieCarousel extends Component {
  state = {
    data: [
      { title: "Food", uri: require("../../../assets/icon.png") },
      { title: "Bag", uri: require("../../../assets/icon.png") },
      { title: "Country", uri: require("../../../assets/icon.png") },
      { title: "Null", uri: require("../../../assets/icon.png") }
    ]
  };

  _renderItem({ item, index }) {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  }

  render() {
    return (
      <Carousel
        ref={c => {
          this._carousel = c;
        }}
        data={this.state.data}
        renderItem={this._renderItem}
        sliderWidth={100}
        itemWidth={100}
      />
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1
  },
  title: {
    color: "white"
  }
});
