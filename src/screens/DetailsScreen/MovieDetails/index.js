import React, { Component } from "react";
import { ScrollView, View, Text } from "react-native";

import { Toast } from "native-base";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import ReadMore from "react-native-read-more-text";

import { Alert } from "../../../components/commons/Alert";
import { Share } from "../../../components/commons/Share";
import NotificationCard from "../../../components/Cards/NotificationCard";
import PosterRow from "../../../components/Cards/Rows/PosterRow";
import PersonModal from "../../../components/modals/PersonModal";
import PersonListRow from "../../../components/Cards/Rows/PersonListRow";
import PersonRow from "../../../components/Cards/Rows/PersonRow";
import SectionRow from "../../../components/Cards/Rows/SectionRow";
import MainInfoRow from "../../../components/Cards/Rows/MainInfoRow";
import { TouchableOpacity } from "../../../components/commons/TouchableOpacity";

import request from "../../../services/api";

import language from "../../../assets/language/iso.json";
import {
  darkBlue,
  primaryTint,
  white,
  secondaryTint,
  primary,
} from "../../../styles/Colors";

import styles from "./styles";
import Loader from "../../../components/commons/Loader";
import SimilarMovieRow from "../../../components/Cards/Rows/SimilarMovieRow";

const uninformed = "Uninformed";

const renderTruncatedFooter = (handlePress) => (
  <TouchableOpacity onPress={handlePress}>
    <Text style={styles.readMore}>Read more</Text>
  </TouchableOpacity>
);

const renderRevealedFooter = (handlePress) => (
  <TouchableOpacity onPress={handlePress}>
    <Text style={styles.readMore}>Read less</Text>
  </TouchableOpacity>
);

