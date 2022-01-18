import React from "react";
import { Platform } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator,
} from "react-navigation";
import { Feather, FontAwesome5 } from "@expo/vector-icons";

import { primaryTint, inactiveTint, white, primary } from "../styles/Colors";

import SearchScreen from "../screens/Search/SearchScreen";
import Config from "../screens/config/ConfigurationScreen.js";
import SearchResultsScreen from "../screens/Search/SearchScreen/SearchResultsScreen";
import WebViewScreen from "../screens/WebViewScreen";
import Watchlist from "../screens/Watchlist";
import main from "../screens/main";
import SearchFilter from "../screens/Search/SearchFilter";
import {
  EpisodeDetails,
  MovieDetails,
  SeasonDetails,
  TVDetails,
} from "../screens/DetailsScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {},
});

const MovieListStack = createStackNavigator(
  {
    main: main,
    MovieDetails: MovieDetails,
    WebView: WebViewScreen,
    SeasonDetails: SeasonDetails,
    TVDetails: TVDetails,
    EpisodeDetails: EpisodeDetails,
  },
  {
    defaultNavigationOptions: () => ({
      headerTintColor: primary,
      headerStyle: {
        backgroundColor: primaryTint,
        borderBottomColor: primaryTint,
      },
    }),
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
    tabBarLabel: "Lobby",
    tabBarIcon: ({ tintColor }) => (
      <FontAwesome5 name="couch" color={tintColor} size={20} />
    ),
  };
};

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
    SearchResults: SearchResultsScreen,
    MovieDetails: MovieDetails,
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

const LibraryStack = createStackNavigator(
  {
    Watchlist: Watchlist,
    MovieDetails: MovieDetails,
    WebView: WebViewScreen,
  },
  {
    defaultNavigationOptions: () => ({
      title: "Library",
      headerTitleStyle: { color: white },
      headerTintColor: primary,
      headerStyle: {
        backgroundColor: primaryTint,
        borderBottomColor: primaryTint,
      },
    }),
  },
  config
);

LibraryStack.navigationOptions = {
  tabBarLabel: "Library",
  tabBarIcon: ({ tintColor }) => (
    <FontAwesome5 name="layer-group" color={tintColor} size={19} />
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
    LibraryStack,
    ConfigStack,
  },
  {
    tabBarOptions: {
      // safeAreaInset: { bottom: 0, top: "never" },
      activeTintColor: primary,
      inactiveTintColor: inactiveTint,
      tabStyle: { backgroundColor: primaryTint },
      style: {
        borderTopColor: "transparent",
        borderTopWidth: 1.5,
        backgroundColor: primaryTint,
      },
    },
  }
);

export default tabNavigator;
