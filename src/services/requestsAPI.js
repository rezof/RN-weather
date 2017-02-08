import {Actions, Utils, dbAPI} from './';

const headers = {
  Accept: "application/json",
  cache: 'default',
  "Content-Type": "application/json",
}

const Get = (url) => {
  return fetch(url, {headers})
}

const Post = (url, data) => {

}

export const loadCities = () => {

}

export const searchCities = (term) => (dispatch) => {
  dispatch(Actions.CitySearchRequest(true));
  Get(`http://gd.geobytes.com/AutoCompleteCity?sort=size&q=${encodeURI(term)}`)
  .then(resp => resp.json())
  .then(data => {
    const filtered = data.filter((city) => !!city)
    return dispatch(Actions.CitySearchRequestComplete(filtered))
  })
  .catch(err => {dispatch(Actions.CitySearchRequest(false)); console.warn('searching for cities failed')});
}

export const addCity = (cityName) => (dispatch) => {
  Get(`http://gd.geobytes.com/GetCityDetails?fqcn=${encodeURI(cityName)}`)
    .then(resp => resp.json())
    .then(data => {
      const newCity = {text: data.geobytescity, value: data.geobytescityid, latitude: data.geobyteslatitude, longitude: data.geobyteslongitude}
      dispatch(Actions.AddCity(newCity))
      dbAPI.addCity(newCity)
    })
    .catch(err => console.warn("fetching city failed", err))
}

export const loadWeather = () => {

}

const darkskyKey = 'aa332aeb6411cf2b487a71dc083e1b89_';
const fetchCityWeather = ({text, longitude, latitude, value}) => (dispatch) => {
  dispatch(Actions.weatherFetching())
  console.log(`https://api.darksky.net/forecast/${darkskyKey}/${latitude},${longitude}`);
  Get(`https://api.darksky.net/forecast/${darkskyKey}/${latitude},${longitude}`, headers)
  .then(resp => resp.json())
  .then(data => {
    console.log(`https://api.darksky.net/forecast/${darkskyKey}/${latitude},${longitude}`, data);
    let cityData = {}
    cityData[value] = data
    dispatch(Actions.weatherFetchingComplete(cityData))
    dbAPI.saveWeather({weather: cityData})
  })
  .catch(err => {
    console.log('error on fetchWeather', err)
    dispatch(Actions.weatherFetchingFailed());
  })
}

export const CheckCityWeather = (city) =>
    (dispatch, getState) => {
      const {weather} = getState();
      const filteredData = Utils.filterOutDatedData(weather.data);
      console.log('API filtered data', weather);
      if(!filteredData[city.value] || (filteredData[city.value].hourly.data.length <= 42) || (filteredData[city.value].daily.data.length < 7)){
        console.log('CheckCityWeather city', city);
        fetchCityWeather(city)(dispatch);
        console.log('fetching');
      }else{
        console.log('updating');
        // updateWeatherData(data);
      }
    }

export {fetchCityWeather};
