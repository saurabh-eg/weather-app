# WeatherMama - Weather Forecast Application

A modern weather application built with Node.js, Express, and Handlebars that provides real-time weather information, forecasts, and air quality data.

## Features

- Real-time weather data display
- 5-day weather forecast
- Air Quality Index (AQI) monitoring
- Hourly weather forecasts
- Current location detection
- City-based weather search
- Responsive design for all devices
- Sunrise and sunset times
- Weather highlights (humidity, pressure, visibility, wind speed)

## Tech Stack

- **Frontend:** HTML, CSS, Bootstrap, JavaScript
- **Backend:** Node.js, Express.js
- **Template Engine:** Handlebars (HBS)
- **APIs:** OpenWeatherMap API
- **Additional Libraries:** 
  - Moment.js (Time formatting)
  - Font Awesome (Icons)
  - BoxIcons

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/weathermama.git
```

2. Install dependencies
```bash
cd weathermama
npm install
```

3. Create `.env` file and add your OpenWeatherMap API key
```env
API_KEY=your_api_key_here
```

4. Start the application
```bash
npm start
```

## Project Structure

```
weathermama/
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── images/
├── src/
│   └── app.js
├── templates/
│   ├── partials/
│   │   └── navbar.hbs
│   └── views/
│       ├── index.hbs
│       ├── weather.hbs
│       ├── about.hbs
│       └── 404err.hbs
├── package.json
└── README.md
```

## API Endpoints

- `/` - Home page
- `/weather` - Weather forecast page
- `/about` - About page
- `*` - 404 error page

## Environment Variables

- `API_KEY` - OpenWeatherMap API key
- `PORT` - Server port (default: 80)

## Features in Detail

1. **Current Weather**
   - Temperature
   - Weather condition
   - Location
   - Date and time

2. **5-Day Forecast**
   - Daily temperature
   - Weather icons
   - Date display

3. **Air Quality Index**
   - PM2.5 and PM10 levels
   - Various pollutant measurements
   - AQI category indication

4. **Weather Highlights**
   - Humidity percentage
   - Pressure measurement
   - Visibility range
   - Wind speed
   - "Feels like" temperature

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Credits

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons by [Font Awesome](https://fontawesome.com/) and [BoxIcons](https://boxicons.com/)

## Author

- Created with 🤍 by WeatherMama
