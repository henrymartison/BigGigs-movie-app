import React, { Component } from "react";
import { WebView, View, ActivityIndicator } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

import styles from "./styles";
import { white, primaryTint, darkBlue } from "../../styles/Colors";
import { TouchableOpacity } from "../../components/commons/TouchableOpacity";
import Loader from "../../components/commons/Loader";

export default class WebViewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("title"),
    headerTitleStyle: { color: white },
    headerStyle: {
      backgroundColor: primaryTint,
      borderBottomColor: primaryTint
    },
    headerLeft: (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ paddingLeft: 10 }}
      >
        <Ionicons name="ios-arrow-back" size={27} color={darkBlue} />
      </TouchableOpacity>
    )
  });
  renderLoading = () => <ActivityIndicator style={styles.container} />;

  render() {
    const { key } = this.props.navigation.state.params;

    return (
      <View style={{ flex: 1, backgroundColor: primaryTint }}>
        <WebView
          useWebKit
          source={{ uri: `https://www.youtube.com/embed/${key}?start=0` }}
          startInLoadingState
          renderLoading={this.renderLoading}
        />
      </View>
    );
  }
}
