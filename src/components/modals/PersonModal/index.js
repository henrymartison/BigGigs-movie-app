import React, { Component } from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";

import Image from "react-native-scalable-image";

import NotificationCard from "../../Cards/NotificationCard";
import { Modal } from "../Modal";

import request from "../../../services/api";

import { width, fsr } from "../../commons/metrics";
import { notFound } from "../../../utils/StaticImages";

import styles from "./styles";
import { blue } from "../../../styles/Colors";
import HorizontalRowList from "../../Cards/Rows/HorizontalRowList";

const uninformed = "Uninformed";

export default class PersonModal extends Component {
  state = {
    isLoading: false,
    isError: false,
    id: this.props.creditId,
  };

  getImageApi = () => {
    const { profilePath } = this.state;

    return profilePath
      ? { uri: `https://image.tmdb.org/t/p/w500/${profilePath}` }
      : notFound;
  };

  getAge = () => {
    const { birthday } = this.state;

    if (birthday) {
      const today = new Date();
      const birthDate = new Date(birthday);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age -= 1;
      return `${age} years`;
    }
    return `${uninformed} age`;
  };

  requestTeamInfo = async () => {
    try {
      this.setState({ isLoading: true });

      const { creditId } = this.props;

      const data = await request(`person/${parseInt(creditId)}`);
      const movie_credits = await request(
        `person/${parseInt(creditId)}/combined_credits`
      );
      // console.log("person data ====>", data);

      this.setState({
        isLoading: false,
        isError: false,
        id: creditId,
        profilePath: data.profile_path || "",
        name: data.name || `${uninformed} name`,
        knownForDepartment:
          data.known_for_department || `${uninformed} department`,
        birthday: data.birthday || "",
        placeOfBirth: data.place_of_birth || `${uninformed} place of birth`,
        biography: data.biography || uninformed,
        movie_credits: movie_credits.cast.slice(0, 4),
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        isError: true,
      });
    }
  };

  renderFooter = () => {
    return (
      <View style={styles.containerRow}>
        {/* <TouchableOpacity style={styles.button} onPress={actionClose}>
          <Feather
            name='chevron-down'
            size={styles.icon.fontSize}
            color={darkBlue}
          />
        </TouchableOpacity> */}
      </View>
    );
  };

  render() {
    const {
      isLoading,
      isError,
      id,
      name,
      knownForDepartment,
      placeOfBirth,
      biography,
    } = this.state;

    const { isVisible, actionClose, style, creditId } = this.props;

    return (
      <Modal
        isVisible={isVisible}
        onModalShow={this.requestTeamInfo}
        actionOpenClose={actionClose}
        style={style}
      >
        <View style={styles.containerModal}>
          {isLoading || creditId !== id ? (
            <ActivityIndicator style={styles.containerCenter} />
          ) : isError ? (
            <View style={styles.containerModal}>
              <ScrollView style={styles.containerScroll}>
                <NotificationCard
                  icon={require("../../../assets/images/no-signal.png")}
                  action={this.requestTeamInfo}
                />
              </ScrollView>
              {this.renderFooter()}
            </View>
          ) : (
            <View style={styles.containerModal}>
              <ScrollView style={styles.containerScroll}>
                <View style={styles.containerMainText}>
                  <Image
                    source={this.getImageApi()}
                    style={styles.photo}
                    width={width * 0.25}
                    height={width * 0.35}
                  />
                  <View style={styles.textItems}>
                    <Text style={styles.titleName}>{name}</Text>
                    <Text
                      style={{
                        fontSize: fsr(2.6),
                        fontWeight: "500",
                        color: blue,
                        marginBottom: 7,
                      }}
                    >
                      as {name}
                    </Text>
                    <View style={styles.containerTitleMargin}>
                      <Text
                        numberOfLines={2}
                        style={[styles.textSmall, styles.textJustify]}
                      >
                        {knownForDepartment}
                      </Text>
                    </View>
                    <View style={styles.containerTitleMargin}>
                      <Text
                        numberOfLines={2}
                        style={[styles.textSmall, styles.textJustify]}
                      >
                        {this.getAge()}
                      </Text>
                    </View>
                    <View style={styles.containerTitleMargin}>
                      <Text
                        numberOfLines={2}
                        style={[styles.textSmall, styles.textJustify]}
                      >
                        {placeOfBirth}
                      </Text>
                    </View>
                    {/* <View style={styles.containerTitleMargin}>
                      <Text
                        numberOfLines={2}
                        style={[styles.textSmall, styles.textJustify]}
                      >
                        Role:
                      </Text>
                    </View>
                    <View style={styles.containerTitleMargin}>
                      <Text
                        numberOfLines={2}
                        style={[styles.textSmall, styles.textJustify]}
                      >
                        Amount Paid: $...
                      </Text>
                    </View> */}
                  </View>
                </View>
                <Text style={styles.titleInfo}>Biography</Text>
                <Text
                  style={[
                    styles.textSmall,
                    styles.textLineHeight,
                    styles.textJustify,
                  ]}
                >
                  {biography}
                </Text>
                <HorizontalRowList
                  title={`Other movies by ${name}`}
                  data={this.state.movie_credits}
                />
              </ScrollView>
              {this.renderFooter()}
            </View>
          )}
        </View>
      </Modal>
    );
  }
}
