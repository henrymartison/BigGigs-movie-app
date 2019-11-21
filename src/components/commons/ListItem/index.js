import React from 'react';
import { View, Text } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Separator } from '../Separator';
import { TouchableOpacity } from '../TouchableOpacity';

import { white, darkBlue } from '../../../styles/Colors';
import styles from './styles';

const ListItem = ({
  iconLeft,
  iconRight = 'ios-arrow-forward',
  attribute,
  onPress
}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <Feather name={iconLeft} size={18} color={darkBlue} />
          <Text style={styles.attributeText}>{attribute}</Text>
        </View>
        <Ionicons name={iconRight} size={18} color={white} />
      </TouchableOpacity>
      <Separator ml={38} />
    </View>
  );
};

export default ListItem;
