import { StyleSheet } from 'react-native';

import { darkBlue } from '../../../../styles/Colors';
import { fsr } from '../../../commons/metrics';

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
  },
  containerLast: {
    marginBottom: 15
  },
  containerSubTitle: {
    marginRight: 25
  },
  title: {
    fontSize: fsr(2.6),
    fontWeight: 'bold',
    color: darkBlue,
    marginBottom: 7
  }
});

export default styles;