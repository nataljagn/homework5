
import './App.css';
import Moment from 'moment';
import 'moment/locale/et';
import { useState } from 'react';
import NewLocation from './NewLocation';



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
      name: 'Oslo',
      latitude: 59.9114,
      longitude: 10.7579
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

  }

  const AddNewLocation = (newLocation) => {
    setLocation((currentLocations) => [...currentLocations, newLocation]);
  };

  return (
    <div className="App">
      <header className="App-header" style={{ display: 'flex', flexDirection: 'row', gap: 24, padding: 24 }} >
        <div style={{ textAlign: 'Left',borderRight: '1px solid gray', padding: '0 24px 0 0' }} >
          <h3>Locations</h3>
          {location.map((location) => (
            <div key={location.name} align="left">
              <a onClick={() => selectLocation(location)}>{location.name}</a>
            </div>
          ))}
       
          <h4>Add new location</h4>
          <NewLocation onAddNewLocation={AddNewLocation} locations={location} />
        </div>
        <div style={{ textAlign: 'Left' }} >
          {selectedLocation ? (
            selectedLocationWeather && selectedLocationWeather.daily ? (
              <>
              <h3>Weather Forecast</h3>

              <div >
                <div><strong>{selectedLocation.name}</strong></div>
                {isLoading ? 'Loading..' : (
                  <div>
                    <div>It is {Math.round(selectedLocationWeather.current.temperature_2m)}{selectedLocationWeather.current_units.temperature_2m} in {selectedLocation.name} . </div>
                    <br />
                  </div>
                )}
       
                  <table style={{ border: "1px solid grey", padding: 24 }} >

                    <tr>
                      <th width="200" align="left">Date</th>
                      <th width="240" align="left">Sunrise/Sunset</th>
                      <th width="240" align="left">Min/Max Temp</th>
                      <th width="100" align="left">Ppt %</th>
                      <th width="160" align="left">Wind max</th>
                    </tr>
                    {[...Array(selectedLocationWeather.daily.time.length)].map((key, index) => (
                      <tr>
                        
                        <td align="left">  {Moment(selectedLocationWeather.daily.time[index]).format('DD-MMM-YYYY')} </td>
                        <td align="left">  {Moment(selectedLocationWeather.daily.sunrise[index]).format('LT')}/{Moment(selectedLocationWeather.daily.sunset[index]).format('LT')}</td>
                        <td align="center">  {Math.round(selectedLocationWeather.daily.temperature_2m_max[index])}{selectedLocationWeather.daily_units.temperature_2m_max}/{Math.round(selectedLocationWeather.daily.temperature_2m_min[index])}{selectedLocationWeather.daily_units.temperature_2m_min}</td>
                        <td align="left">  {selectedLocationWeather.daily.precipitation_probability_max[index]}{selectedLocationWeather.daily_units.precipitation_probability_max}</td>
                        <td align="left">  {Math.round((selectedLocationWeather.daily.wind_speed_10m_max[index]) * 1000 / (60 * 60))}m/s</td>
                      </tr>
                    )
                    )}
                  </table>
                
              </div>
            </>
            ) : (
              <>
              <h3>Weather Forecast</h3>
              <div>Wrong data!!!</div>
            </>
            )
            
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
