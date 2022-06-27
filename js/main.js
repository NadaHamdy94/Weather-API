let searchInput=document.querySelector('#searchInput');
let currentDayName=document.querySelector('#currentDayName');
let currentDate=document.querySelector('#currentDate');
let locationName=document.querySelector('.location');
let temp=document.querySelector('#temp_c');
let forcastCondition=document.querySelector('.forcast-condition');
let forcastIcon=document.querySelector('.forcast-icon');
let dayNextMaxTemp=document.querySelector('#dayNextMaxTemp');
let dayNextMinaxTemp=document.querySelector('#dayNextMinaxTemp');
let nextDayCondition=document.querySelector('#nextDayCondition');
let iconNextDay=document.querySelector('#iconNextDay');
let nextDayName=document.querySelector('#nextDayName');
let dayAfterNextDayName=document.querySelector('#dayAfterNextDayName');
let iconDayAfterNextDay=document.querySelector('#iconDayAfterNextDay');
let dayAfterNextMaxTemp=document.querySelector('#dayAfterNextMaxTemp');
let dayAfterNextMinTemp=document.querySelector('#dayAfterNextMinTemp');
let dayAfterNextDayCondition=document.querySelector('#dayAfterNextDayCondition');
let windSpeedInKilo=document.querySelector('#windSpeedInKilo');
let windDirection=document.querySelector('#windDirection')

