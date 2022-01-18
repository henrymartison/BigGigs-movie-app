import React from "react";
import { View, Text, Image } from "react-native";

import { TouchableOpacity } from "../../commons/TouchableOpacity";

import styles from "./styles";

const NotificationCard = ({
  style = styles.containerError,
  icon = require("../../../assets/images/sad-rounded-square-emoticon.png"),
  textError = "Oops! Something seems broken. Please try again later.",
  textButton = "Try again",
  action = null,
}) => (
  <View style={style}>
    <Image source={icon} style={styles.image} />
    <Text style={styles.errorInfo}>{textError}</Text>
    {action && (
      <TouchableOpacity style={styles.loadingButton} onPress={action}>
        <Text style={styles.loadingText}>{textButton}</Text>
      </TouchableOpacity>
    )}
  </View>
);

export default NotificationCard;
