import { useState } from 'react';
import { TextInput, View } from 'react-native';
import { respSize } from '../../../utils/FontSize';
import { styles } from './index.styles';
const SearchInput = ({getWeatherData}) => {
  const [cityName, setCityName] = useState('');
  return (
    <View style={{margin: respSize(20)}}>
      <TextInput
        value={cityName}
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
