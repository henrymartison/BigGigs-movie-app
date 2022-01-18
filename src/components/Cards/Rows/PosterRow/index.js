import React, { useState } from "react";
import { View, Text, Image } from "react-native";

import {
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";

import ImagesModal from "../../../modals/ImageModal";
import { TouchableOpacity } from "../../../commons/TouchableOpacity";

import { width } from "../../../commons/metrics";
import { notFound } from "../../../../utils/StaticImages";
import { secondaryTint, primary, darkBlue } from "../../../../styles/Colors";

import styles from "./styles";

getImageApi = (backdropPath) => {
  return backdropPath
    ? { uri: `https://image.tmdb.org/t/p/original/${backdropPath}` }
    : notFound;
};
getPosterImageApi = (posterPath) => {
  return posterPath
    ? { uri: `https://image.tmdb.org/t/p/original/${posterPath}` }
    : notFound;
};

convertRatingToStars = (voteAverage) => {
  const average = voteAverage > 5 ? Math.round(voteAverage) : voteAverage;
  const length =
    average !== 10 ? parseInt(`${average}`.charAt(0)) - 5 : average - 5;
  return average <= 5
    ? null
    : [...Array(length)].map((e, i) => (
        <FontAwesome
          key={i}
          name="star"
          size={width * 0.04}
          color="orange"
          style={styles.star}
        />
      ));
};

renderRating = (voteAverage) => {
  return (
    <View style={{ alignItems: "center", marginLeft: 5 }}>
      <Text style={{ fontSize: 13, color: "grey" }}>themoviedb.org</Text>
      <Text style={styles.textPercent}>
        {voteAverage}
        <Text style={{ fontWeight: "700", color: "white", fontSize: 13 }}>
          {" "}
          /{" "}
        </Text>
        <Text style={styles.textPercent2}>10</Text>
      </Text>
    </View>
  );
};

getStatus = (status) => {
  const color =
    status === "Returning Series"
      ? "running"
      : status === "Ended"
      ? "ended"
      : "";
  if (status === "Returning Series") {
    return (
      <View style={styles.currentStatus}>
        {/* <View style={styles.statusIndicator} /> */}
        {/* <Text style={styles.statusText}>Status:</Text> */}
        <Text style={[styles.currentStatusText, styles[color]]}>
          Still Airing
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.currentStatus}>
      <View style={styles.statusIndicator} />
      <Text style={styles.statusText}>Status:</Text>
      <Text style={[styles.currentStatusText, styles[color]]}>{status}</Text>
    </View>
  );
};

// getStatus = status => {
//   const colors = ['mediumseagreen', 'red', 'orange']
//   if(status === 'Returning Series'){
//     return 'Running', color=colors[0]
//   } else if(status === 'Ended'){
//     return 'Ended', color=colors[1]
// } else{
//   return 'Running', color=colors[0]
// }}

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
  navigate,
  status,
  type,
}) => {
  const [saved, setSaved] = useState(false);

  actionSave = () => {
    setSaved((prev) => !prev);
  };

  return (
    <View style={styles.containerMainPhoto}>
      <TouchableOpacity
        activeOpacity={images.length ? 0.5 : 1}
        onPress={images.length ? onPress : null}
        style={styles.mainPhoto}
      >
        <Image
          source={getPosterImageApi(backdropPath)}
          style={{ flex: 1, height: null, width: null, borderRadius: 8 }}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <View style={{}}>
        <View style={styles.containerBackgroundPhotoInfo}>
          <Text numberOfLines={1} style={styles.photoInfo}>
            {title}
          </Text>
          <View style={styles.photoStar}>
            {convertRatingToStars(voteAverage)}
            {renderRating(voteAverage)}
          </View>
          {type === "tv" && <View style={{}}>{getStatus(status)}</View>}
        </View>

        <View
          style={[
            styles.optionsRow,
            { marginTop: 20 },
            //  { marginTop: !type && 20 }
          ]}
        >
          {video && video.site === "YouTube" && (
            <TouchableOpacity
              style={[styles.playButtonContainer, { marginRight: 5 }]}
              onPress={() => actionPlayVideo(video, navigate, title)}
            >
              <Feather name="play" size={17} color={"#fff"} />
              <Text style={styles.playButtonText}>Trailer</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => actionSave()}
            style={[
              styles.playButtonContainer,
              { borderColor: primary, marginLeft: 5 },
            ]}
          >
            <MaterialCommunityIcons
              name={saved ? "heart" : "heart-outline"}
              size={17}
              color={saved ? "#d60b0b" : darkBlue}
            />
            <Text style={styles.playButtonText}>
              {saved ? `Saved` : `Save`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.posterPhoto}>
        <Image
          source={getImageApi(posterPath)}
          style={{ flex: 1, borderRadius: 8 }}
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
