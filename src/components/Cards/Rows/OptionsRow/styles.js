import { StyleSheet } from 'react-native';

import { blue, white } from '../../../../styles/Colors';
import { fsr } from '../../../commons/metrics';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // marginTop: 18
  },
  description: {
    fontSize: fsr(2.1),
    color: white,
    textAlign: 'justify'
  }
});

export default styles;