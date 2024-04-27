import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({});
  const [town, setTown] = useState('Mykolayiv');
  
  const key = '1558def4fd2382c7e4ab6b92e801fefb';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&lang=ru&units=metric&appid=${key}`;

  useEffect(() => {
    axios.get(url).then(res => setData(res.data));
    setTown('');
  }, []);
  
  const searchWeather = (e) => {
    if (e.key === 'Enter') {
      axios.get(url).then(res => setData(res.data));
      setTown('');
      
    }
  }

  return (
    <div className='app'>
      <div className='inp-field'>
        <input type="text" value={town} onChange={e => setTown(e.target.value)} onKeyDown={searchWeather} placeholder='Введите локацию'/>
      </div>
      <div className="container">
        <div className="header">
          <div className="city">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? (<h1>{data.main.temp.toFixed()}°C</h1>) : null}
          </div>
          <div className="desc">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>
        {data.name !== undefined && (
          <div className="footer">
            <div className="feels">
              {data.main && (
                <>
                  <p>Ощущается как</p>
                  <p className="bold">{data.main.feels_like.toFixed()}°C</p>
                </>
              )}
            </div>
            <div className="humidity">
              {data.main && (
                <>
                  <p>Влажность</p>
                  <p className="bold">{data.main.humidity}%</p>
                </>
              )}
            </div>
            <div className="wind">
              {data.wind && (
                <>
                  <p>Ветер</p>
                  <p className="bold">{data.wind.speed.toFixed()} м/с</p>
                </>
              )}
            </div>
          </div>
        )}
        
      </div>
    </div>
  )
}

export default App
