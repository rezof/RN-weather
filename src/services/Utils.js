export const filterOutDatedData = (data) => {
  let filteredData = {...data};
  Object.keys(filteredData).map((cityKey) => {
    const data = filteredData[cityKey];
    const hourly = {...data.hourly, data: filterHourlyData(data.hourly.data)};
    const daily = {...data.daily, data: filterHourlyData(data.daily.data)};
    filteredData[cityKey].hourly = hourly;
    filteredData[cityKey].daily = daily;
  })
  return filteredData
}

const filterHourlyData = (hourly = []) => {
  if(hourly.length > 1){
    return hourly.filter((ob) => {
      return (new Date(ob.time * 1000 + 3600) - new Date()) > 0 ? true : false;
    })
  }
  return [];
}

const filterDailyData = (daily = []) => {
  if(daily.length > 1){
    return daily.filter((ob) => {
      return (new Date(ob.time * 1000 + 3600) - new Date()) > 0 ? true : false;
    })
  }
  return [];
}
