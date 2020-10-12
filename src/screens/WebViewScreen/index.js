import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";

import { white, primaryTint, darkBlue } from "../../styles/Colors";
import { TouchableOpacity } from "../../components/commons/TouchableOpacity";
import Loader from "../../components/commons/Loader";

export default class WebViewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("title"),
    headerTitleStyle: { color: white },
    headerStyle: {
      backgroundColor: primaryTint,
      borderBottomColor: primaryTint,
    },
    headerLeft: (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ paddingLeft: 10 }}
      >
        <Ionicons name="ios-arrow-back" size={27} color={darkBlue} />
      </TouchableOpacity>
    ),
  });

  render() {
    const { key } = this.props.navigation.state.params;

    return (
      <WebView
        useWebKit
        source={{ uri: `https://www.youtube.com/embed/${key}?start=0` }}
        startInLoadingState
        renderLoading={() => <Loader />}
      />
    );
  }
}
