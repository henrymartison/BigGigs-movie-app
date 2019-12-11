import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

const TVInfoRow = ({ data = {} }) => (
  <View style={styles.container}>
    {Object.keys(data).map(key => (
      <View key={key} style={{ flexDirection: "row" }}>
        <View style={{ width: "40%", paddingBottom: 10 }}>
          <Text style={styles.title}>{key}</Text>
        </View>
        <Text numberOfLines={1} style={styles.description}>
          {data[key]}
        </Text>
      </View>
    ))}
  </View>
);
export default TVInfoRow;
