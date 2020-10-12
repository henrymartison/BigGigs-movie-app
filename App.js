import React from "react";
import { StatusBar, View } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";

import * as Font from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default class App extends React.Component {
  state = {
    fontLoading: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      "cookie-regular": require("./src/assets/fonts/Cookie-Regular.ttf"),
      "space-mono": require("./src/assets/fonts/SpaceMono-Regular.ttf"),
      "balooBhaina-regular": require("./src/assets/fonts/BalooBhaina-Regular.ttf"),
    });
    this.setState({ fontLoading: true });
  }

  render() {
    return (
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" />
        {this.state.fontLoading ? <AppNavigator /> : null}
      </SafeAreaProvider>
    );
  }
}
