import React, { Component } from "react";
import { View, TextInput, Keyboard, Text } from "react-native";
import { withNavigation } from "react-navigation";

import * as Animatable from "react-native-animatable";

import { Feather, Ionicons } from "@expo/vector-icons";

import { TouchableOpacity } from "../TouchableOpacity";

import { darkGray, primary } from "../../../styles/Colors";

import styles from "./styles";

class Search extends Component {
  state = {
    value: "",
    searchBarFocused: false
  };

  actionClearSearch = () => {
    this.setState({ value: "" });
  };

  actionSubmit = () => {
    const { value } = this.state;
    const { navigate, typeRequest } = this.props;

    if (value) {
      navigate("SearchResults", {
        typeRequest,
        name: value,
        id: null
      });
    }
    // this.setState({ value: "" });
  };

  componentDidMount() {
    this._keyboardWillShow = Keyboard.addListener(
      "keyboardWillShow",
      this._keyboardWillShow
    );

    this._keyboardWillHide = Keyboard.addListener(
      "keyboardWillHide",
      this._keyboardWillHide
    );
  }

  _keyboardWillShow = () => {
    this.setState({ searchBarFocused: true });
  };

  _keyboardWillHide = () => {
    this.setState({ searchBarFocused: false });
  };

  actionFilter = () => {
    this.props.navigation.navigate("SearchFilter");
  };

  render() {
    const { value } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.containerInput}>
          <View style={styles.inputDirection}>
            <Feather
              style={styles.icon}
              name="search"
              size={20}
              color={darkGray}
            />
            <TextInput
              style={styles.textInput}
              onSubmitEditing={this.actionSubmit}
              onChangeText={search => this.setState({ value: search })}
              value={value}
              returnKeyType="search"
              keyboardType="default"
              keyboardAppearance="dark"
              blurOnSubmit
              multiline={false}
              autoCorrect={false}
              underlineColorAndroid="transparent"
              placeholderTextColor={darkGray}
              placeholder="Search"
              autoFocus
              enablesReturnKeyAutomatically
            />
            {value.length > 0 && (
              <TouchableOpacity onPress={this.actionClearSearch}>
                <Ionicons
                  style={styles.icon}
                  name="ios-close-circle"
                  size={22}
                  color={primary}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {this.state.searchBarFocused ? (
          <TouchableOpacity
            onPress={Keyboard.dismiss}
            style={styles.cancelContainer}
          >
            <Animatable.Text
              animation="fadeInUp"
              duration={1200}
              style={styles.cancelText}
            >
              Cancel
            </Animatable.Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={this.actionFilter} style={styles.filter}>
            <Animatable.View animation="slideInRight" duration={600}>
              <Feather name="settings" color={primary} size={22} />
            </Animatable.View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default withNavigation(Search);
