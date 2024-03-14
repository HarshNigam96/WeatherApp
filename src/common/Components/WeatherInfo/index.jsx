import { FlatList, Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { imageSources } from '../../../assets/image/index';
import { respSize } from '../../../utils/FontSize';
import SearchInput from '../SearchInput';
import { styles } from './index.styles';

const WeatherInfo = ({weatherDetails, getWeatherData,forecastData}) => {
 const {
    name,
    weather: [{description, icon}],
    main: {temp, humidity, temp_max, temp_min},
    wind: {speed, deg},
  } = weatherDetails;
  const unixTimestampToDateTime = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <SearchInput getWeatherData={getWeatherData} />
        <View style={{flexGrow: 1, alignItems: 'center'}}>
          <Text style={styles.title}>{name}</Text>
        </View>
        <View style={styles.weatherLogo}>
          <Image
            source={{uri: `http://openweathermap.org/img/wn/${icon}@2x.png`}}
            style={styles.iconStyle}
          />
          <Text style={styles.currentTempStyle}>{temp} °C</Text>
        </View>
        <Text style={styles.descriptionTxt}>{description}</Text>
        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Image source={imageSources.temp} style={styles.smallIcons} />
            <Text style={styles.infoTxt}>{temp_min}°C</Text>
            <Text style={styles.infoTxt}>Minimum temp</Text>
          </View>
          <View style={styles.info}>
            <Image source={imageSources.humidity} style={styles.smallIcons} />
            <Text style={styles.infoTxt}>{temp_max} °C</Text>
            <Text style={styles.infoTxt}>Max temp</Text>
          </View>
        </View>
        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Image source={imageSources.humidity} style={styles.smallIcons} />
            <Text style={styles.infoTxt}>{humidity} %</Text>
            <Text style={styles.infoTxt}>Humidity</Text>
          </View>
          <View style={styles.info}>
            <Image source={imageSources.windSpeed} style={styles.smallIcons} />
            <Text style={styles.infoTxt}>
              {speed} m/s {deg} °
            </Text>
            <Text style={styles.infoTxt}>Wind Speed</Text>
          </View>
        </View>
        <View style={styles.extraInfo}></View>
        {forecastData && 
        <FlatList
        horizontal
        data={forecastData}
        renderItem={({item})=>{
          const {
            weather: [{description:forcastDescription, icon:foreCasticon}],
            main: {temp:forecastTemp},
          } = item;
          return(
            <View style={[styles.extraInfo,{margin:respSize(10)}]}>
            <View style={styles.info}>
              <Image source={{uri: `http://openweathermap.org/img/wn/${foreCasticon}.png`}}
 style={styles.smallIcons} />
              <Text style={styles.infoTxt}>{forcastDescription}</Text>
              <Text style={[styles.infoTxt,{fontWeight:"bold"}]}>Date</Text>
              <Text style={styles.infoTxt}>{unixTimestampToDateTime(item.dt)}</Text>
              <Text style={[styles.infoTxt,{fontWeight:"bold"}]}>Average Temperature</Text>
              <Text style={styles.infoTxt}>{(forecastTemp - 273.15).toFixed(2)} °C</Text>
            </View>
          </View>
          )
        }}
        />}
      </SafeAreaView>
    </ScrollView>
  );
};

export default WeatherInfo;
