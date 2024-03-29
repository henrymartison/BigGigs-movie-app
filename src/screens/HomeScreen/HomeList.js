import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";

import * as Animatable from "react-native-animatable";

import { NotificationCard, TVRow } from "../../components/Cards";
import { TouchableOpacity } from "../../components/commons/TouchableOpacity";

import FilterModal from "../../components/modals/FilterModal";
import MovieListRow from "../../components/Cards/Rows/MovieListRow";
import MovieRow from "../../components/Cards/Rows/MovieRow";

import request from "../../services/api";

import { getItem } from "../../utils/AsyncStorage";
import { darkBlue, primaryTint, white } from "../../styles/Colors";

import styles from "./styles";
import CustomMenuIcon from "../../components/commons/MenuIcon";
import Loader from "../../components/commons/Loader";

class HomeList extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: "Hooli",
      headerTitleStyle: {
        color: white,
        fontFamily: "balooBhaina-regular",
        fontSize: 21,
      },
      headerStyle: {
        backgroundColor: primaryTint,
        borderBottomColor: primaryTint,
      },
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
    filterName: "Trending now🔥",
    results: [],
    page: 1,
    numColumns: 3,
    keyGrid: 1,
    gridActive: false,
  };

  async componentDidMount() {
    try {
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
      keyGrid,
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

      const { page, filterType, hasAdultContent } = this.state;
      const { media_type } = this.props;
      const dateRelease = new Date().toISOString().slice(0, 10);

      const data = await request(`${media_type}/popular`, {
        page,
        "release_date.lte": dateRelease,
        sort_by: filterType,
        with_release_type: "1|2|3|4|5|6|7",
        include_adult: hasAdultContent,
      });

      this.setState(({ isRefresh, results }) => ({
        isLoading: false,
        isRefresh: false,
        isLoadingMore: false,
        isError: false,
        totalPages: data.total_pages,
        results: isRefresh ? data.results : [...results, ...data.results],
      }));
    } catch (err) {
      this.setState({
        isLoading: false,
        isRefresh: false,
        isLoadingMore: false,
        isError: true,
      });
    }
  };

  renderItem = (item, type, isSearch, numColumns, navigate) => (
    <Animatable.View animation="fadeInRight">
      <MovieRow
        item={item}
        type={type}
        isSearch={isSearch}
        numColumns={numColumns}
        route={this.props.detailsRoute}
        navigate={navigate}
        category={this.props.category}
      />
    </Animatable.View>
  );

  renderMovieListHeader = () => {
    const { results, filterName, numColumns } = this.state;
    if (results.length > 0) {
      return (
        <View style={styles.containerMainText}>
          <Text numberOfLines={1} style={styles.textMain} numberOfLines={1}>
            {filterName}
          </Text>
          <TouchableOpacity style={styles.buttonGrid} onPress={this.actionGrid}>
            {numColumns !== 1 ? (
              <MaterialCommunityIcons
                name="format-list-checkbox"
                size={26}
                color={darkBlue}
              />
            ) : (
              <SimpleLineIcons name="grid" size={20} color={darkBlue} />
            )}
          </TouchableOpacity>
        </View>
      );
    }
  };

  renderFooter = () => {
    const { isLoadingMore, totalPages, page, results } = this.state;

    // if (isLoadingMore) return <Loader />;

    if (totalPages !== page && results.length > 0) {
      return (
        <View style={styles.loadingMore}>
          <TouchableOpacity
            style={styles.loadingButton}
            onPress={this.actionLoadMore}
          >
            {isLoadingMore ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.loadingText}>Load more</Text>
            )}
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
        page: 1,
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
        page: page + 1,
      }),
      () => {
        this.requestMoviesList();
      }
    );
  };

  actionGrid = () => {
    this.setState(({ numColumns, keyGrid }) => {
      return { numColumns: numColumns === 1 ? 3 : 1, keyGrid: keyGrid + 1 };
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
      filterType,
      numColumns,
      keyGrid,
    } = this.state;

    return (
      <View style={styles.container}>
        {isLoading && !isRefresh && !isLoadingMore ? (
          <Loader />
        ) : isError ? (
          <NotificationCard
            icon={require("../../assets/images/no-signal.png")}
            action={this.requestMoviesList}
          />
        ) : results.length === 0 ? (
          <NotificationCard
            // icon="thumbs-down"
            textError="No results available."
          />
        ) : (
          <View style={styles.containerList}>
            <MovieListRow
              data={results}
              type="normal"
              isSearch={false}
              keyGrid={keyGrid}
              numColumns={numColumns}
              refreshing={isRefresh}
              onRefresh={this.actionRefresh}
              ListFooterComponent={this.renderFooter}
              navigate={navigate}
              renderItem={this.renderItem}
              ListHeaderComponent={this.renderMovieListHeader}
            />
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

export default withNavigation(HomeList);
