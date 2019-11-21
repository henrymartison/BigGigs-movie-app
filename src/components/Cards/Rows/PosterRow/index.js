import React from "react";
import { View, Text, Image } from "react-native";

import { FontAwesome, Feather, Ionicons } from "@expo/vector-icons";

import ImagesModal from "../../../modals/ImageModal";
import { TouchableOpacity } from "../../../commons/TouchableOpacity";

import { width } from "../../../commons/metrics";
import { notFound } from "../../../../utils/StaticImages";
import {
  white,
  pink,
  secondaryTint,
  primaryTint
} from "../../../../styles/Colors";

import styles from "./styles";

getImageApi = backdropPath => {
  return backdropPath
    ? { uri: `https://image.tmdb.org/t/p/w500/${backdropPath}` }
    : notFound;
};
getPosterImageApi = posterPath => {
  return posterPath
    ? { uri: `https://image.tmdb.org/t/p/w500/${posterPath}` }
    : notFound;
};

convertRatingToStars = voteAverage => {
  const average = voteAverage > 5 ? Math.round(voteAverage) : voteAverage;
  const length =
    average !== 10 ? parseInt(`${average}`.charAt(0)) - 5 : average - 5;
  return average <= 5
    ? null
    : [...Array(length)].map((e, i) => (
        <FontAwesome
          key={i}
          name="star"
          size={width * 0.06}
          color={white}
          style={styles.star}
        />
      ));
};

actionPlayVideo = (video, navigate) => {
  const { key } = video;

  navigate("WebView", { key });
};

const PosterRow = ({
  title,
  backdropPath,
  posterPath,
  voteAverage,
  images,
  video,
  showImage,
  onPress,
  navigate
}) => (
  <View style={styles.containerMainPhoto}>
    <TouchableOpacity
      // style={styles.containerMainPhotoInfo}
      activeOpacity={images.length ? 0.5 : 1}
      onPress={images.length ? onPress : null}
    >
      <Image
        source={getPosterImageApi(backdropPath)}
        style={styles.mainPhoto}
        resizeMode="cover"
      />
    </TouchableOpacity>
    {video && video.site === "YouTube" && (
      <View style={{ alignItems: "center" }}>
        {/* <TouchableOpacity
          style={styles.play}
          onPress={() => actionPlayVideo(video, navigate)}
        >
          <FontAwesome
            name="play"
            size={width * 0.07}
            color={white}
            style={styles.buttonPlay}
          />
        </TouchableOpacity> */}
      </View>
    )}
    <View style={styles.containerMainPhotoInfo}>
      <View style={styles.containerBackgroundPhotoInfo}>
        <Text numberOfLines={1} style={styles.photoInfo}>
          {title}
        </Text>
        <View style={styles.photoStar}>
          {convertRatingToStars(voteAverage)}
        </View>
      </View>
      {video && video.site === "YouTube" && (
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.playButtonContainer}
            onPress={() => actionPlayVideo(video, navigate)}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather name="play" size={20} color={secondaryTint} />
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 17,
                  color: secondaryTint
                }}
              >
                Watch Trailer
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
    <View
      style={{
        height: width * 0.35,
        width: width * 0.25,
        borderRadius: 8,
        backgroundColor: secondaryTint,
        // marginLeft: 20,
        // marginTop: 200,
        position: "absolute",
        bottom: -40,
        left: 40
      }}
    >
      <Image
        source={getImageApi(posterPath)}
        style={{ flex: 1, borderRadius: 8 }}
        // width={width * 0.33}
      />
    </View>

    {images.length ? (
      <ImagesModal
        showImage={showImage}
        images={images}
        actionClose={onPress}
      />
    ) : null}
  </View>
);

export default PosterRow;