export default class MovieDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: null,
      headerStyle: {
        backgroundColor: primaryTint,
        borderBottomColor: primaryTint,
      },
      headerTitleStyle: { color: white },
      headerRight: (
        <TouchableOpacity
          style={styles.buttonShare}
          onPress={params.actionShare}
        >
          <EvilIcons name="share-apple" size={33} color={darkBlue} />
        </TouchableOpacity>
      ),
      headerLeft: (
        <TouchableOpacity
          style={{ paddingLeft: 10 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="ios-arrow-back" size={27} color={darkBlue} />
        </TouchableOpacity>
      ),
    };
  };

  state = {
    isLoading: true,
    isError: false,
    isVisible: false,
    showImage: false,
    creditId: null,
    results: [],
    isRefresh: false,
  };

  componentDidMount() {
    this.props.navigation.setParams({
      actionShare: this.actionShare,
    });
    this.requestMoviesInfo();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.isVisible !== nextState.isVisible ||
      this.state.showImage !== nextState.showImage ||
      this.state.isLoading !== nextState.isLoading ||
      this.state.isError !== nextState.isError
    ) {
      return true;
    }
    return false;
  }

  requestMoviesInfo = async () => {
    try {
      this.setState({ isLoading: true });

      const { id } = this.props.navigation.state.params;
      // console.log(">>>>>>>>>", id);

      const data = await request(`movie/${id}`, {
        include_image_language: "en,null",
        append_to_response: "credits,videos,images",
      });

      this.setState({
        isLoading: false,
        isError: false,
        id: this.props.navigation.state.params,
        backdropPath: data.backdrop_path || "",
        posterPath: data.poster_path || "",
        title: data.title || "",
        voteAverage: data.vote_average || 0,
        video: data.videos.results[0] || [],
        overview: data.overview || uninformed,
        cast: this.sliceArrayLength(data.credits.cast, 15),
        crew: this.sliceArrayLength(data.credits.crew, 15),
        productionCompanies: this.sliceArrayLength(
          data.production_companies,
          10
        ),
        images: this.formatImageUrl(data.images.backdrops),
        infosDetail: this.getInfosDetail(data),
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        isError: true,
      });
    }
  };

  getInfosDetail = ({
    runtime,
    genres,
    original_language,
    release_date,
    budget,
    revenue,
    adult,
  }) => {
    return {
      Duration: this.convertMinsToHrsMins(runtime || 0),
      Genre: this.convertToGenre(this.sliceArrayLength(genres, 2) || ""),
      Language: this.convertToUpperCaseFirstLetter(
        language[original_language] || ""
      ),
      Release: this.convertToDate(release_date || ""),
      Budget: this.convertToDolar(budget || 0),
      Revenue: this.convertToDolar(revenue || 0),
      Adult: this.convertAdult(adult || ""),
    };
  };

  formatImageUrl = (images) => {
    return this.sliceArrayLength(images, 15).map((item) => {
      return { url: `https://image.tmdb.org/t/p/original/${item.file_path}` };
    });
  };

  sliceArrayLength = (arr, num) => {
    return arr.length > num ? arr.slice(0, num) : arr;
  };

  convertToDolar = (value) => {
    return (
      `$${value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}` ||
      uninformed
    );
  };

  convertAdult = (adult) => (adult === false ? "Yes" : "No" || uninformed);

  convertMinsToHrsMins = (runtime) => {
    let h = Math.floor(runtime / 60);
    let m = runtime % 60;
    h = h < 10 ? `0${h}` : h;
    m = m < 10 ? `0${m}` : m;
    return h && m ? `${h}h ${m}m` : uninformed;
  };

  convertToGenre = (genre) => {
    return genre.length > 0
      ? genre.length > 1
        ? `${genre[0].name}, ${genre[1].name}`
        : genre[0].name
      : uninformed;
  };

  convertToUpperCaseFirstLetter = (originalLanguage) => {
    return originalLanguage.charAt(0).toUpperCase() + originalLanguage.slice(1);
  };

  convertToDate = (releaseDate) => {
    const date = new Date(releaseDate);
    return (
      `${date.getDate() + 1}/${date.getMonth() + 1}/${date.getFullYear()}` ||
      uninformed
    );
  };

  actionPerson = (creditId = "") => {
    this.setState(({ isVisible }) => {
      return { creditId, isVisible: !isVisible };
    });
  };

  actionImage = () => {
    this.setState(({ showImage }) => {
      return { showImage: !showImage };
    });
  };

  actionSave = () => {
    Toast.show({
      text: "Added to watchlist",
      buttonText: "undo",
      duration: 5000,
      style: { backgroundColor: secondaryTint, borderRadius: 10 },
      buttonTextStyle: { color: primary, fontSize: 18, fontWeight: "600" },
    });
    this.setState({ saved: true });
  };
  actionShare = () => {
    const { isError, title, id } = this.state;

    if (isError) {
      Alert({
        title: "Attention",
        description: "Something wrong has happened, please try again later.",
      });
    } else {
      Share({
        message: `${title}, know everything about this movie 🎥`,
        url: `https://www.themoviedb.org/movie/${id}`,
        title: "AmoCinema",
        dialogTitle: `${title}, know everything about this movie 🎥`,
      });
    }
  };

  renderItem = (item, type, actionTeamDetail) => (
    <PersonRow item={item} type={type} actionTeamDetail={actionTeamDetail} />
  );

  renderListEmpty = () => (
    <View>
      <Text style={styles.subTitleInfo}>Uninformed</Text>
    </View>
  );

  render() {
    const {
      isLoading,
      isError,
      backdropPath,
      posterPath,
      voteAverage,
      video,
      title,
      infosDetail,
      overview,
      cast,
      crew,
      productionCompanies,
      images,
      creditId,
      isVisible,
      showImage,
      id,
    } = this.state;

    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <NotificationCard
            icon={require("../../../assets/images/no-signal.png")}
            action={this.requestMoviesInfo}
            textError="Check your network and try again"
          />
        ) : (
          <ScrollView>
            <PosterRow
              title={title}
              backdropPath={backdropPath}
              posterPath={posterPath}
              voteAverage={voteAverage}
              images={images}
              video={video}
              navigate={navigate}
              showImage={showImage}
              onPress={this.actionImage}
            />
            <View style={styles.containerMovieInfo}>
              {/* <OptionsRow data={infosDetail} /> */}
              <MainInfoRow data={infosDetail} />
              <SectionRow title="Synopsis">
                <ReadMore
                  numberOfLines={3}
                  renderTruncatedFooter={renderTruncatedFooter}
                  renderRevealedFooter={renderRevealedFooter}
                >
                  <Text style={styles.subTitleInfo}>{overview}</Text>
                </ReadMore>
              </SectionRow>
              <SectionRow title="Main cast">
                <PersonListRow
                  data={cast}
                  type="character"
                  keyItem="creditId"
                  ListEmptyComponent={this.renderListEmpty}
                  actionTeamDetail={this.actionPerson}
                  renderItem={this.renderItem}
                />
              </SectionRow>
              <SectionRow title="Main Crew">
                <PersonListRow
                  data={crew}
                  type="job"
                  keyItem="creditId"
                  ListEmptyComponent={this.renderListEmpty}
                  actionTeamDetail={this.actionPerson}
                  renderItem={this.renderItem}
                />
              </SectionRow>
              <SectionRow title="Producer" isLast>
                <PersonListRow
                  data={productionCompanies}
                  type="production"
                  keyItem="id"
                  ListEmptyComponent={this.renderListEmpty}
                  actionTeamDetail={this.actionPerson}
                  renderItem={this.renderItem}
                />
              </SectionRow>
            </View>
            <SimilarMovieRow id={id} />
          </ScrollView>
        )}
        <PersonModal
          isVisible={isVisible}
          creditId={creditId}
          actionClose={this.actionPerson}
          style={styles.bottomModal}
        />
      </View>
    );
  }
}
