import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import Dayforecast from './Daysforecast';
export const Mycontext = createContext()
function App() {
  const [city, setCity] = useState("");
  const [datas, setDataFetched] = useState(null);
  const [loading, setLoading] = useState(true);
  const apikey = 'ad3efca5d84f407ea1b70211242509';

  const fetchweather = async () => {
    if (city.trim() === "") {
      alert("Please enter a city name");
      return;
    }
    setLoading(true); 
    try {
      console.log("Fetching data from: http://api.weatherapi.com/v1/forecast.json?key=" + apikey + "&q=" + city + "&days=7&aqi=no&alerts=yes");
      const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${city}&days=7&aqi=no&alerts=yes`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched data:", data);
      setDataFetched(data);
      setCity('')
    } catch (error) {
      console.error("Error fetching the weather data:", error);
      alert("Error in fetching data");
    } finally {
      setLoading(false); 
    }
  };

  useEffect=(() => {
    if (city) {
      fetchweather();
    }
  }, [city]);

  const startfetching = () => {
    if (city) {
      fetchweather();
      
    } else {
      alert("Please enter a city to search");
    }
  };

  return (
    <div className="body">
      <div className="content">
        <div className="location">
          <button type="submit" onClick={startfetching} className="submit">
            Search
          </button>
          <div className="locationinfo">
            <input
              type="text"
              placeholder="Search"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="search"
            />
          </div>
        </div>
        
        {loading ? (
          <div className="initial-view">
            <h1 className="Heading">WELCOME TO MY WEATHER-WEBSITE</h1>
            <p className="des">PLEASE SEARCH TO KNOW WEATHER UPDATES</p>
          </div>
        ) : (
          <>
            <div className="today">
              <div className="locationinfo">
                {datas && (
                  <div className="locationbox">
                    <h1 className="locationName">{datas.location.name}</h1>
                    <p className="locationDetails">
                      {datas.location.region}, {datas.location.country}
                    </p>
                    <p className="date">{datas.current.last_updated}</p>
                    <img src={datas.current.condition.icon} className="icon" />
                    <p className="text">Condition : {datas.current.condition.text}</p>
                  </div>
                )}
              </div>

              {datas && (
                <div className="tempBox">
                  <p className="temp">{datas.current.temp_c}°c</p>
                  <p className="tempmaxmin">
                    {datas.forecast.forecastday[0].day.maxtemp_c}°c / {datas.forecast.forecastday[0].day.mintemp_c}°c
                  </p>
                </div>
              )}
            </div>
            <Mycontext.Provider value={datas}>
            <Dayforecast />
            </Mycontext.Provider>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
