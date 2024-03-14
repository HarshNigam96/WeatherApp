import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, AppState, PermissionsAndroid, Text, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { openSettings } from 'react-native-permissions';
import { Colors } from '../../common/Colors';
import SearchInput from '../../common/Components/SearchInput/index';
import WeatherInfo from '../../common/Components/WeatherInfo';
import { showToast } from '../../utils/ToastFunction';
import { styles } from './index.styles';
const API_KEY = '06ef9dbcc7bf3390f4bf9e48adda2aac';

const baseUrl="https://api.openweathermap.org/data/2.5";
const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [forecastData, setForecastData] = useState(null);
  const [appState, setAppState] = useState(AppState.currentState);
  const [IsRequestPermissionOpen, setIsRequestPermissionOpen] = useState(false);
  useEffect(() => {

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.addEventListener('change', handleAppStateChange).remove();
    };
  }, []);

  useEffect(() => {
    if (appState === 'active') {
      checkLocationPermission();
    }
  }, [appState]);


  const handleAppStateChange = (state) => {
    setAppState(state);
   
  };

  const checkLocationPermission = async () => {
    if(!IsRequestPermissionOpen){
      setIsRequestPermissionOpen(true)
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app requires access to your location.',
            buttonPositive: 'OK',
          }
        );
  
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
           getCurrentLocation()
        } else {
          Alert.alert(
            'Permission Denied',
            'This app requires access to your location to function properly.',
            [
              {
                text: 'OK',
                onPress: () => {
                  setIsRequestPermissionOpen(false)
                  openSettings()
                },
              },
            ],
          );
        }
      } catch (err) {
        console.warn(err);
      }
    }
    
  };

  const getCurrentLocation=async()=>{
    Geolocation.getCurrentPosition(
      (position) => {
        const {latitude,longitude}=position.coords
        getBytLatLon(latitude,longitude)
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
  }

  const getBytLatLon=async(latitude,longitude)=>{
    
    if(latitude&&longitude){
      try {
        const response = await fetch(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
        );
        if (response.ok) {
          const data = await response.json();
          getWeather(data[0].local_names.en)
          setWeatherData(data);
          getForecast(city);
          setIsLoading(false);
        } else {
          setWeatherData(null);
          setIsLoading(false);
        }
      } catch (err) {
      }
    }
  }

  const getWeather = async city => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/weather?q=${city}&appid=${API_KEY}&units=metric`,
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
        `${baseUrl}/forecast?q=${city}&appid=${API_KEY}&cnt=40`,
      );
      if (response.ok) {
        const data = await response.json();
        const currentDate = new Date().toLocaleDateString('en-US');
        const uniqueDates = {};
        const upcomingData = data.list.filter(forecast => {
          const forecastDate = new Date(forecast.dt_txt.split(' ')[0]).toLocaleDateString('en-US');
          if (forecastDate === currentDate) return false;
          if (uniqueDates[forecastDate]) return false; 
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
      <View style={{flex: 1,backgroundColor:Colors.white}}>
        <SearchInput getWeatherData={getWeather} />
        <View style={styles.notFoundScreenContainer}>
          <Text style={styles.errTxt}>City Not Found!</Text>
          <Text style={styles.errTxt}>Please Try Different City</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={{flex: 1,backgroundColor:Colors.white}}>
      <WeatherInfo
        forecastData={forecastData}
        weatherDetails={weatherData}
        getWeatherData={getWeather}
      />
    </View>
  );
};

export default Weather;
