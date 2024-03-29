import React from "react";
import { View, Text } from "react-native";

import Image from "react-native-scalable-image";

import language from "../../../../assets/language/iso.json";
import genre from "../../../../assets/genre/movieIds.json";
// import genre from '../../../../assets/genre/tvids.json';

import { TouchableOpacity } from "../../../commons/TouchableOpacity";

import { width } from "../../../commons/metrics";
import { notFound } from "../../../../utils/StaticImages";

import styles from "./styles";
import { primary } from "../../../../styles/Colors.js";

const getImageApi = (image) =>
  image ? { uri: `https://image.tmdb.org/t/p/w500/${image}` } : notFound;

const convertToDate = (date) => new Date(date).getFullYear() || "";

const convertToUpperCaseFirstLetter = (value) => {
  const str = language[value] || "";
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
};

const convertGenre = (arr, type, isSearch) => {
  if (type === "normal" || isSearch) {
    if (arr.length > 1) return `${genre[arr[0]].name}, ${genre[arr[1]].name}`;
    return arr.length !== 0 ? `${genre[arr[0]].name}` : "";
  }
  return arr.length !== 0 && type !== genre[arr[0]].name
    ? `${type}, ${genre[arr[0]].name}`
    : type;
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
    <View style={[styles.score, styles[color]]}>
      <Text style={styles.textPercent}>{voteAverage}</Text>
    </View>
  );
};

const renderScoreRow = (voteAverage) => {
  return <Text style={styles.textPercent}>{voteAverage}</Text>;
};

export default class MovieRow extends React.PureComponent {
  render() {
    const { numColumns, item, type, isSearch, navigate } = this.props;

    // if (numColumns === 1) {
    //   return (
    //     <TouchableOpacity
    //       onPress={() => navigate('MovieDetails', { id: item.id })}
    //     >
    //       <View style={styles.containerItem}>
    //         <Image
    //           source={getImageApi(item.poster_path)}
    //           style={styles.photo}
    //           width={width * 0.3}
    //         />
    //         <View style={styles.item}>
    //           <View>
    //             <Text numberOfLines={2} style={styles.textTitle}>
    //               {item.title}
    //             </Text>
    //             <View style={[styles.textRow, styles.containerSubTitle]}>
    //               <Text style={styles.textSmall}>
    //                 {convertToDate(item.release_date)}
    //               </Text>
    //               {renderDivider(item.release_date, item.original_language)}
    //               <Text numberOfLines={1} style={styles.textSmall}>
    //                 {convertToUpperCaseFirstLetter(item.original_language)}
    //               </Text>
    //             </View>
    //             <Text numberOfLines={1} style={styles.textSmall}>
    //               {convertGenre(item.genre_ids, type, isSearch)}
    //             </Text>
    //           </View>
    //           <View style={[styles.textRow, styles.containerReview]}>
    //             {renderScoreColumn(item.vote_average)}
    //           </View>
    //         </View>
    //       </View>
    //     </TouchableOpacity>
    //   );
    // }
    return (
      <TouchableOpacity
        style={styles.containerTwoItem}
        onPress={() => navigate("MovieDetails", { id: item.id })}
      >
        <View>
          <Image
            source={getImageApi(item.poster_path)}
            style={styles.photo}
            width={width * 0.25}
            height={width * 0.35}
          />
          <View>
            <Text
              style={{
                color: primary,
                paddingTop: 5,
                paddingLeft: 3,
                fontWeight: "600",
                fontSize: 13,
              }}
            >
              TMDB: {renderScoreRow(item.vote_average)}
            </Text>
          </View>
        </View>
        <Text numberOfLines={2} style={styles.textTwoTitle}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  }
}
