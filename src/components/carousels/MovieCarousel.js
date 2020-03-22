import React from "react";
import Carousel from "react-native-snap-carousel";
import { width } from "../../utils/device";
import ImageSlide from "../commons/ImageSlide";

// data
const slidesData = [
  { image: "https://image.tmdb.org/t/p/w300/7xizDTz4Yj4IYm2ud4f6EfEXe5H.jpg" },
  { image: "https://image.tmdb.org/t/p/w500/db32LaOibwEliAmSL2jjDF6oDdj.jpg" },
  { image: "https://image.tmdb.org/t/p/w500/eZ9wYTk9Gy2zYEv8rhRG3IoPuXG.jpg" },
  { image: "https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg" }
];

class SlideShow extends React.Component {
  render() {
    const itemWidth = width - 52;

    return (
      <Carousel
        ref={c => {
          this.carousel = c;
        }}
        autoplay
        autoplayInterval={5000}
        data={slidesData}
        loop
        renderItem={({ item }) => (
          <ImageSlide source={{ uri: item.image }} width={itemWidth} />
        )}
        sliderWidth={width}
        itemWidth={itemWidth}
      />
    );
  }
}

export default SlideShow;
