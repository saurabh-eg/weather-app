let cityInput = document.getElementById('city_input'),
searchBtn = document.getElementById('searchBtn'),
locationcBtn = document.getElementById('locationBtn'),
api_key;
currentWeatherCard =  document.querySelectorAll('.weather-left .card')[0];
fiveDaysForecastCard =  document.querySelector('.day-forecast');
aqiCard = document.querySelectorAll('.highlights .card')[0];
sunriseCard = document.querySelectorAll('.highlights .card')[1];
HumidityVal = document.getElementById('HumidityVal');
VisibilityVal = document.getElementById('VisibilityVal'),
pressureVal = document.getElementById('pressureVal'),
windSpeedVal = document.getElementById('windSpeedVal'),
feelsVal = document.getElementById('feelsVal'),
hourlyForecastCard = document.querySelector('.hourly-forecast');

aqiList = [ 'Good', 'Fair',  'Moderate', 'Poor', 'Very Poor'];

// Fetch API key from backend
fetch('/api/config')
    .then(res => res.json())
    .then(config => {
        api_key = config.apiKey;
        // Initial weather fetch on page load
        window.dispatchEvent(new Event('load'));
    })
    .catch(err => {
        console.error('Failed to fetch API key:', err);
        alert('Failed to initialize weather app');
    });

