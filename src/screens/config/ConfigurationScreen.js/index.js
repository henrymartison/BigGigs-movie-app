import React, { Component } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import ListItem from "../../../components/commons/ListItem";
import { primaryTint, white } from "../../../styles/Colors";

import styles from "./styles";

class Configuration extends Component {
  static navigationOptions = {
    title: "Preferences",
    headerTitleStyle: { color: white },
    headerStyle: {
      backgroundColor: primaryTint,
      borderBottomColor: primaryTint,
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <SafeAreaView />
          <View style={styles.headerContainer}>
            <View style={styles.row}>
              <View style={{}}>
                <Text style={styles.profilename}>Henry Martison</Text>
                <Text style={styles.profileOptionText}>
                  henrymartison@example.com
                </Text>
              </View>
              <View style={styles.thumbnailContainer}>
                <Text style={styles.thumbnailText}>HM</Text>
              </View>
            </View>
          </View>

          <View>
            <Text numberOfLines={1} style={styles.sectionHeading}>
              General
            </Text>
            <View style={styles.section}>
              <ListItem iconLeft="user" attribute="My account" />
              <ListItem iconLeft="award" attribute="Switch To Premium" />
              <ListItem
                iconLeft="corner-up-left"
                attribute="Restore purchases"
              />
              <ListItem iconLeft="help-circle" attribute="Help & Support" />
              <ListItem iconLeft="star" attribute="Rate us" />
              <ListItem iconLeft="mail" attribute="Invite your friends" />
              <ListItem iconLeft="shield-off" attribute="Privacy" />
              <ListItem iconLeft="info" attribute="Terms and Conditions" />
            </View>
          </View>

          <View>
            <Text numberOfLines={1} style={styles.sectionHeading}>
              Notifications and announcements
            </Text>
            <View style={styles.section}>
              <ListItem hasSwitch attribute="New episode" />
              <ListItem hasSwitch attribute="When to notify" />
              <ListItem hasSwitch attribute="Season premiere" />
              <ListItem hasSwitch attribute="New trailer" />
            </View>
          </View>

          {/* <ListItem
            iconLeft="log-out"
            attribute="Sign out"
            color="tomato"
            iconRight={null}
          /> */}

          <View
            style={{
              width: "100%",
              height: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "grey", fontSize: 13 }}>
              © 2019 Marvalinks Media. Hobi 1.0.2 (34)
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default Configuration;
