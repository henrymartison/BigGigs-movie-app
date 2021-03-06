import React from "react";
import { Platform } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator,
} from "react-navigation";
import { Feather, Ionicons } from "@expo/vector-icons";

import MovieListScreen from "../screens/Trending/MovieListScreen";
import SearchScreen from "../screens/Search/SearchScreen";
import { primaryTint, inactiveTint, white } from "../styles/Colors";
import Config from "../screens/config/ConfigurationScreen.js";
import MovieDetails from "../screens/Trending/MovieDetailsScreen";
import SearchResultsScreen from "../screens/Search/SearchScreen/SearchResultsScreen";
import Discover from "../screens/Discover/DiscoverScreen";
import MovieDetailsScreen from "../screens/Trending/MovieDetailsScreen";
import WebViewScreen from "../screens/WebViewScreen";
import Watchlist from "../screens/Watchlist";
import main from "../screens/main";
import TVList from "../screens/TVSeries/TVList";
import TVDetails from "../screens/TVSeries/TVDetails";
import SeasonDetails from "../screens/TVSeries/Seasons/Details";
import SearchFilter from "../screens/Search/SearchFilter";
import { EpisodeDetails } from "../screens/Details";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {},
});

const MovieListStack = createStackNavigator(
  {
    main: main,
    MList: MovieListScreen,
    MovieDetails: MovieDetails,
    WebView: WebViewScreen,
    Watchlist: Watchlist,
    TVList: TVList,
    TVDetails: TVDetails,
    SeasonDetails: SeasonDetails,
    EpisodeDetails: EpisodeDetails,
  },
  config
);

MovieListStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
    tabBarLabel: "Trends",
    tabBarIcon: ({ tintColor }) => (
      <Ionicons name="ios-compass" color={tintColor} size={24} />
    ),
  };
};

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
    SearchResults: SearchResultsScreen,
    MovieDetails: MovieDetailsScreen,
    WebView: WebViewScreen,
    SearchFilter: SearchFilter,
  },
  config
);

SearchStack.navigationOptions = {
  tabBarLabel: "Search",
  tabBarIcon: ({ tintColor }) => (
    <Feather name="search" color={tintColor} size={24} />
  ),
};

const DiscoverStack = createStackNavigator(
  {
    Discover: Discover,
    MovieDetails: MovieDetailsScreen,
    WebView: WebViewScreen,
  },
  config
);

DiscoverStack.navigationOptions = {
  tabBarLabel: "Discover",
  tabBarIcon: ({ tintColor }) => (
    <Ionicons name="ios-star" color={tintColor} size={24} />
  ),
};

const ConfigStack = createStackNavigator(
  {
    Config: Config,
  },
  config
);

ConfigStack.navigationOptions = {
  tabBarLabel: "Statistics",
  tabBarIcon: ({ tintColor }) => (
    <Feather name="aperture" color={tintColor} size={24} />
  ),
};

const tabNavigator = createBottomTabNavigator(
  {
    MovieListStack,
    SearchStack,
    DiscoverStack,
    ConfigStack,
  },
  {
    tabBarOptions: {
      // safeAreaInset: { bottom: 0, top: "never" },
      activeTintColor: white,
      inactiveTintColor: inactiveTint,
      tabStyle: { backgroundColor: primaryTint },
      style: {
        borderTopColor: "#181819",
        borderTopWidth: 1.5,
        backgroundColor: primaryTint,
      },
    },
  }
);

export default tabNavigator;
