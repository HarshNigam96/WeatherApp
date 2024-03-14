import {useEffect, useState} from 'react';
import {ActivityIndicator, Platform, Text, View,PermissionsAndroid} from 'react-native';
import {Colors} from '../../common/Colors';
import SearchInput from '../../common/Components/SearchInput/index';
import WeatherInfo from '../../common/Components/WeatherInfo';
import {showToast} from '../../utils/ToastFunction';
import {styles} from './index.styles';
import {check, PERMISSIONS, RESULTS,request} from 'react-native-permissions';
const API_KEY = '06ef9dbcc7bf3390f4bf9e48adda2aac';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [forecastData, setForecastData] = useState(null);
  useEffect(() => {
    getWeather('New York');
  }, []);


  const getWeather = async city => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
      );
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
        getForecast(city);
        setIsLoading(false);
      } else {
        setWeatherData(null);
        setIsLoading(false);
      }
    } catch (err) {
      showToast(err.message);
    }
  };

  const getForecast = async city => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&cnt=40`,
      );
      if (response.ok) {
        const data = await response.json();
        const currentDate = new Date().toLocaleDateString('en-US');
        const uniqueDates = {};
        const upcomingData = data.list.filter(forecast => {
          const forecastDate = new Date(forecast.dt_txt.split(' ')[0]).toLocaleDateString('en-US');
          if (forecastDate === currentDate) return false; // Exclude today's forecast
          if (uniqueDates[forecastDate]) return false; // Exclude duplicates
          uniqueDates[forecastDate] = true;
          return true;
        });
        setForecastData(upcomingData);
        setIsLoading(false);
      } else {
        setWeatherData(null);
        setIsLoading(false);
      }
    } catch (err) {
      showToast(err.message);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loaderStyleContainer}>
        <ActivityIndicator color={Colors.black} size={'large'} />
      </View>
    );
  } else if (weatherData === null) {
    return (
      <View style={{flex: 1}}>
        <SearchInput getWeatherData={getWeather} />
        <View style={styles.notFoundScreenContainer}>
          <Text style={styles.errTxt}>City Not Found!</Text>
          <Text style={styles.errTxt}>Please Try Different City</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <WeatherInfo
        forecastData={forecastData}
        weatherDetails={weatherData}
        getWeatherData={getWeather}
      />
    </View>
  );
};

export default Weather;
