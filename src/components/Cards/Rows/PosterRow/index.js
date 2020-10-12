import React, { useState } from "react";
import { View, Text, Image } from "react-native";

import {
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign
} from "@expo/vector-icons";

import ImagesModal from "../../../modals/ImageModal";
import { TouchableOpacity } from "../../../commons/TouchableOpacity";

import { width } from "../../../commons/metrics";
import { notFound } from "../../../../utils/StaticImages";
import { secondaryTint, white, primary } from "../../../../styles/Colors";

import styles from "./styles";
import { Toast } from "native-base";

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

getTitle = title => {
  if (title === "name") {
    return name;
  } else {
    return title;
  }
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
          size={width * 0.05}
          color="orange"
          style={styles.star}
        />
      ));
};

renderRating = voteAverage => {
  return (
    <Text style={styles.textPercent}>
      {voteAverage}
      <Text style={{ fontWeight: "700", color: "white", fontSize: 13 }}>
        {" "}
        /{" "}
      </Text>
      <Text style={styles.textPercent2}>10</Text>
    </Text>
  );
};

actionPlayVideo = (video, navigate, title) => {
  const { key } = video;

  navigate("WebView", { key, title: title });
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
}) => {
  const [saved, setSaved] = useState(false);

  actionSave = () => {
    if (saved) {
      setSaved({ saved: false });
      Toast.show({
        text: "Removed from watchlist",
        buttonText: "okay",
        duration: 3000,
        style: { backgroundColor: secondaryTint, borderRadius: 10 },
        buttonTextStyle: { color: primary, fontSize: 18, fontWeight: "600" }
      });
    } else {
      setSaved({ saved: true });
      Toast.show({
        text: "Added to watchlist",
        buttonText: "okay",
        duration: 3000,
        style: { backgroundColor: secondaryTint, borderRadius: 10 },
        buttonTextStyle: { color: primary, fontSize: 18, fontWeight: "600" }
      });
    }
  };

  return (
    <View style={styles.containerMainPhoto}>
      <TouchableOpacity
        activeOpacity={images.length ? 0.5 : 1}
        onPress={images.length ? onPress : null}
      >
        <Image
          source={getPosterImageApi(backdropPath)}
          style={styles.mainPhoto}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <View style={{}}>
        <View style={styles.containerBackgroundPhotoInfo}>
          <Text numberOfLines={2} style={styles.photoInfo}>
            {title}
          </Text>
          <View style={styles.photoStar}>
            {convertRatingToStars(voteAverage)}
            {renderRating(voteAverage)}
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            top: 104,
            zIndex: 1000,
            paddingHorizontal: 20,
            justifyContent: "space-between",
            //   // backgroundColor: "red",
            width: "100%"
          }}
        >
          {video && video.site === "YouTube" && (
            <TouchableOpacity
              style={styles.playButtonContainer}
              onPress={() => actionPlayVideo(video, navigate, title)}
            >
              <AntDesign name="playcircleo" size={17} color={"#82c596"} />
              <Text style={[styles.playButtonText, { color: "#82c596" }]}>
                Trailer
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => actionSave()}
            style={styles.saveButtonContainer}
          >
            <MaterialCommunityIcons
              name={saved ? "bookmark-check" : "bookmark-plus"}
              size={17}
              color={primary}
            />
            <Text style={styles.playButtonText}>
              {saved ? `Saved` : `Save`}
            </Text>
          </TouchableOpacity>
        </View>

        {/* {video && video.site === "YouTube" && (
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.playButtonContainer}
              onPress={() => actionPlayVideo(video, navigate, title)}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="ios-play" size={20} color={secondaryTint} />
                <Text style={styles.playButtonText}>Watch Trailer</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => actionSave()}
              style={styles.saveButtonContainer}
            >
              <Ionicons
                name={saved ? "md-checkmark" : "md-add"}
                size={saved ? 30 : 35}
                color={saved ? primary : white}
              />
            </TouchableOpacity>
          </View>
        )} */}
      </View>
      <View
        style={{
          height: width * 0.35,
          width: width * 0.25,
          borderRadius: 8,
          backgroundColor: secondaryTint,
          position: "absolute",
          bottom: 46,
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
};

export default PosterRow;
