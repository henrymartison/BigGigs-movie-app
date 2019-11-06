import { StyleSheet, Dimensions } from 'react-native';

import { white, pink, primaryTint } from '../../../../styles/Colors';
import { fsr, width } from '../../../commons/metrics';


const styles = StyleSheet.create({
  containerMainPhoto: {
    width,
    height: width * 0.6,
    // margin: 20
  },
  mainPhoto: {
    width: '100%',
    height: '100%'
  },
  subPhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 10
  },
  play: {
    position: 'absolute',
    zIndex: 1,
    bottom: -20,
    right: 15,
    borderRadius: 10,
    backgroundColor: primaryTint,
    width: width * 0.3,
    height: width * 0.35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addToFavButton: {
      position: 'absolute',
      zIndex: 1,
      top: 30,
      right: 30,
      alignItems: 'center',
      justifyContent: 'center'
  },
  containerMainPhotoInfo: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  containerBackgroundPhotoInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20
  },
  photoInfo: {
    fontSize: fsr(3.8),
    color: white,
    fontWeight: 'bold'
  },
  photoStar: {
    flexDirection: 'row',
    marginTop: 8
  },
  buttonPlay: {
    marginLeft: 5,
  },
  star: {
    marginRight: 5
  }
});

export default styles;