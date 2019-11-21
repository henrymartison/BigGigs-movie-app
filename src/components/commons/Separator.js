import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { darkBlue, secondaryTint } from '../../styles/Colors';

export const Separator = ({ ml = null }) => (
  <View
    style={{
      flex: 1,
      height: StyleSheet.hairlineWidth,
      marginLeft: ml,
      backgroundColor: secondaryTint
    }}
  />
);
