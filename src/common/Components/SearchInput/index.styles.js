import {StyleSheet} from 'react-native';
import {respSize} from '../../../utils/FontSize';
import {Colors} from '../../Colors';
export const styles = StyleSheet.create({
  inputStyle: {
    padding: respSize(15),
    backgroundColor: '#d7d8d9',
    borderWidth: respSize(1),
    borderRadius: respSize(20),
    color: Colors.black,
  },
});
