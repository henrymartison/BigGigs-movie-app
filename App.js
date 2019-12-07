import React from "react";
import { StyleSheet, StatusBar, View, ActivityIndicator } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import { primaryTint } from "./src/styles/Colors";

import * as Font from "expo-font";
import { Root } from "native-base";

import Loader from "./src/components/commons/Loader";

export default class App extends React.Component {
  state = {
    fontLoading: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      "cookie-regular": require("./src/assets/fonts/Cookie-Regular.ttf"),
      "space-mono": require("./src/assets/fonts/SpaceMono-Regular.ttf"),
      "balooBhaina-regular": require("./src/assets/fonts/BalooBhaina-Regular.ttf")
    });
    this.setState({ fontLoading: true });
  }

  render() {
    return (
      <Root style={styles.container}>
        <StatusBar barStyle="light-content" />
        {this.state.fontLoading ? <AppNavigator /> : null}
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryTint
  }
});
