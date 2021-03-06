import React, { Component } from "react";
import { Asset } from "expo";
import { View, ScrollView, Text } from "react-native";

import { Feather } from "@expo/vector-icons";
// import { Assets as StackAssets } from 'react-navigation-stack';

// import Spinner from '../../components/common/Spinner';
import NotificationCard from "../../../components/Cards/NotificationCard";
import FilterModal from "../../../components/modals/FilterModal";
import MovieListCol from "../../../components/Cards/Rows/MovieListCol";
import MovieCol from "../../../components/Cards/Rows/MovieCol";
import { TouchableOpacity } from "../../../components/commons/TouchableOpacity";

import request from "../../../services/api";

import { getItem } from "../../../utils/AsyncStorage";
import { darkBlue, primaryTint, white } from "../../../styles/Colors";

import styles from "./styles";
import CustomMenuIcon from "../../../components/commons/MenuIcon";
import Loader from "../../../components/commons/Loader";
import SlideShow from "../../../components/carousels/MovieCarousel";

export default class MovieListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: "Hooli",
      headerTitleStyle: {
        color: white,
        fontFamily: "balooBhaina-regular",
        fontSize: 21
      },
      headerStyle: {
        backgroundColor: primaryTint,
        borderBottomColor: primaryTint
      },
      // headerRight: (
      //   <TouchableOpacity
      //     style={{ paddingRight: 10 }}
      //     //   onPress={params.actionFilter}
      //   >
      //     <Feather name="sliders" size={23} color={darkBlue} />
      //   </TouchableOpacity>
      // ),
      headerLeft: (
        <CustomMenuIcon
          menutext="Menu"
          menustyle={{
            marginRight: 16,
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingLeft: 10
          }}
          textStyle={{
            color: "white"
          }}
          option1Click={() => {
            navigation.navigate("Search");
          }}
          option2Click={() => {
            navigation.navigate("Watchlist");
          }}
          option3Click={() => null}
          option4Click={() => null}
        />
      )
    };
  };

  state = {
    isVisible: false,
    isLoading: false,
    isRefresh: false,
    isLoadingMore: false,
    isError: false,
    hasAdultContent: false,
    filterType: "popularity.desc",
    // filterName: '⭐ Top Rated ️',
    results: [],
    page: 1,
    numColumns: 1,
    keyGrid: 1,
    gridActive: false
  };

  async componentDidMount() {
    try {
      //   Asset.loadAsync(StackAssets);
      this.props.navigation.setParams({ actionFilter: this.actionFilter });

      const hasAdultContent = await getItem("@ConfigKey", "hasAdultContent");

      this.setState({ hasAdultContent }, () => {
        this.requestMoviesList();
      });
    } catch (error) {
      this.requestMoviesList();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      results,
      isVisible,
      isLoading,
      isRefresh,
      isLoadingMore,
      isError,
      keyGrid
    } = this.state;

    if (
      results !== nextState.results ||
      isVisible !== nextState.isVisible ||
      isLoading !== nextState.isLoading ||
      isRefresh !== nextState.isRefresh ||
      isLoadingMore !== nextState.isLoadingMore ||
      isError !== nextState.isError ||
      keyGrid !== nextState.keyGrid
    ) {
      return true;
    }
    return false;
  }

  requestMoviesList = async () => {
    try {
      this.setState({ isLoading: true });

      const { page, filterType, hasAdultContent, filterName } = this.state;
      const dateRelease = new Date().toISOString().slice(0, 10);
      const filterTitles = [
        "latest",
        "now_playing",
        "popular",
        "top_rated",
        "upcoming"
      ];

      const filter = filterTitles.forEach(title => {
        console.log(title);
      });

      const data = await request(`movie/${filterTitles[3]}`, {
        page,
        "release_date.lte": dateRelease,
        sort_by: filterType,
        with_release_type: "1|2|3|4|5|6|7",
        include_adult: hasAdultContent
      });

      // console.log(data);

      this.setState(({ isRefresh, results }) => ({
        isLoading: false,
        isRefresh: false,
        isLoadingMore: false,
        isError: false,
        totalPages: data.total_pages,
        results: isRefresh ? data.results : [...results, ...data.results]
      }));
    } catch (err) {
      this.setState({
        isLoading: false,
        isRefresh: false,
        isLoadingMore: false,
        isError: true
      });
      // console.log(err);
    }
  };

  renderItem = (item, type, isSearch, numColumns, navigate) => (
    <MovieCol
      item={item}
      type={type}
      isSearch={isSearch}
      numColumns={numColumns}
      navigate={navigate}
    />
  );

  renderFooter = () => {
    const { isLoadingMore, totalPages, page, results } = this.state;

    if (isLoadingMore) return <Spinner size="small" />;

    if (totalPages !== page && results.length > 0) {
      return (
        <View style={styles.loadingMore}>
          <TouchableOpacity
            style={styles.loadingButton}
            onPress={this.actionLoadMore}
          >
            <Text style={styles.loadingText}>Load more</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (results.length > 0) return <View style={styles.loadingMore} />;

    return null;
  };

  actionRefresh = () => {
    this.setState(
      {
        isRefresh: true,
        page: 1
      },
      () => {
        this.requestMoviesList();
      }
    );
  };

  actionLoadMore = () => {
    this.setState(
      ({ page }) => ({
        isLoadingMore: true,
        page: page + 1
      }),
      () => {
        this.requestMoviesList();
      }
    );
  };

  actionGrid = () => {
    this.setState(({ numColumns, keyGrid }) => {
      return { numColumns: numColumns === 1 ? 2 : 1, keyGrid: keyGrid + 1 };
    });
  };

  actionFilter = () => {
    this.setState(({ isVisible }) => {
      return { isVisible: !isVisible };
    });
  };

  actionSwitchMovie = (filterType, filterName, isVisible) => {
    if (this.state.filterType !== filterType) {
      this.setState(
        { filterType, filterName, isVisible, page: 1, results: [] },
        () => {
          this.requestMoviesList();
        }
      );
    } else {
      this.setState({ isVisible });
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    const {
      isLoading,
      isRefresh,
      isLoadingMore,
      isError,
      results,
      filterName,
      isVisible,
      filterType
    } = this.state;

    return (
      <View style={styles.container}>
        {isLoading && !isRefresh && !isLoadingMore ? (
          <Loader />
        ) : isError ? (
          <NotificationCard
            icon={require("../../../assets/images/no-signal.png")}
            action={this.requestMoviesList}
          />
        ) : results.length === 0 ? (
          <NotificationCard textError="No results available." />
        ) : (
          <View style={styles.containerList}>
            {/* {results.length > 0 && (
              <View style={styles.containerMainText}>
                <Text style={styles.textMain} numberOfLines={1}>
                  {filterName}
                </Text>
              </View>
            )} */}
            <ScrollView>
              <SlideShow />
              <MovieListCol
                data={results}
                type="normal"
                isSearch={false}
                refreshing={isRefresh}
                onRefresh={this.actionRefresh}
                navigate={navigate}
                renderItem={this.renderItem}
                filterName="️⭐ Top Rated"
              />
            </ScrollView>
          </View>
        )}
        <FilterModal
          isVisible={isVisible}
          filterType={filterType}
          filterName={filterName}
          actionFilter={this.actionFilter}
          actionSwitchMovie={this.actionSwitchMovie}
          style={styles.bottomModal}
        />
      </View>
    );
  }
}
