import React from 'react';
import { ScrollView, Text } from 'react-native';

import SectionRow from '../SectionRow';

import styles from './styles';

const OptionsRow = ({ data = {} }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.container}
  >
      <SectionRow hasSubTitle>
        <Text style={styles.description}>hello</Text>
        <Text style={styles.description}>hello</Text>
      </SectionRow>
  </ScrollView>
);

export default OptionsRow;