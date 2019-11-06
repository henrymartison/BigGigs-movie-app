import React from 'react';
import { View, Text, Image } from 'react-native';

import { FontAwesome, Feather } from '@expo/vector-icons';

// import ImagesModal from '../../../modals/ImagesModal';
import { TouchableOpacity } from '../../../commons/TouchableOpacity';
import { width } from '../../../commons/metrics';

import { notFound } from '../../../../utils/StaticImages'
import { white, darkBlue } from '../../../../styles/Colors';

import styles from './styles';

getImageApi = backdropPath => {
  return backdropPath
    ? { uri: `https://image.tmdb.org/t/p/w500/${backdropPath}` }
    : notFound;
};

getPosterPathApi = posterPath => {
  return posterPath
    ? { uri: `https://image.tmdb.org/t/p/w500/${posterPath}` }
    : notFound;
};

// convertRatingToStars = voteAverage => {
//   const average = voteAverage > 5 ? Math.round(voteAverage) : voteAverage;
//   const length =
//     average !== 10 ? parseInt(`${average}`.charAt(0)) - 5 : average - 5;
//   return average <= 5
//     ? null
//     : 
//       [...Array(length)].map((e, i) => (
//         <FontAwesome
//           key={i}
//           name="star"
//           size={width * 0.06}
//           color={white}
//           style={styles.star}
//         />
//       ));
// };

// actionPlayVideo = (video, navigate) => {
//   const { key } = video;

//   navigate('WebView', { key });
// };

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
    <Image
      source={getImageApi(backdropPath)}
      style={styles.mainPhoto}
      resizeMode="cover"
    />
    <TouchableOpacity style={styles.addToFavButton}>
        <Feather name='plus-circle' size={30} color={darkBlue} />
    </TouchableOpacity>
    {/* {video && video.site === 'YouTube' && (
      <TouchableOpacity
        style={styles.play}
        // onPress={() => actionPlayVideo(video, navigate)}
      >
        <Image
            source={getPosterPathApi(posterPath)}
            style={styles.subPhoto}
            resizeMode="cover"
        />
      </TouchableOpacity>
    )} */}
    <TouchableOpacity
      style={styles.containerMainPhotoInfo}
      activeOpacity={images.length ? 0.5 : 1}
    //   onPress={images.length ? onPress : null}
    >
      <View style={styles.containerBackgroundPhotoInfo}>
        <Text numberOfLines={2} style={styles.photoInfo}>
          {title}
        </Text>
        {/* <View style={styles.photoStar}>
          {convertRatingToStars(voteAverage)}
        </View> */}
      </View>
    </TouchableOpacity>
    {/* {images.length ? (
      <ImagesModal
        showImage={showImage}
        images={images}
        actionClose={onPress}
      />
    ) : null} */}
  </View>
);

export default PosterRow;