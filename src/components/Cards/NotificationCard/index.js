import React from "react";
import { View, Text } from "react-native";

import { Feather } from "@expo/vector-icons";

import { TouchableOpacity } from "../../commons/TouchableOpacity";

import { width } from "../../../components/commons/metrics";
import { darkBlue, white } from "../../../styles/Colors";

import styles from "./styles";

const NotificationCard = ({
  style = styles.containerError,
  icon = "alert-octagon",
  textError = "Something wrong has happened, please try again later.",
  textButton = "Load",
  action = null
}) => (
  <View style={style}>
    <Feather name={icon} size={width * 0.2} color={white} />
    <Text style={styles.errorInfo}>{textError}</Text>
    {action && (
      <TouchableOpacity style={styles.loadingButton} onPress={action}>
        <Text style={styles.loadingText}>{textButton}</Text>
      </TouchableOpacity>
    )}
  </View>
);

export default NotificationCard;
