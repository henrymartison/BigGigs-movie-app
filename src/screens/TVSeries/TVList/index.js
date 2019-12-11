import React, { Component } from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";

import * as Animatable from "react-native-animatable";

import NotificationCard from "../../../components/Cards/NotificationCard";
import FilterModal from "../../../components/modals/FilterModal";
import TVListRow from "../../../components/Cards/Rows/TVListRow";
import TVRow from "../../../components/Cards/Rows/TVRow";
import { TouchableOpacity } from "../../../components/commons/TouchableOpacity";

import request from "../../../services/api";

import { getItem } from "../../../utils/AsyncStorage";
import { darkBlue, primaryTint, white } from "../../../styles/Colors";

import styles from "./styles";
import CustomMenuIcon from "../../../components/commons/MenuIcon";
import Loader from "../../../components/commons/Loader";

class TVList extends Component {
  state = {
    isVisible: false,
    isLoading: false,
    isRefresh: false,
    isLoadingMore: false,
    isError: false,
    hasAdultContent: false,
    filterType: "popularity.desc",
    filterName: "Most Popular",
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

      const { page, filterType, hasAdultContent } = this.state;
      const dateRelease = new Date().toISOString().slice(0, 10);

      const data = await request("tv/on_the_air", {
        page,
        "release_date.lte": dateRelease,
        sort_by: filterType,
        with_release_type: "1|2|3|4|5|6|7",
        include_adult: hasAdultContent
      });

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
    }
  };

  renderItem = (item, type, isSearch, numColumns, navigate) => (
    <Animatable.View animation="fadeInRight">
      <TVRow
        item={item}
        type={type}
        isSearch={isSearch}
        numColumns={numColumns}
        navigate={navigate}
      />
    </Animatable.View>
  );

  renderFooter = () => {
    const { isLoadingMore, totalPages, page, results } = this.state;

    if (totalPages !== page && results.length > 0) {
      return (
        <View style={styles.loadingMore}>
          <TouchableOpacity
            style={styles.loadingButton}
            onPress={this.actionLoadMore}
          >
            {isLoadingMore ? (
              <Loader />
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
      filterType,
      numColumns,
      keyGrid
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
            {results.length > 0 && (
              <View style={styles.containerMainText}>
                <Text style={styles.textMain} numberOfLines={1}>
                  {filterName}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.buttonGrid,
                    numColumns === 2 && styles.buttonGridActive
                  ]}
                  onPress={this.actionGrid}
                >
                  {numColumns === 2 ? (
                    <Feather name="list" size={22} color={darkBlue} />
                  ) : (
                    <Feather name="grid" size={22} color={darkBlue} />
                  )}
                </TouchableOpacity>
              </View>
            )}
            <TVListRow
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

export default withNavigation(TVList);
