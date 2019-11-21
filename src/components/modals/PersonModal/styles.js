import { StyleSheet } from 'react-native';

import { white, darkBlue, blue } from '../../../styles/Colors';
import { fsr, height } from '../../commons/metrics';

const styles = StyleSheet.create({
  containerModal: {
    backgroundColor: '#15161b',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    height: height * 0.55
  },
  containerScroll: {
    padding: 22,
    paddingTop: 0,
    marginTop: 22
  },
  containerCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  photo: {
    borderRadius: 8
  },
  containerMainText: {
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  titleInfo: {
    fontSize: fsr(2.4),
    fontWeight: 'bold',
    color: darkBlue,
    marginBottom: 7
  },
  titleName: {
    fontSize: fsr(2.6),
    fontWeight: 'bold',
    color: darkBlue,
    marginBottom: 10
  },
  textItems: {
    marginLeft: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  textSmall: {
    fontSize: fsr(2.1),
    color: white
  },
  textJustify: {
    textAlign: 'justify'
  },
  textLineHeight: {
    lineHeight: 20
  },
  containerTitleMargin: {
    marginBottom: 7
  },
  containerRow: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 22
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: white,
    borderWidth: 1,
    borderColor: darkBlue,
    paddingVertical: 9.1,
    borderRadius: 100,
    width: '60%'
  },
  icon: {
    fontSize: fsr(2.8)
  }
});

export default styles;
