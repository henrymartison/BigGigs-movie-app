import { StyleSheet } from 'react-native';

import {
  white,
  lightGray,
  darkBlue,
  inactiveTint,
  primaryTint,
  primary
} from '../../../styles/Colors';
import { fsr } from '../../../components/commons/metrics';

const styles = StyleSheet.create({
  buttonFilter: {
    paddingRight: 15,
    paddingLeft: 20
  },
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
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 20,
    justifyContent: 'center'
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
    backgroundColor: primaryTint
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
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
    borderColor: inactiveTint
  },
  loadingText: {
    fontSize: fsr(2.1),
    color: white,
    textAlign: 'center'
  }
});

export default styles;
