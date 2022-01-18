import React from "react";
import { FlatList, View, Text, Image, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { fsr, width } from "../../commons/metrics";
import { primary, primaryTint, white } from "../../../styles/Colors";
import { TouchableOpacity } from "../../commons/TouchableOpacity";

const HorizontalRowList = ({ data, ListEmptyComponent, title, navigation }) => {
  const renderScoreRow = (voteAverage) => {
    return (
      <View style={styles.ratingContainer}>
        <Text style={styles.textPercent}>{voteAverage}</Text>
      </View>
    );
  };

  const getImageApi = (image) =>
    image ? { uri: `https://image.tmdb.org/t/p/w500/${image}` } : null;

  const renderItem = ({ item, index }) => {
    if (index === data.length - 1) {
      return (
        <View
          style={[
            styles.containerItem,
            {
              backgroundColor: "transparent",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <View style={styles.containerMore}>
            <TouchableOpacity>
              <Feather name="more-horizontal" size={22} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={{ color: "white" }}>Load More</Text>
        </View>
      );
    }
    return (
      <View style={styles.containerItem}>
        <TouchableOpacity
          onPress={() =>
            navigation.push("MovieDetails", {
              id: item.id,
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
            {item.original_title || item.original_name}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View>
      <View style={styles.headingContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.heading} numberOfLines={1}>
            {title}
          </Text>
        </View>
        <TouchableOpacity>
          <Text style={[styles.title, { color: primary }]}>See all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={ListEmptyComponent}
        renderItem={renderItem}
      />
    </View>
  );
};

export default HorizontalRowList;

const styles = StyleSheet.create({
  containerItem: {
    width: width * 0.25,
    marginHorizontal: 7,
  },
  containerMore: {
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: primary,
    alignItems: "center",
    justifyContent: "center",
  },
  posterContainer: {
    // marginHorizontal: 7,
    height: width * 0.35,
    width: width * 0.25,
    backgroundColor: primaryTint,
    borderRadius: 8,
  },
  headingContainer: {
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  heading: {
    fontSize: fsr(2.5),
    fontWeight: "500",
    color: white,
    // width: "80%",
  },
  image: {
    borderRadius: 8,
  },
  textView: {
    marginTop: 5,
  },
  title: {
    fontWeight: "700",
    fontSize: fsr(2.1),
    color: "white",
    textAlign: "center",
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
    paddingVertical: 2,
  },
  textPercent: {
    fontSize: fsr(2.1),
    fontWeight: "500",
    color: "white",
    textAlign: "center",
  },
});
