import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

import {
  white,
  primaryTint,
  darkBlue,
  secondaryTint
} from "../../../styles/Colors";
import { TouchableOpacity } from "../../../components/commons/TouchableOpacity";
import { fsr } from "../../../components/commons/metrics";
import request from "../../../services/api";

const getEpNumber = epNumber => {
  epNumber = epNumber < 10 ? `0${epNumber}` : epNumber;
  return `${epNumber}` || "N/A";
};

var months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const convertToYear = date => new Date(date).getFullYear() || "";
const convertToMonth = date => months[new Date(date).getMonth()] || "";
const convertToDay = date => new Date(date).getDate() || "";

class SeasonDetails extends Component {
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

  state = {
    isLoading: false,
    data: []
  };

  async componentDidMount() {
    this.requestEpisodeDetails();
  }

  requestEpisodeDetails = async () => {
    try {
      this.setState({ isLoading: true });
      const { id } = this.props.navigation.state.params;

      const epData = await request(`tv/60625/season/1`);
      // console.log(epData);
      const season_number = epData.season_number;
      console.log(season_number);

      this.setState({ isLoading: false, data: epData.episodes });
    } catch (error) {
      console.log(error);
    }
  };

  renderEpisodes = ({ item }) => {
    return (
      <View>
        <TouchableOpacity onPress={null} style={styles.rowContainer}>
          <View style={styles.checkRow}>
            <Text style={styles.epNumber}>
              {getEpNumber(item.episode_number)}
            </Text>
            <View
              style={{
                marginLeft: 20,
                justifyContent: "center"
              }}
            >
              <Text numberOfLines={1} style={styles.rowText}>
                {item.name}
              </Text>
              <Text style={styles.dateText}>
                Aired on {convertToMonth(item.air_date)}{" "}
                {convertToDay(item.air_date)}, {convertToYear(item.air_date)}
              </Text>
            </View>
          </View>
          <Feather name="eye" color={darkBlue} size={18} />
        </TouchableOpacity>
      </View>
    );
  };

  itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  render() {
    const { data, isLoading } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={{ flex: 1 }}>
            <ActivityIndicator color="grey" />
          </View>
        ) : (
          <FlatList
            data={data}
            renderItem={this.renderEpisodes}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={this.itemSeparator}
          />
        )}
      </View>
    );
  }
}
export default SeasonDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryTint
  },
  rowContainer: {
    height: 80,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 17
  },
  rowText: {
    fontSize: fsr(2.9),
    color: white,
    fontWeight: "700",
    paddingBottom: 5
  },
  dateText: {
    fontSize: fsr(2),
    color: white
  },
  epNumber: {
    fontSize: fsr(4.5),
    color: darkBlue
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: secondaryTint
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%"
  }
});
