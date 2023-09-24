import React, { useEffect, useState } from 'react';
import './App.css';
import ForecastBox from './Components/ForecastBox';
import weatherKey from './weatherKey.js';
import pic from './assets/googleweather.gif';
import {
  clear,
  clouds,
  doodle,
  drizzle,
  haze,
  humidityDark,
  humidityLight,
  mist,
  nightclear,
  nightclouds,
  nightdrizzle,
  pressureDark,
  pressureLight,
  rain,
  snow,
  visibilityDark,
  visibilityLight,
  windDark,
  windLight,
} from './assets/allPic';

function App() {
  let [inputValue, setInputValue] = useState('');
  let [data, setData] = useState(null);
  let [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [weatherIcon, setWeatherIcon] = useState('');
  const [checkNight,setCheckNight] = useState(true)

 
  const checkWeather = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      if (inputValue.trim() === '') {
        // throw new Error('Please enter a valid city name.');
      setError("Please enter a valid city name.");
      }
      const data = await weatherKey(inputValue.trim());
      if (data?.response?.status == 404) {
        setError(`${inputValue} is not a valid city Name`);
        setInputValue("")
        setLoading(false);
        checkNight ? document.documentElement.style.setProperty('--themeColor',"#fff") : document.documentElement.style.setProperty('--themeColor',"black")
        return;
      }
      setData(data);
      const dt = data?.dt;
      const sunRise = data.sys.sunrise;
      const sunSet = data.sys.sunset;
      const isNight = dt > sunSet || dt < sunRise
      setCheckNight(isNight)
      
      if(isNight){
        document.documentElement.style.setProperty('--themeColor',"#fff")
      }else{
        document.documentElement.style.setProperty('--themeColor',"black")
      }
      
      const weatherIcons = {
        Clouds: isNight ? nightclouds : clouds,
        Clear: isNight ? nightclear : clear,
        Rain: rain,
        Thunderstorm: rain,
        Drizzle: isNight ? nightdrizzle : drizzle,
        Mist: mist,
        Haze: haze,
        Smoke: haze,
        Snow: snow,
      };

      const mainWeather = data.weather[0].main;
      setWeatherIcon(weatherIcons[mainWeather]);
      setError(null);
      setLoading(false);
      setInputValue('');
    } catch (err) {
      setData(null);
      setError(err.message);
      setLoading(false);
    }
  };


  return (
    <>
      <div className="main">
        <div className='weatherbox' style={{background: checkNight  ? "linear-gradient(rgb(46, 51, 56) 0%, rgb(40, 67, 107) 36%) rgb(46, 51, 56)" : "linear-gradient(rgb(124, 184, 255) 0%, rgb(223, 255, 251) 57%) rgb(223, 255, 251)" }}>
          {loading ? (
            <img
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              width={'100'}
              src={pic}
              alt="Loading..."
            />
          ) : (
            <>
              <h3>Weather App</h3>
              <div className="inputsection">
                <form onSubmit={checkWeather} className="">
                  <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    type="text"
                    placeholder="Search"
                  />
                  <button type="submit">Search</button>
                </form>
              </div>
              {error ? (
                <div className="error">
                  <p style={{textAlign:"center"}}>{error}</p>
                  <div className='doodleWraper'><img src={doodle} /></div>
                </div>
              ) : data !== null ? (
                <>
                  <h4>
                    <b>
                      {data.weather[0].main} | Feels like:{' '}
                      {data.main.feels_like.toFixed(0)}
                      <sup>
                        <small>o</small>
                      </sup>
                      C
                    </b>
                  </h4>
                  <img width={'100px'} src={weatherIcon} alt="" />
                  <h1 className="centigrate">
                    {data.main.temp.toFixed(0)}
                    <span>
                      <sup style={{ fontSize: '40px' }}>o</sup>C
                    </span>
                  </h1>

                  <h2 className="city">
                    {data.name}, <span style={{ fontSize: '13px' }}>{data.sys.country}</span>
                  </h2>

                  <div className="ForecastDetails">
                    <p>Forecast Details</p>
                    <div className="forecastWraper">
                      {[
                        {
                          text: 'Wind Speed',
                          num: `${data.wind.speed} Km/h`,
                          img: checkNight ? windLight : windDark,
                        },
                        {
                          text: 'Humidity',
                          num: `${data.main.humidity}%`,
                          img: checkNight ? humidityLight : humidityDark,
                        },
                        {
                          text: 'Visibility',
                          num: `${data.visibility} m`,
                          img: checkNight ? visibilityLight : visibilityDark,
                        },
                        {
                          text: 'Pressure',
                          num: `${data.main.pressure} mBar`,
                          img: checkNight ? pressureLight : pressureDark,
                        },
                      ].map((elem, index) => {
                        const { text, num, img } = elem;
                        return <ForecastBox key={index} pic={img} title={text} num={num} />;
                      })}
                    </div>
                  </div>
                </>
              ) : <div className='doodleWraper'><img src={doodle} /></div>}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

