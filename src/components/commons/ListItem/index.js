import React from "react";
import { View, Text, Switch } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Separator } from "../Separator";
import { TouchableOpacity } from "../TouchableOpacity";

import { white, darkBlue } from "../../../styles/Colors";
import styles from "./styles";

const ListItem = ({ iconLeft, attribute, onPress, hasSwitch }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          {iconLeft && (
            <Feather
              name={iconLeft}
              size={18}
              color={darkBlue}
              style={styles.iconLeft}
            />
          )}
          <Text style={styles.attributeText}>{attribute}</Text>
        </View>
        {hasSwitch ? (
          <Switch />
        ) : (
          <Ionicons name="ios-arrow-forward" size={18} color={white} />
        )}
      </View>
      <Separator ml={18} />
    </TouchableOpacity>
  );
};

export default ListItem;
