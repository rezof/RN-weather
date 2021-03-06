import {Actions, Utils, dbAPI} from './';
import {DS_KEY, DS_API_URL, GEOBYTES_API_URL} from './../resources/data';

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
  Get(`${GEOBYTES_API_URL}/AutoCompleteCity?sort=size&q=${encodeURI(term)}`)
  .then(resp => resp.json())
  .then(data => {
    const filtered = data.filter((city) => !!city)
    return dispatch(Actions.CitySearchRequestComplete(filtered))
  })
  .catch(err => {dispatch(Actions.CitySearchRequest(false)); console.warn('searching for cities failed')});
}

export const addCity = (cityName) => (dispatch, getState) => {
  let {cities: {cities}} = getState();
  Get(`${GEOBYTES_API_URL}/GetCityDetails?fqcn=${encodeURI(cityName)}`)
    .then(resp => resp.json())
    .then(data => {
      const newCity = {text: data.geobytescity, value: data.geobytescityid, latitude: data.geobyteslatitude, longitude: data.geobyteslongitude}
      if(cities.filter((c) => {return c.value == newCity.value}).length == 0){
        dispatch(Actions.AddCity(newCity))
        dbAPI.addCity(newCity)
        fetchCityWeather(newCity)(dispatch);
      }else{
        dispatch(Actions.ChangeCurrentCity(newCity))
      }
    })
    .catch(err => console.warn("fetching city failed", err))
}

export const loadWeather = () => {

}

const fetchCityWeather = ({text, longitude, latitude, value}) => (dispatch) => {
  dispatch(Actions.weatherFetching())
  Get(`${DS_API_URL}/${DS_KEY}/${latitude},${longitude}`, headers)
  .then(resp => resp.json())
  .then(data => {
    console.log(`got data for city ${text}`, data);
    let cityData = {}
    cityData[value] = data
    dispatch(Actions.weatherFetchingComplete(cityData))
    dbAPI.saveWeather(cityData)
  })
  .catch(err => {
    console.log('error on fetchWeather', err);
    dispatch(Actions.weatherFetchingFailed());
  })
}

export const CheckCityWeather = (city) =>
    (dispatch, getState) => {
      const {weather} = getState();
      const filteredData = Utils.filterOutDatedData(weather.data);
      console.log('filtered data', filteredData);
      if(!filteredData[city.value] || (filteredData[city.value].hourly.data.length <= 42) || (filteredData[city.value].daily.data.length < 7)){
        fetchCityWeather(city)(dispatch);
        console.log('fetching');
      }else{
        console.log('updating');
        dbAPI.saveWeather(filteredData);
        dispatch(Actions.WeatherDataFiltered(filteredData));
      }
    }

export {fetchCityWeather};
