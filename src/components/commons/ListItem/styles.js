import { StyleSheet } from 'react-native';
import { fsr } from '../metrics';
import { white, primaryTint } from '../../../styles/Colors';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
    // backgroundColor: primaryTint
  },
  attributeText: {
    paddingLeft: 10,
    fontSize: fsr(2.4),
    color: white
  }
});

export default styles;
