
import './App.css';
import Moment from 'moment';
import { useState } from 'react';


function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(undefined);
  const [selectedLocationWeather, setselectedLocationWeather] = useState(undefined);
  const [location, setLocation] = useState([
    {
      name: 'Tallinn',
      latitude: 59.4370,
      longitude: 24.7536
    },

    {
      name: 'Madrid',
      latitude: 40.4167,
      longitude: -3.7038
    },

    {
      name: 'Rovaniemi',
      latitude: 66.5030,
      longitude: 25.7269
    }

  ]);

  const selectLocation = (location) => {
    setSelectedLocation(location);
    getLocationData(location);
  }


  const getLocationData = async (location) => {
    setIsLoading(true);
    const data = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,wind_speed_10m_max`);
    const dataJson = await data.json();
    setIsLoading(false);
    setselectedLocationWeather(dataJson);
    console.log(dataJson);
  }



  return (
    <div className="App">
      <header class="App-header" style={{ display: 'flex', flexDirection: 'row', gap: 24, padding: 24 }} >
        <div style={{ borderRight: '1px solid gray', padding: '0 24px 0 0' }} >
          <h3>Locations</h3>
          {location.map((location) => (
            <div key={location.name} align="left">
              <a onClick={() => selectLocation(location)}>{location.name}</a>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'Left' }} >
          {selectedLocation ? (
            <>
              <h3>Weather Forecast</h3>

              <div >
                <div><strong>{selectedLocation.name}</strong></div>
                {isLoading ? 'Laen..' : (
                  <div>
                      <div>It is {selectedLocationWeather.current.temperature_2m}{selectedLocationWeather.current_units.temperature_2m} in {selectedLocation.name} . </div>
                      <br />
                  </div>
                )}
                {selectedLocationWeather ? (
                  <>

                    {[...Array(6)].map((elementInArray, index) => (

                      <table>
                        {isLoading ? 'Loading..' : (

                         <tr>
                           <td> {Moment(selectedLocationWeather.daily.time[index]).format('DD-MMM-YYYY')} &nbsp;&nbsp;&nbsp;</td>
                           <td> {Moment(selectedLocationWeather.daily.sunrise[index]).format('LT')}/{Moment(selectedLocationWeather.daily.sunset[index]).format('LT')}</td>&nbsp;&nbsp;&nbsp;
                           <td> {selectedLocationWeather.daily.temperature_2m_max[index]}{selectedLocationWeather.daily_units.temperature_2m_max}/{selectedLocationWeather.daily.temperature_2m_min[index]}{selectedLocationWeather.daily_units.temperature_2m_min}</td>&nbsp;&nbsp;&nbsp;
                           <td> {selectedLocationWeather.daily.precipitation_probability_max[index]}{selectedLocationWeather.daily_units.precipitation_probability_max}</td>&nbsp;&nbsp;&nbsp;
                           <td> {selectedLocationWeather.daily.wind_speed_10m_max[index]}{selectedLocationWeather.daily_units.wind_speed_10m_max}</td>&nbsp;&nbsp;&nbsp;
                         </tr>
                        )}
                      </table>
                    )
                    )}
                  </>
                ) : null}
              </div>
            </>
          ) : (
            <>
              <h3>Weather Forecast</h3>
              <div>Please select city!</div>
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
