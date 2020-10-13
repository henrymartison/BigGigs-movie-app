import React from "react";
import { View, Text } from "react-native";

import Image from "react-native-scalable-image";
import { FontAwesome } from "@expo/vector-icons";

import language from "../../../../assets/language/iso.json";
import genre from "../../../../assets/genre/tvids.json";

import { TouchableOpacity } from "../../../commons/TouchableOpacity";

import { width } from "../../../commons/metrics";
import { notFound } from "../../../../utils/StaticImages";

import styles from "./styles";
import { secondaryTint } from "../../../../styles/Colors.js";

const getImageApi = (image) =>
  image ? { uri: `https://image.tmdb.org/t/p/w500/${image}` } : notFound;

const convertToDate = (date) => new Date(date).getFullYear() || "";

const convertToUpperCaseFirstLetter = (value) => {
  const str = language[value] || "";
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
};

const convertGenre = (arr, type, isSearch) => {
  if (type === "normal" || isSearch) {
    if (arr.length > 1) return `${genre[arr[0]].name}`;
    return arr.length !== 0 ? `${genre[arr[0]].name}` : "";
  }
  return arr.length !== 0 && type !== genre[arr[0]].name
    ? `${type}, ${genre[arr[0]].name}`
    : type;
};

sliceArrayLength = (arr, num) => {
  return arr.length > num ? arr.slice(0, num) : arr;
};

const renderDivider = (releaseDate, originalLanguage) =>
  releaseDate && originalLanguage !== "xx" ? (
    <Text style={styles.trace}>|</Text>
  ) : null;

const renderScoreColumn = (voteAverage) => {
  const color =
    voteAverage < 5
      ? "low"
      : voteAverage >= 5 && voteAverage < 7
      ? "mid"
      : "high";

  return (
    <View style={styles.score}>
      <FontAwesome
        name="star"
        size={width * 0.04}
        color="orange"
        style={{ marginRight: 10 }}
      />
      <Text style={[styles.textPercent, styles[color]]}>{voteAverage}</Text>
    </View>
  );
};

const renderScoreRow = (voteAverage) => {
  return (
    <View style={styles.ratingContainer}>
      <Text style={styles.textPercent}>{voteAverage}</Text>
    </View>
  );
};

export default class TVRow extends React.PureComponent {
  render() {
    const { numColumns, item, type, isSearch, navigate } = this.props;

    if (numColumns === 1) {
      return (
        <TouchableOpacity
          onPress={() => navigate("TVDetails", { id: item.id })}
        >
          <View style={styles.containerItem}>
            <Image
              source={getImageApi(item.poster_path)}
              style={styles.photo}
              width={width * 0.25}
              height={width * 0.35}
            />
            <View style={styles.item}>
              <View>
                <Text numberOfLines={2} style={styles.textTitle}>
                  {item.name}
                </Text>
                <View style={[styles.textRow, styles.containerSubTitle]}>
                  <Text style={styles.textSmall}>
                    {convertToDate(item.first_air_date)}
                  </Text>
                  {renderDivider(item.first_air_date, item.original_language)}
                  <Text numberOfLines={1} style={styles.textSmall}>
                    {convertToUpperCaseFirstLetter(item.original_language)}
                  </Text>
                </View>
                <Text numberOfLines={1} style={styles.textSmall}>
                  {convertGenre(item.genre_ids, type, isSearch)}
                </Text>
              </View>
              <View style={[styles.textRow, styles.containerReview]}>
                {renderScoreColumn(item.vote_average)}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={styles.containerTwoItem}
        onPress={() => navigate("TVDetails", { id: item.id })}
      >
        <View style={{ backgroundColor: secondaryTint, borderRadius: 8 }}>
          <Image
            source={getImageApi(item.poster_path)}
            style={styles.photo}
            width={width * 0.3}
          />
          {renderScoreRow(item.vote_average)}
        </View>
        <Text numberOfLines={2} style={styles.textTwoTitle}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  }
}
