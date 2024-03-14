import { useState } from 'react';
import { TextInput, View } from 'react-native';
import { respSize } from '../../../utils/FontSize';
import { styles } from './index.styles';
import { Colors } from '../../Colors';
const SearchInput = ({getWeatherData}) => {
  const [cityName, setCityName] = useState('');
  return (
    <View style={{margin: respSize(20)}}>
      <TextInput
        value={cityName.trimStart()}
        placeholderTextColor={Colors.black}
        placeholder="Search City...."
        onChangeText={val => setCityName(val)}
        maxLength={50}
        style={styles.inputStyle}
        onSubmitEditing={() => {
          getWeatherData(cityName);
          setCityName('');
        }}
      />
    </View>
  );
};

export default SearchInput;