async function getCurrentWeather(country='Egypt')
{
    let currentWeather=await fetch(`https://api.weatherapi.com/v1/current.json?key=14699c74a7e54078b78143249223005&q=${country}`)
    let response =await currentWeather.json();
    let {last_updated,temp_c,wind_kph,is_day,wind_dir}=response.current;
    //split last date updated
    const myArray=last_updated.split(" ");
    const date=myArray[0];
    const dayName = new Date(date).toLocaleString('en-us', {weekday:'long'});
    const monthName=new Date(date).toLocaleString('en-us', {month: 'long'});
    const dayNum=new Date(date).toLocaleString('en-us', {day:'numeric' });
    currentDayName.innerHTML=dayName;
    currentDate.innerHTML=dayNum + ' '+monthName;
    //location name 
    locationName.innerHTML=(response.location).name;
    //temp in c
    temp.innerHTML=temp_c + '<sup>o</sup>'+'C';
    //wind speed in kilo per hour && wind direction 
    windSpeedInKilo.innerHTML=wind_kph + 'km/h';
    windDirection.innerHTML=wind_dir;
    //check condition of weather 
    const condition= (response.current).condition.text;
    forcastCondition.innerHTML=condition;
    checkWeatherCondition(is_day,condition,forcastIcon);
    //get weather of Next Two Days
    getNextTwoDays(country);
}
async function getNextTwoDays(country)
{
    let weather=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=14699c74a7e54078b78143249223005&q=${country}&days=3`)
    let response =await weather.json();
    const [currentDay,dayNext,dayAfterNext]=response.forecast.forecastday;
    //weather next of current day
    getNextDayWeather(dayNext);
    //weather day after next 
    getDayAfterNextWeather(dayAfterNext);
}
function getNextDayWeather(dayNext)
{
    const {maxtemp_c,mintemp_c} =dayNext.day;
    const {text} = dayNext.day.condition;
    const{date}=dayNext;
    const dayName = new Date(date).toLocaleString('en-us', {weekday:'long'});
    nextDayName.innerHTML=dayName;
    dayNextMaxTemp.innerHTML=maxtemp_c+'<sup>o</sup>'+'C';
    dayNextMinaxTemp.innerHTML=mintemp_c+'<sup>o</sup>';
    nextDayCondition.innerHTML=text;
    checkWeatherCondition(undefined,text,iconNextDay)
}
function getDayAfterNextWeather(dayAfterNext)
{
    const {maxtemp_c,mintemp_c} =dayAfterNext.day;
    const {text} = dayAfterNext.day.condition;
    const{date}=dayAfterNext;
    const dayName = new Date(date).toLocaleString('en-us', {weekday:'long'});
    dayAfterNextDayName.innerHTML=dayName;
    dayAfterNextMaxTemp.innerHTML=maxtemp_c+'<sup>o</sup>'+'C';
    dayAfterNextMinTemp.innerHTML=mintemp_c+'<sup>o</sup>';
    dayAfterNextDayCondition.innerHTML=text;
    checkWeatherCondition(undefined,text,iconDayAfterNextDay)
}
function checkWeatherCondition(is_day,condition,iconLocation)
{
    if(condition == 'Sunny' && is_day == 1 || condition =='Sunny' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/113.png" alt="Sunny">';
    }
    else if (condition == 'Clear' && is_day == 0  || condition == 'Clear' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/113.png" alt="Clear">';
    }
    else if (condition == 'Partly cloudy' && is_day == 1 || condition == 'Partly cloudy' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/116.png" alt="Partly cloudy">';
    }
    else if (condition == 'Partly cloudy' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/116.png" alt="Partly cloudy">';
    }
    else if (condition == 'Cloudy' && is_day == 1 || condition == 'Cloudy' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/119.png" alt="Cloudy">';
    }
    else if (condition == 'Cloudy' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/119.png" alt="Cloudy">';
    }
    else if (condition == 'Overcast' && is_day == 1 || condition == 'Overcast' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/122.png" alt="Overcast">';
    }
    else if (condition == 'Overcast' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/122.png" alt="Overcast">';
    }
    else if (condition == 'Mist' && is_day == 1 || condition == 'Mist' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/143.png" alt="Mist">';
    }
    else if (condition == 'Mist' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/143.png" alt="Mist">';
    }
    else if (condition == 'Patchy rain possible' && is_day == 1 || condition == 'Patchy rain possible' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/176.png" alt="Patchy rain possible">';
    }
    else if (condition == 'Patchy rain possible' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/176.png" alt="Patchy rain possible">';
    }
    else if (condition == 'Patchy snow possible' && is_day == 1 || condition == 'Patchy snow possible' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/179.png" alt="Patchy snow possible">';
    }
    else if (condition == 'Patchy snow possible' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/179.png" alt="Patchy snow possible">';
    }
    else if (condition == 'Patchy sleet possible' && is_day == 1 || condition == 'Patchy sleet possible' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/182.png" alt="Patchy sleet possible">';
    }
    else if (condition == 'Patchy sleet possible' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/182.png" alt="Patchy sleet possible">';
    }
    else if (condition == 'Patchy freezing drizzle possible' && is_day == 1 || condition == 'Patchy freezing drizzle possible' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/185.png" alt="Patchy freezing drizzle possible">';
    }
    else if (condition == 'Patchy freezing drizzle possible' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/185.png" alt="Patchy freezing drizzle possible">';
    }
    else if (condition == 'Thundery outbreaks possible' && is_day == 1 || condition == 'Thundery outbreaks possible' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/200.png" alt="Thundery outbreaks possible">';
    }
    else if (condition == 'Thundery outbreaks possible' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/200.png" alt="Thundery outbreaks possible">';
    }
    else if (condition == 'Blowing snow' && is_day == 1 || condition == 'Blowing snow' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/227.png" alt="Blowing snow">';
    }
    else if (condition == 'Blowing snow' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/227.png" alt="Blowing snow">';
    }
    else if (condition == 'Blizzard' && is_day == 1 || condition == 'Blizzard' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/230.png" alt="Blizzard">';
    }
    else if (condition == 'Blizzard' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/230.png" alt="Blizzard">';
    }
    else if (condition == 'Fog' && is_day == 1 || condition == 'Fog' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/248.png" alt="Fog">';
    }
    else if (condition == 'Fog' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/248.png" alt="Fog">';
    }
    else if (condition == 'Freezing fog' && is_day == 1 || condition == 'Freezing fog' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/260.png" alt="Freezing fog">';
    }
    else if (condition == 'Freezing fog' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/260.png" alt="Freezing fog">';
    }
    else if (condition == 'Patchy light drizzle' && is_day == 1 || condition == 'Patchy light drizzle' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/263.png" alt="Patchy light drizzle">';
    }
    else if (condition == 'Patchy light drizzle' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/263.png" alt="Patchy light drizzle">';
    }
    else if (condition == 'Light drizzle' && is_day == 1 || condition == 'Light drizzle' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/266.png" alt="Light drizzle">';
    }
    else if (condition == 'Light drizzle' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/266.png" alt="Light drizzle">';
    }
    else if (condition == 'Freezing drizzle' && is_day == 1 || condition == 'Freezing drizzle' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/281.png" alt="Freezing drizzle">';
    }
    else if (condition == 'Freezing drizzle' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/281.png" alt="Freezing drizzle">';
    }
    else if (condition == 'Heavy freezing drizzle' && is_day == 1 || condition == 'Heavy freezing drizzle' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/284.png" alt="Heavy freezing drizzle">';
    }
    else if (condition == 'Heavy freezing drizzle' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/284.png" alt="Heavy freezing drizzle">';
    }
    else if (condition == 'Patchy light rain' && is_day == 1 || condition == 'Patchy light rain' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/293.png" alt="Patchy light rain">';
    }
    else if (condition == 'Patchy light rain' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/293.png" alt="Patchy light rain">';
    }
    else if (condition == 'Light rain' && is_day == 1 || condition == 'Light rain' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/296.png" alt="Light rain">';
    }
    else if (condition == 'Light rain' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/296.png" alt="Light rain">';
    }
    else if (condition == 'Moderate rain at times' && is_day == 1 || condition == 'Moderate rain at times' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/299.png" alt="Moderate rain at times">';
    }
    else if (condition == 'Moderate rain at times' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/299.png" alt="Moderate rain at times">';
    }
    else if (condition == 'Moderate rain' && is_day == 1 || condition == 'Moderate rain' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/302.png" alt="Moderate rain">';
    }
    else if (condition == 'Moderate rain' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/302.png" alt="Moderate rain">';
    }
    else if (condition == 'Heavy rain at times' && is_day == 1 || condition == 'Heavy rain at times' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/305.png" alt="Heavy rain at times">';
    }
    else if (condition == 'Heavy rain at times' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/305.png" alt="Heavy rain at times">';
    }
    else if (condition == 'Heavy rain' && is_day == 1 || condition == 'Heavy rain' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/308.png" alt="Heavy rain">';
    }
    else if (condition == 'Heavy rain' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/308.png" alt="Heavy rain">';
    }
    else if (condition == 'Light freezing rain' && is_day == 1 || condition == 'Light freezing rain' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/311.png" alt="Light freezing rain">';
    }
    else if (condition == 'Light freezing rain' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/311.png" alt="Light freezing rain">';
    }
    else if (condition == 'Moderate or heavy freezing rain' && is_day == 1 || condition == 'Moderate or heavy freezing rain' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/314.png" alt="Moderate or heavy freezing rain">';
    }
    else if (condition == 'Moderate or heavy freezing rain' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/314.png" alt="Moderate or heavy freezing rain">';
    }
    else if (condition == 'Light sleet' && is_day == 1 || condition == 'Light sleet' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/317.png" alt="Light sleet">';
    }
    else if (condition == 'Light sleet' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/317.png" alt="Light sleet">';
    }
    else if (condition == 'Moderate or heavy slee' && is_day == 1 || condition == 'Moderate or heavy slee' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/320.png" alt="Moderate or heavy slee">';
    }
    else if (condition == 'Moderate or heavy slee' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/320.png" alt="Moderate or heavy slee">';
    }
    else if (condition == 'Patchy light snow' && is_day == 1 || condition == 'Patchy light snow' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/323.png" alt="Patchy light snow">';
    }
    else if (condition == 'Patchy light snow' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/323.png" alt="Patchy light snow">';
    }
    else if (condition == 'Light snow' && is_day == 1 || condition == 'Light snow' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/326.png" alt="Light snow">';
    }
    else if (condition == 'Light snow' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/326.png" alt="Light snow">';
    }
    else if (condition == 'Patchy moderate snow' && is_day == 1 || condition == 'Patchy moderate snow' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/329.png" alt="Patchy moderate snow">';
    }
    else if (condition == 'Patchy moderate snow' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/329.png" alt="Patchy moderate snow">';
    }
    else if (condition == 'Moderate snow' && is_day == 1 || condition == 'Moderate snow' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/332.png" alt="Moderate snow">';
    }
    else if (condition == 'Moderate snow' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/332.png" alt="Moderate snow">';
    }
    else if (condition == 'Patchy heavy snow' && is_day == 1 || condition == 'Patchy heavy snow' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/335.png" alt="Patchy heavy snow">';
    }
    else if (condition == 'Patchy heavy snow' && is_day == 0 ) 
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/335.png" alt="Patchy heavy snow">';
    }
    else if (condition == 'Heavy snow' && is_day == 1 || condition == 'Heavy snow' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/338.png" alt="Heavy snow">';
    }
    else if (condition == 'Heavy snow' && is_day == 0)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/338.png" alt="Heavy snow">';
    }
    else if (condition == 'Ice pellets' && is_day == 1 || condition == 'Ice pellets' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/350.png" alt="Ice pellets">';
    }
    else if (condition == 'Ice pellets' && is_day == 0)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/350.png" alt="Ice pellets">';
    }
    else if (condition == 'Light rain shower' && is_day == 1 || condition == 'Light rain shower' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/353.png" alt="Light rain shower">';
    }
    else if (condition == 'Light rain shower' && is_day == 0)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/353.png" alt="Light rain shower">';
    }
    else if (condition == 'Moderate or heavy rain shower' && is_day == 1 || condition == 'Moderate or heavy rain shower' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/356.png" alt="Moderate or heavy rain shower">';
    }
    else if (condition == 'Moderate or heavy rain shower' && is_day == 0)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/356.png" alt="Moderate or heavy rain shower">';
    }
    else if (condition == 'Torrential rain shower' && is_day == 1 || condition == 'Torrential rain shower' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/359.png" alt="Torrential rain shower">';
    }
    else if (condition == 'Torrential rain shower' && is_day == 0)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/359.png" alt="Torrential rain shower">';
    }
    else if (condition == 'Light sleet showers' && is_day == 1 || condition == 'Light sleet showers' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/362.png" alt="Light sleet showers">';
    }
    else if (condition == 'Light sleet showers' && is_day == 0)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/362.png" alt="Light sleet showers">';
    }
    else if (condition == 'Moderate or heavy sleet showers' && is_day == 1 || condition == 'Moderate or heavy sleet showers' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/365.png" alt="Moderate or heavy sleet showers">';
    }
    else if (condition == 'Moderate or heavy sleet showers' && is_day == 0)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/365.png" alt="Moderate or heavy sleet showers">';
    }
    else if (condition == 'Light snow showers' && is_day == 1 || condition == 'Light snow showers' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/368.png" alt="Light snow showers">';
    }
    else if (condition == 'Light snow showers' && is_day == 0)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/368.png" alt="Light snow showers">';
    }
    else if (condition == 'Moderate or heavy snow showers' && is_day == 1 || condition == 'Moderate or heavy snow showers' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/371.png" alt="Moderate or heavy snow showers">';
    }
    else if (condition == 'Moderate or heavy snow showers' && is_day == 0)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/371.png" alt="Moderate or heavy snow showers">';
    }
    else if (condition == 'Light showers of ice pellets' && is_day == 1 || condition == 'Light showers of ice pellets' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/374.png" alt="Light showers of ice pellets">';
    }
    else if (condition == 'Light showers of ice pellets' && is_day == 0)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/374.png" alt="Light showers of ice pellets">';
    }
    else if (condition == 'Moderate or heavy showers of ice pellets' && is_day == 1 || condition == 'Moderate or heavy showers of ice pellets' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/377.png" alt="Moderate or heavy showers of ice pellets">';
    }
    else if (condition == 'Moderate or heavy showers of ice pellets' && is_day == 0)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/377.png" alt="Moderate or heavy showers of ice pellets">';
    }
    else if (condition == 'Patchy light rain with thunder' && is_day == 1 || condition == 'Patchy light rain with thunder' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/386.png" alt="Patchy light rain with thunder">';
    }
    else if (condition == 'Patchy light rain with thunder' && is_day == 0)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/386.png" alt="Patchy light rain with thunder">';
    }
    else if (condition == 'Moderate or heavy rain with thunder' && is_day == 1 || condition == 'Moderate or heavy rain with thunder' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/389.png" alt="Moderate or heavy rain with thunder">';
    }
    else if (condition == 'Moderate or heavy rain with thunder' && is_day == 0)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/389.png" alt="Moderate or heavy rain with thunder">';
    }
    else if (condition == 'Patchy light snow with thunder' && is_day == 1 || condition == 'Patchy light snow with thunder' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/392.png" alt="Patchy light snow with thunder">';
    }
    else if (condition == 'Patchy light snow with thunder' && is_day == 0)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/392.png" alt="Patchy light snow with thunder">';
    }
    else if (condition == 'Moderate or heavy snow with thunder' && is_day == 1 || condition == 'Moderate or heavy snow with thunder' && is_day == undefined)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/day/395.png" alt="Moderate or heavy snow with thunder">';
    }
    else if (condition == 'Moderate or heavy snow with thunder' && is_day == 0)
    {
        iconLocation.innerHTML='<img src="images/weather/64x64/night/395.png" alt="Moderate or heavy snow with thunder">';
    }

}
async function searchCountryWeather()
{
  if(searchInput.value != '')
  {
    let countryWeather=await fetch(`http://api.weatherapi.com/v1/search.json?key=14699c74a7e54078b78143249223005&q=${searchInput.value}`)
    let response =await countryWeather.json();
    let cityName = '';
    for (let index = 0; index < response.length; index++) 
    {
        if((searchInput.value).toLowerCase() == (response[index].name).toLowerCase())
        {
            cityName=response[index].name;
        }
        else if(cityName == '')
        {
            cityName=response[0].country;
        }
        await getCurrentWeather(cityName);
    }
     
  }
}

 (async function (){
    await getCurrentWeather();
})();
if(searchInput != null)
{
    searchInput.addEventListener('input',async function (){
        await searchCountryWeather();
    })
}

