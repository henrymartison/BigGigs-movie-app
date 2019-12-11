import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Feather } from "@expo/vector-icons";
import { fsr } from "../../commons/metrics";
import { white, primary } from "../../../styles/Colors";

getEpNumber = episode_number => {
  let ep = episode_number;
  ep = ep < 10 ? `0${ep}` : ep;
  return ep;
};

getSeasonNumber = season_number => {
  let sN = season_number;
  sN = sN < 10 ? `0${sN}` : sN;
  return sN;
};

getReleaseTime = air_date => {
  let aired_date = new Date(air_date).getTime();
  const now = new Date().getTime();
  const t = aired_date - now;
  let days = Math.floor(t / (1000 * 60 * 60 * 24));
  let hours = Math.floor(((t % 1000) * 60 * 60 * 24) / (1000 * 60 * 60));
  let minutes = Math.floor(((t % 1000) * 60 * 60 * 24) / (1000 * 60));
  let seconds = Math.floor(((t % 1000) * 60 * 60 * 24) / 1000);

  return days + (days !== 1 ? " days" : " day");
};

const NextEpisode = ({ episode_number, air_date, season_number }) => (
  <View style={styles.nextEpContainer}>
    <Feather name="clock" color={primary} size={18} />
    <Text style={styles.nextEp}>
      S{getSeasonNumber(season_number)}E{getEpNumber(episode_number)} airs in{" "}
      {getReleaseTime(air_date)}
    </Text>
  </View>
);
export default NextEpisode;

const styles = StyleSheet.create({
  nextEpContainer: {
    height: 36,
    width: "100%",
    backgroundColor: "rgba(29, 161, 242, .1)",
    borderRadius: 8,
    marginTop: 18,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center"
  },
  nextEp: {
    color: white,
    fontSize: fsr(2.2),
    paddingLeft: 7
  }
});
