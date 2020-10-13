import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import Image from "react-native-scalable-image";

import { Modal } from "./Modal";

import request from "../../services/api";

import { notFound } from "../../utils/StaticImages";
import { height } from "../../utils/device";

const uninformed = "Uninformed";

export default class EpisodeModal extends Component {
  state = {
    isLoading: false,
    isError: false,
  };

  componentDidMount() {
    // console.log("////////");
  }

  getImageApi = () => {
    const { profilePath } = this.state;

    return profilePath
      ? { uri: `https://image.tmdb.org/t/p/w500/${profilePath}` }
      : notFound;
  };

  render() {
    const { isVisible, actionClose, style } = this.props;

    return (
      <Modal
        isVisible={isVisible}
        // onModalShow={this.requestTeamInfo}
        actionOpenClose={actionClose}
        style={styles.modal}
      >
        <Text style={{ color: "white" }}></Text>
        <View style={styles.containerModal}></View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  containerModal: {
    backgroundColor: "#15161b",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    height: height * 0.58,
  },
});
