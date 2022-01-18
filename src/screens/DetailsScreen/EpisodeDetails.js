import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet, Image } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import { notFound } from "../../utils/StaticImages";

import {
  secondaryTint,
  primaryTint,
  darkBlue,
  white,
  darkish,
  primary,
} from "../../styles/Colors";
import { TouchableOpacity } from "../../components/commons/TouchableOpacity";
import { fsr } from "../../components/commons/metrics";

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

const getImageApi = (path) => {
  return path
    ? { uri: `https://image.tmdb.org/t/p/original/${path}` }
    : notFound;
};

export default class EpisodeDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: navigation.getParam("title"),
      headerStyle: {
        backgroundColor: primaryTint,
        borderBottomColor: primaryTint,
      },
      headerTitleStyle: { color: white },

      headerLeft: (
        <TouchableOpacity
          style={{ paddingLeft: 10 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="ios-arrow-back" size={27} color={darkBlue} />
        </TouchableOpacity>
      ),
    };
  };

  state = {
    isLoading: false,
    isError: false,
    episodeInfo: this.props.navigation.state.params,
  };

  componentDidMount() {
    console.log(this.props.navigation.getParam("title"));
  }

  render() {
    const {
      episodeInfo: {
        episodeInfo: { name, overview, air_date, still_path, crew },
      },
    } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.imageContainer}>
            <Image
              source={getImageApi(still_path)}
              style={{ flex: 1, height: null, width: null, borderRadius: 8 }}
              resizeMode="cover"
            />
          </View>

          <Text style={styles.heading}>{name}</Text>

          {air_date && (
            <View style={styles.dateContainer}>
              <AntDesign name="clockcircleo" color={primaryTint} size={18} />
              <Text numberOfLines={1} style={styles.date}>
                <Text>Aired on </Text>
                {convertToMonth(air_date)} {convertToDay(air_date)},{" "}
                {convertToYear(air_date)}
              </Text>
            </View>
          )}
          {/* {crew.map((item) => (
            <View
              key={item.id}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <View style={{ width: "40%", paddingBottom: 10 }}>
                <Text style={styles.title}>{item.job}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text numberOfLines={1} style={styles.description}>
                  {item.name}
                </Text>
              </View>
            </View>
          ))} */}

          <Text
            style={[
              styles.heading,
              { fontSize: 20, marginVertical: 20, marginBottom: 5 },
            ]}
          >
            Overview
          </Text>
          <Text style={styles.overview}>{overview}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 14, backgroundColor: primaryTint },
  imageContainer: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    marginVertical: 15,
    backgroundColor: secondaryTint,
    alignSelf: "center",
  },
  dateContainer: {
    backgroundColor: "slategray",
    alignSelf: "center",
    borderRadius: 4,
    paddingHorizontal: 10,
    height: 28,
    alignItems: "center",
    flexDirection: "row",
  },
  date: {
    color: "#282f33",
    fontSize: 16,
    marginLeft: 7,
  },
  heading: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
  },
  overview: {
    color: "white",
    fontSize: 17,
  },
  title: {
    fontSize: fsr(2.2),
    fontWeight: "bold",
    color: darkBlue,
  },
  description: {
    fontSize: fsr(2.2),
    color: white,
    fontWeight: "500",
  },
});
