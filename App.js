import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { primaryTint } from './src/styles/Colors';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' />
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryTint,
  },
});
