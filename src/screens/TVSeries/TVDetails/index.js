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
import TVInfoRow from "../../../components/Cards/Rows/TVInfoRow";
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
import TVSeasons from "../../../components/Cards/Rows/TVSeasons";
import NextEpisode from "../../../components/Cards/Rows/TVNextEp";
import SeasonDetails from "../Seasons/Details";

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

const nextEpRelease = ({ air_date, episode_number, season_number }) => {};

export default class TVDetails extends Component {
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
    this.requestMoviesList();
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

  requestMoviesList = async () => {
    // try {
    //   this.setState({ isLoading: true });
    //   const data = await request("movie/16/similar");
    //   console.log(data);
    //   this.setState(({ isRefresh, results }) => ({
    //     isLoading: false,
    //     isRefresh: false,
    //     totalPages: data.total_pages,
    //     results: isRefresh ? data.results : [...results, ...data.results]
    //   }));
    // } catch (err) {
    //   this.setState({
    //     isLoading: false,
    //     isError: true
    //   });
    // }
  };

  requestMoviesInfo = async () => {
    try {
      this.setState({ isLoading: true });

      const { id } = this.props.navigation.state.params;

      const data = await request(`tv/${id}`, {
        include_image_language: "en,null",
        append_to_response: "credits,videos,images",
      });
      console.log(data.seasons);
      const nextEpToAir =
        data.next_episode_to_air === null ? "null" : data.next_episode_to_air;
      const epData = await request(
        `tv/${id}/season/${data.seasons.season_number}`
      );
      // console.log(epData);

      this.setState({
        isLoading: false,
        isError: false,
        id: this.props.navigation.state.params,
        backdropPath: data.backdrop_path || "",
        posterPath: data.poster_path || "",
        title: data.name || "",
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
        seasonData: data.seasons,
        epData: epData.episodes,
        numberOfSeasons: data.number_of_seasons || "",
        status: data.status || "",
        season_number: nextEpToAir.season_number,
        episode_number: nextEpToAir.episode_number,
        air_date: nextEpToAir.air_date,
        nextEpToAir: nextEpToAir,
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        isError: true,
      });
      console.log(err);
    }
  };

  getInfosDetail = ({
    episode_run_time,
    genres,
    original_language,
    first_air_date,
    networks,
  }) => {
    return {
      YEAR: this.convertToDate(first_air_date || ""),
      NETWORK: this.convertToNetwork(this.sliceArrayLength(networks, 2) || ""),
      GENRE: this.convertToGenre(this.sliceArrayLength(genres, 1) || ""),
      LANGUAGE: this.convertToUpperCaseFirstLetter(
        language[original_language] || ""
      ),
      RUNTIME: this.convertMinsToHrsMins(
        this.sliceArrayLength(episode_run_time, 1) || 0
      ),
    };
  };

  getSeasonData = ({ numberOfSeasons }) => {
    return {
      Season: this.getSeasonNumber(numberOfSeasons),
    };
  };

  getSeasonNumber = (numberOfSeasons) => {
    for (let i = 1; i <= numberOfSeasons; i++) {
      return i;
    }
    return;
  };

  formatImageUrl = (images) => {
    return this.sliceArrayLength(images, 15).map((item) => {
      return { url: `https://image.tmdb.org/t/p/original/${item.file_path}` };
    });
  };

  sliceArrayLength = (arr, num) => {
    return arr.length > num ? arr.slice(0, num) : arr;
  };

  convertMinsToHrsMins = (episode_run_time) => {
    let m = episode_run_time;
    m = m < 10 ? `0${m}` : m;
    return `${m} min` || uninformed;
  };

  convertToGenre = (genre) => {
    return genre.length > 0
      ? genre.length > 1
        ? `${genre[0].name}, ${genre[1].name}`
        : genre[0].name
      : uninformed;
  };

  convertToNetwork = (network) => {
    return network.length > 0
      ? network.length > 1
        ? `${network[0].name}, ${network[1].name}`
        : network[0].name
      : uninformed;
  };

  convertToUpperCaseFirstLetter = (originalLanguage) => {
    return originalLanguage.charAt(0).toUpperCase() + originalLanguage.slice(1);
  };

  convertToDate = (date) => new Date(date).getFullYear() || "";

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
      seasonData,
      epData,
      numberOfSeasons,
      overview,
      cast,
      crew,
      productionCompanies,
      images,
      creditId,
      isVisible,
      showImage,
      id,
      status,
      season_number,
      air_date,
      episode_number,
      nextEpToAir,
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
              status={status}
              type="tv"
            />
            <View style={styles.containerMovieInfo}>
              {nextEpToAir !== "null" ? (
                <NextEpisode
                  season_number={season_number}
                  episode_number={episode_number}
                  air_date={air_date}
                />
              ) : null}
              <TVInfoRow data={infosDetail} />
              <SectionRow title="Synopsis">
                <ReadMore
                  numberOfLines={3}
                  renderTruncatedFooter={renderTruncatedFooter}
                  renderRevealedFooter={renderRevealedFooter}
                >
                  <Text style={styles.subTitleInfo}>{overview}</Text>
                </ReadMore>
              </SectionRow>
              <TVSeasons
                data={seasonData}
                numberOfSeasons={numberOfSeasons}
                onPress={() =>
                  navigate("SeasonDetails", {
                    // title: seasonData.name || "Hello",
                    id: "60625",
                    season_number: "1",
                  })
                }
              />
              {/* <SeasonDetails data={epData} /> */}
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
            <SimilarMovieRow id={id} type="tv" route="TVDetails" />
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
