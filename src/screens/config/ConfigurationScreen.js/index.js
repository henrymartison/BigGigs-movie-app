import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  SafeAreaView
} from "react-native";
import { fsr } from "../../../components/commons/metrics";
import { TouchableOpacity } from "../../../components/commons/TouchableOpacity";
import ListItem from "../../../components/commons/ListItem";
import { primaryTint, white } from "../../../styles/Colors";

import styles from "./styles";

class Configuration extends Component {
  static navigationOptions = {
    title: "Preferences",
    headerTitleStyle: { color: white },
    headerStyle: {
      backgroundColor: primaryTint,
      borderBottomColor: primaryTint
    }
  };

  render() {
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: primaryTint }}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView />
        <TouchableOpacity activeOpacity={0.88} style={styles.headerContainer}>
          <View style={styles.headerRow}>
            <View style={{}}>
              <Text style={styles.profilename}>Henry Martison</Text>
              <Text style={styles.profileOptionText}>
                View and edit your profile
              </Text>
            </View>

            {/* thumbnail */}
            <View style={styles.thumbnailContainer}>
              <Text style={styles.thumbnailText}>HM</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ marginTop: 20 }}>
          <ListItem iconLeft="shield" attribute="Verify your identity" />
          <ListItem iconLeft="lock" attribute="Password and PIN" />
          <ListItem
            iconLeft="eye-off"
            attribute="Show my account balance"
            // iconRight='ios-switch'
          />
          <ListItem iconLeft="help-circle" attribute="Help & Support" />
          <ListItem iconLeft="mail" attribute="Invite your friends" />
          <ListItem iconLeft="shield-off" attribute="Privacy" />
          <ListItem iconLeft="award" attribute="Switch To Premium" />
          <ListItem iconLeft="info" attribute="Terms and Conditions" />
          <ListItem
            iconLeft="log-out"
            attribute="Sign out"
            color="tomato"
            iconRight={null}
          />
        </View>
        <View
          style={{
            width: "100%",
            height: 50,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ color: "grey", fontSize: 13 }}>
            © 2019 Marvalinks Media. Hobi 1.0.2 (34)
          </Text>
        </View>
      </ScrollView>
    );
  }
}
export default Configuration;
