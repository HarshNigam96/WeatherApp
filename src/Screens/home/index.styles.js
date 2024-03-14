import {StyleSheet} from 'react-native';
import {Colors} from '../../common/Colors';
import {respSize} from '../../utils/FontSize';
export const styles = StyleSheet.create({
  loaderStyleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  notFoundScreenContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errTxt: {fontSize: respSize(20), color: Colors.black},
});
