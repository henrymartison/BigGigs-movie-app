import React from 'react'
import { Platform } from 'react-native'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Feather } from '@expo/vector-icons'

import MovieListScreen from '../screens/Trending/MovieListScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import { primaryTint, inactiveTint } from '../styles/Colors';
import Config from '../screens/config/ConfigurationScreen.js';
import MovieDetails from '../screens/Trending/MovieDetailsScreen';


const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
  });

const MovieListStack = createStackNavigator(
    {
      MList: MovieListScreen,
      MovieDetails: MovieDetails
    },
    config
  );
  
  MovieListStack.navigationOptions = {
    tabBarLabel: 'Discover',
    tabBarIcon: ({ tintColor }) => (
      <Feather name='trending-up' color={tintColor} size={20} />
    ),
  };

const SearchStack = createStackNavigator(
    {
      Search: SearchScreen
    },
    config
  );
  
  SearchStack.navigationOptions = {
    tabBarLabel: 'Search',
    tabBarIcon: ({ tintColor }) => (
      <Feather name='search' color={tintColor} size={20} />
    ),
  };

const ConfigStack = createStackNavigator(
    {
      Config: Config
    },
    config
  );
  
  ConfigStack.navigationOptions = {
    tabBarLabel: 'Statistics',
    tabBarIcon: ({ tintColor }) => (
      <Feather name='aperture' color={tintColor} size={20} />
    ),
  };

  const tabNavigator = createBottomTabNavigator({
    MovieListStack,
    SearchStack,
    ConfigStack
  }, {
      tabBarOptions: {
          activeTintColor: 'white',
          inactiveTintColor: inactiveTint,
          tabStyle: { backgroundColor: primaryTint }
      }
  })

  export default tabNavigator