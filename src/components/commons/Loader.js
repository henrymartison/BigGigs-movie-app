import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
} from 'react-native-indicators';
import { white, darkBlue } from '../../styles/Colors';

const Loader = props => <PacmanIndicator color={white} size={40} />;
export default Loader;

const styles = StyleSheet.create({});
