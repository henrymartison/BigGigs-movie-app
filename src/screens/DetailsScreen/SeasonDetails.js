import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";

import {
  white,
  primaryTint,
  darkBlue,
  secondaryTint,
} from "../../styles/Colors";
import { TouchableOpacity } from "../../components/commons/TouchableOpacity";
import { fsr } from "../../components/commons/metrics";
import request from "../../services/api";
import EpisodeModal from "../../components/modals/EpisodeModal";

const getEpNumber = (epNumber) => {
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
  "Dec",
];

const convertToYear = (date) => new Date(date).getFullYear() || "";
const convertToMonth = (date) => months[new Date(date).getMonth()] || "";
const convertToDay = (date) => new Date(date).getDate() || "";

const getHeader = (season, episode) => {
  season = season < 10 ? `0${season}` : season;
  episode = episode < 10 ? `0${episode}` : episode;
  return `S${season}E${episode}` || "...";
};

class SeasonDetails extends Component {
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

  state = {
    isLoading: false,
    data: [],
    isVisible: false,
  };

  async componentDidMount() {
    this.requestSeasonInfo();
  }

  requestSeasonInfo = async () => {
    try {
      this.setState({ isLoading: true });
      const { id, season_number } = this.props.navigation.state.params;

      const seasonDetails = await request(`tv/${id}/season/${season_number}`);

      this.setState({ isLoading: false, data: seasonDetails.episodes });
    } catch (error) {
      console.log(error);
    }
  };

  actionModal = (episodeInfo = {}) => {
    this.setState(({ isVisible }) => {
      return { isVisible: !isVisible };
    });
  };

  navigate = (item) => {
    if (item.overview === "") {
      alert("Episode info not available");
    } else {
      this.props.navigation.navigate("EpisodeDetails", {
        episodeInfo: item,
        title: getHeader(item.season_number, item.episode_number),
      });
    }
  };

  renderEpisode = ({ item }) => {
    return (
      <View>
        <RectButton
          onPress={() => this.navigate(item)}
          style={styles.rowContainer}
        >
          <View style={styles.checkRow}>
            <Text style={styles.epNumber}>
              {getEpNumber(item.episode_number)}
            </Text>
            <View
              style={{
                marginLeft: 20,
                justifyContent: "center",
              }}
            >
              <Text numberOfLines={1} style={styles.rowText}>
                {item.name}
              </Text>
              {item.air_date && (
                <Text style={styles.dateText}>
                  {convertToMonth(item.air_date)} {convertToDay(item.air_date)},{" "}
                  {convertToYear(item.air_date)}
                </Text>
              )}
            </View>
          </View>
          <Feather name="eye" color={darkBlue} size={18} />
        </RectButton>
      </View>
    );
  };

  itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  render() {
    const { data, isLoading, isVisible } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={{ flex: 1 }}>
            <ActivityIndicator color="grey" />
          </View>
        ) : (
          <FlatList
            data={data}
            renderItem={this.renderEpisode}
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
    backgroundColor: primaryTint,
  },
  rowContainer: {
    height: 80,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 17,
  },
  rowText: {
    fontSize: fsr(2.9),
    color: white,
    fontWeight: "700",
    paddingBottom: 5,
  },
  dateText: {
    fontSize: fsr(2),
    color: white,
  },
  epNumber: {
    fontSize: fsr(4.5),
    color: darkBlue,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: secondaryTint,
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
});
