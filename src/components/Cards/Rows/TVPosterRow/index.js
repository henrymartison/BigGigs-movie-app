import React, { useState } from "react";
import { View, Text, Image } from "react-native";

import { FontAwesome, Feather, Ionicons } from "@expo/vector-icons";

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
    <View style={{ alignItems: "center", marginLeft: 10 }}>
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

getStatus = status => {
  const color =
    status === "Returning Series"
      ? "running"
      : status === "Ended"
      ? "ended"
      : "";
  if (status === "Returning Series") {
    return (
      <View style={styles.currentStatus}>
        <View style={styles.statusIndicator} />
        <Text style={styles.statusText}>Status:</Text>
        <Text style={[styles.currentStatusText, styles[color]]}>Running</Text>
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

const TVPosterRow = ({
  title,
  backdropPath,
  posterPath,
  voteAverage,
  images,
  video,
  showImage,
  onPress,
  navigate,
  status
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
      <View style={styles.containerMainPhotoInfo}>
        <View style={styles.containerBackgroundPhotoInfo}>
          <Text numberOfLines={1} style={styles.photoInfo}>
            {title}
          </Text>
          <View style={styles.photoStar}>
            {convertRatingToStars(voteAverage)}
            {renderRating(voteAverage)}
          </View>
        </View>
        <View style={{}}>
          {getStatus(status)}
          <TouchableOpacity
            onPress={() => actionSave()}
            style={styles.saveButtonContainer}
          >
            <Ionicons
              name={saved ? "md-checkmark" : "md-add"}
              size={saved ? 25 : 30}
              color={saved ? primary : white}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          height: width * 0.35,
          width: width * 0.25,
          borderRadius: 8,
          backgroundColor: secondaryTint,
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
};

export default TVPosterRow;
