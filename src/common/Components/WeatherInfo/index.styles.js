import {StyleSheet} from 'react-native';
import {respSize} from '../../../utils/FontSize';
import {Colors} from '../../Colors';

export const styles = StyleSheet.create({
  container: {
    marginTop: respSize(25),
  },
  title: {
    fontWeight: 'bold',
    fontSize: respSize(30),
    color: Colors.black,
    textAlign: 'center',
  },
  weatherLogo: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconStyle: {
    width: respSize(200),
    height: respSize(200),
  },
  currentTempStyle: {
    fontSize: respSize(20),
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.black,
  },
  descriptionTxt: {
    textAlign: 'center',
    fontSize: respSize(20),
    color: Colors.black,
    fontWeight: '600',
  },
  extraInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: respSize(10),
  },
  info: {
    marginTop: respSize(10),
    width: respSize(150),
    backgroundColor: Colors.white,
    padding: respSize(10),
    borderRadius: respSize(15),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.lightGrey,
  },
  smallIcons: {
    height: respSize(40),
    width: respSize(40),
    resizeMode: 'contain',
    borderRadius: respSize(10),
  },
  infoTxt: {
    color: Colors.black,
    marginTop: respSize(5),
    textAlign: 'center',
  },
  toggleContainer: {
    flexGrow: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: respSize(20),
  },
});
