import React, { Component } from "react";
import { View, Text } from "react-native";

import {
  MaterialCommunityIcons,
  SimpleLineIcons,
  Ionicons,
} from "@expo/vector-icons";

import NotificationCard from "../../../../components/Cards/NotificationCard";
import MovieListRow from "../../../../components/Cards/Rows/MovieListRow";
import MovieRow from "../../../../components/Cards/Rows/MovieRow";
import { TouchableOpacity } from "../../../../components/commons/TouchableOpacity";

import request from "../../../../services/api";

import { getItem } from "../../../../utils/AsyncStorage";
import { darkBlue, primaryTint, white } from "../../../../styles/Colors";

import styles from "./styles";
import Loader from "../../../../components/commons/Loader";

export default class SearchResultsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: `Results for "${params.name}"`,
      headerStyle: {
        backgroundColor: primaryTint,
        borderBottomColor: primaryTint,
      },
      headerTitleStyle: { color: white, fontSize: 14, fontWeight: "400" },
      headerLeft: (
        <TouchableOpacity
          style={styles.buttonShare}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="ios-arrow-back" size={27} color={darkBlue} />
        </TouchableOpacity>
      ),
    };
  };

  state = {
    isLoading: false,
    isLoadingMore: false,
    isError: false,
    hasAdultContent: false,
    results: [],
    page: 1,
    numColumns: 3,
    keyGrid: 1,
    id: this.props.navigation.state.params.id,
    name: this.props.navigation.state.params.name,
    typeRequest: this.props.navigation.state.params.typeRequest,
    category: this.props.navigation.state.params.category,
  };

  async componentDidMount() {
    try {
      const hasAdultContent = await getItem("@ConfigKey", "hasAdultContent");

      this.setState({ hasAdultContent }, () => {
        this.requestMoviesList();
      });
    } catch (error) {
      this.requestMoviesList();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { results, isLoading, isLoadingMore, isError, keyGrid } = this.state;

    if (
      results !== nextState.results ||
      isLoading !== nextState.isLoading ||
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

      const { page, name, id, typeRequest, hasAdultContent } = this.state;
      const dateRelease = new Date().toISOString().slice(0, 10);
      const query =
        typeRequest === "search"
          ? { query: `${name.trim()}` }
          : { with_genres: `${id}` };

      const data = await request(`${typeRequest}/multi,`, {
        page,
        "release_date.lte": dateRelease,
        with_release_type: "1|2|3|4|5|6|7",
        include_adult: hasAdultContent,
        ...{ ...query },
      });

      console.log("raw data ====>", data);

      this.setState(({ results }) => ({
        isLoading: false,
        isLoadingMore: false,
        isError: false,
        totalPages: data.total_pages,
        results: [...results, ...data.results],
      }));

      console.log("results ====>", results);
    } catch (err) {
      this.setState({
        isLoading: false,
        isLoadingMore: false,
        isError: true,
      });
    }
  };

  renderItem = (item, type, isSearch, numColumns, navigate) => (
    <View>
      <MovieRow
        item={item}
        type={type}
        isSearch={isSearch}
        numColumns={numColumns}
        navigate={navigate}
      />
    </View>
  );

  renderHeader = () => {
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

    if (isLoadingMore) return <Loader />;

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

  render() {
    const { navigate } = this.props.navigation;
    const {
      name,
      typeRequest,
      isLoading,
      isLoadingMore,
      isError,
      results,
      numColumns,
      keyGrid,
    } = this.state;

    return (
      <View style={styles.container}>
        {isLoading && !isLoadingMore ? (
          <Loader />
        ) : isError ? (
          <NotificationCard
            icon={require("../../../../assets/images/no-signal.png")}
            textError="Please check your network and try again"
            action={this.requestMoviesList}
          />
        ) : results.length === 0 ? (
          <NotificationCard
            icon={require("../../../../assets/images/spy.png")}
            textError={`We couldn't find anything for "${name}". Try something else.`}
          />
        ) : (
          <View style={styles.containerList}>
            <MovieListRow
              data={results}
              type={name}
              isSearch={typeRequest === "search"}
              keyGrid={keyGrid}
              numColumns={numColumns}
              refreshing={null}
              onRefresh={null}
              ListFooterComponent={this.renderFooter}
              navigate={navigate}
              renderItem={this.renderItem}
              ListHeaderComponent={this.renderHeader}
            />
          </View>
        )}
      </View>
    );
  }
}
