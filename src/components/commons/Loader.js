import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator
} from "react-native-indicators";
import { white, darkBlue } from "../../styles/Colors";

const Loader = () => (
  <UIActivityIndicator color={white} size={24} color={darkBlue} />
);
export default Loader;

const styles = StyleSheet.create({});
