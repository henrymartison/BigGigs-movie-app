import { StyleSheet } from 'react-native';

import {
  white,
  darkBlue,
  lightGray,
  primaryTint
} from '../../../../styles/Colors';
import { fsr } from '../../../../components/commons/metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryTint,
    justifyContent: 'center'
  },
  containerList: {
    justifyContent: 'center',
    flex: 1
  },
  containerMainText: {
    paddingVertical: 25,
    paddingHorizontal: 20
  },
  textMain: {
    fontSize: fsr(3),
    fontWeight: 'bold',
    color: white,
    width: '80%'
  },
  buttonGrid: {
    position: 'absolute',
    right: 12,
    top: 18,
    padding: 8,
    borderRadius: 100
  },
  buttonGridActive: {
    backgroundColor: 'transparent'
  },
  buttonShare: {
    paddingRight: 15,
    paddingLeft: 20
  },
  loadingMore: {
    paddingTop: 20,
    paddingBottom: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingButton: {
    padding: 10,
    width: '50%',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: lightGray
  },
  loadingText: {
    fontSize: fsr(2.1),
    color: darkBlue,
    textAlign: 'center'
  }
});

export default styles;