function getWeatherDetails(name, lat, lon, state,country){
    if (!api_key) {
        alert('Weather app not initialized yet');
        return;
    }
    let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`;
    let WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
    let AIR_POLLUTION_API_URL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`;

    days =[
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'  
    ],
    Months =[
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    fetch(AIR_POLLUTION_API_URL).then(res => res.json()).then(data =>{
        console.log(data);
        let {co, no,  no2, o3, so2, pm2_5, pm10, nh3} = data.list[0].components;
        aqiCard.innerHTML = `
        <div class="card-head">
                <p>Air Quality Index</p>
                <p class="air-index aqi-${data.list[0].main.aqi}">${aqiList[data.list[0].main.aqi - 1]}</p>   
            </div>
    
            <div class="air-indices">
            <i class="fa-solid fa-wind"></i>
                <div class="item">
                    <p>PM.5</p>
                    <h2>${pm2_5}</h2>
                        </div>
                <div class="item">
                    <p>PM10</p>
                        <h2>${pm10}</h2>
                    </div>
                <div class="item">
                    <p>S02</p>
                        <h2>${so2}</h2>
                    </div>
                    <div class="item">
                        <p>CO</p>
                        <h2>${co}</h2>
                    </div>
                    <div class="item">
                        <p>NO</p>
                        <h2>${no}</h2>
                    </div>
                    <div class="item">
                        <p>NO2</p>
                        <h2>${no2}</h2>
                    </div>
                <div class="item">
                    <p>NH3</p>
                    <h2>${nh3}</h2>
                    </div>
                <div class="item">
                    <p>O3</p>
                    <h2>${o3}</h2>
                    </div>
            </div>
        `;
    }).catch(() =>{
        alert(' Error fetching data');
    
    });


    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
        let date = new Date();
        currentWeatherCard.innerHTML  = ` 
             <div class="current-weather">
                    <div class="details">
                    <p>Now</p>
                    <h2>${(data.main.temp - 273.15).toFixed(2)}&deg;C</h2>
                    <p>${data.weather[0].description}</p>
                </div>
                <div class="weather-icon">
                     <img src = "https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
                </div>
            </div>
            <hr>
            <div class="card-footer">
                <p><i class="fa-regular fa-calendar-days"></i> ${days[date.getDay()]}, ${date.getDate()},
                ${Months[date.getMonth()]}, ${date.getFullYear()}</p>
               <p><i class="fa-solid fa-location-dot"></i> ${ name}, ${state} ,${country}</p>
            </div>`;
    
        let {sunrise, sunset} = data.sys,
            {timezone, visibility} = data,
            {humidity,  pressure, feels_like} =  data.main,
            {speed}  = data.wind,

            sRiseTime = moment.utc(sunrise, 'X').add(timezone, 'second').format('hh:mm A'),
            sSetTime = moment.utc(sunset, 'X').add(timezone, 'second').format('hh:mm A');
        
        sunriseCard.innerHTML = `
         <div class="card-head">
             <p>Sunrise & Sunset</p>
         </div>
         <div class="sunrise-sunset">
             <div class="item">
                 <div class="icon">
                     <img height="70px" src="https://cdn-icons-png.flaticon.com/128/3222/3222792.png">
                 </div>
                 <div>
                     <p>Sunrise</p>
                     <h2>${sRiseTime}</h2>
                 </div>
             </div>
             <div class="item">
                 <div class="icon">
                     <img height="70px" src="https://cdn-icons-png.flaticon.com/128/10132/10132764.png">
                 </div>
                 <div>
                     <p>Sunset</p>
                     <h2>${sSetTime}</h2>
                 </div>
             </div>
         </div>
     `;

     HumidityVal.innerHTML = `${humidity} %`,
     pressureVal.innerHTML = `${pressure} hPa`,
     VisibilityVal.innerHTML = `${visibility / 1000} km`,
     windSpeedVal.innerHTML = `${speed} m/s`,
     feelsVal.innerHTML = `${(feels_like - 273.15).toFixed(2)} &deg;C`;

    }).catch(() => {
        alert(' Error to fetch current weather');
    });

    fetch(FORECAST_API_URL).then(res => res.json()).then(data => {
        let hourlyForecast = data.list;
        hourlyForecastCard.innerHTML =  '';
        for(i = 0; i <= 7; i++){
            let hrForecastDate = new Date(hourlyForecast[i].dt_txt);
            let hr = hrForecastDate.getHours();
            let a = 'PM';
            if(hr < 12) a = 'AM';
            if(hr == 0) hr = '12';
            if(hr > 12) hr = hr - 12;
            hourlyForecastCard.innerHTML += `
                 <div class="card">
                   <p>${hr} ${a}</p>
                     <img src = "https://openweathermap.org/img/wn/${hourlyForecast[i].weather[0].icon}.png" alt="">
                    <p>${(hourlyForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</p>
                </div>
            `;

        }


        let uniqueForecastDays =  [];
        let fiveDaysForecast = data.list.filter(forecast => {
            let forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });
        // console.log(fiveDaysForecast);
        fiveDaysForecastCard.innerHTML = '';
        for(i = 1; i < fiveDaysForecast.length; i++){
            let date  = new Date(fiveDaysForecast[i].dt_txt);
            fiveDaysForecastCard.innerHTML += `
                        
            <div class="forecast-item">
                    <div class="icon-wrapper">
                        <img src="https://openweathermap.org/img/wn/${fiveDaysForecast[i].weather[0].icon}.png">
                        <span>${(fiveDaysForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</span>
                    </div>
                    <p>${date.getDate()}  ${Months[date.getMonth()]}</p>

                    <p> ${days[date.getDay()]}</p>
                </div>

            `;
        }

    }).catch(() => {
        alert(' Error to fetch weather forecast');
    })

}

function getCityCoordinates(){
    let cityName = cityInput.value.trim();
    // console.log(cityNeme);
    cityInput.value = '';
    if(!cityName)return;
    let GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${api_key}`;
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        let {name, lat, lon, country,  state} = data[0];
        getWeatherDetails(name, lat, lon, state, country,);
    }).catch(() =>{
        alert('Data not found. Enter Corret CityNAME ');
    })
}


function getUserCoordinates() {
    navigator.geolocation.getCurrentPosition(position => {
        let {latitude, longitude} = position.coords;
        // console.log(latitude,  longitude);
        let GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`;
        fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
            let {name, lat, lon, country, state} = data[0];
            getWeatherDetails(name, latitude, longitude, state, country);
        }).catch(() => {
            alert('Data not found. Enter Correct City NAME ');
        },error =>{
            if(error.code === error.PERMISSION_DENIED){
                alert(' Permission Denied');

            }
        });
    })
}


cityInput.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        searchBtn.click(); 
    }
});

searchBtn.addEventListener('click', getCityCoordinates);
locationcBtn.addEventListener('click', getUserCoordinates);
cityInput.addEventListener('keyup', e => e.key === 'enter' &&  getCityCoordinates());
window.addEventListener('load', getCityCoordinates);