import { StyleSheet } from 'react-native';
import { primaryTint, white } from '../../../styles/Colors';
import { fsr } from '../../../components/commons/metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryTint
  },
  thumbnailContainer: {
    backgroundColor: '#85a6d3',
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerRow: {
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: primaryTint
  },
  profilename: {
    fontWeight: '700',
    fontSize: fsr(3.5),
    color: white
  },
  profileOptionText: {
    fontSize: fsr(1.6),
    paddingVertical: 10,
    color: white
  },
  thumbnailText: {
    color: 'white',
    fontSize: fsr(2.5)
  }
});

export default styles;
