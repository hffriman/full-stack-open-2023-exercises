import './App.css'
import { useEffect, useState} from 'react'
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState([])
  const [searchWord, setSearchWord] = useState('')
  const [capital, setCapital] = useState(null)
  const [countryCode, setCountryCode] = useState(null)
  const [locationInformation, setLocationInformation] = useState([])
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [weatherInformation, setWeatherInformation] = useState([])

  const api_key = process.env.REACT_APP_API_KEY

  // Gets the country data
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [searchWord])

  // Gets the coordinates of the country's capital
  useEffect(() => {
      if (capital !== null && countryCode !== null) {
        axios
          .get(`http://api.openweathermap.org/geo/1.0/direct?q=${capital},${countryCode}&appid=${api_key}`)
          .then(response => {
            if (response.data) {
              setLocationInformation(response.data)
            }
          })
      }
  }, [capital, countryCode, api_key])


   // Gets the actual weather information of the capital (by using the coordinates)
  useEffect(() => {
      if (latitude !== null && longitude !== null) {
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`)
          .then(response => {
            if (response.data) {
              setWeatherInformation(response.data)
            }
          })
        }
  }, [latitude, longitude, api_key])


  const handleSearchWordChange = (event) => {
    setSearchWord(event.target.value)
  }


  const defineTargetLocation = (city, countryCode) => {
    setTimeout(() =>{
      setCapital(city)
      setCountryCode(countryCode)
    }, 100)
  }

  const defineWeatherInformation = () => {
    if (locationInformation.length !== 0) {
      setTimeout(() => {
        setLatitude(locationInformation[0].lat)
        setLongitude(locationInformation[0].lon)
      }, 100)
    }
  }

  const showWeather = () => {
    if (weatherInformation.length !== 0) {
      return(
        <>
          <h1>Weather in {capital}</h1>
          <p>Temperature {(weatherInformation.main.temp - 273.15).toFixed(1)} Celsius</p>
          <img 
            src={`https://openweathermap.org/img/wn/${weatherInformation.weather[0].icon}@2x.png`}
            alt={weatherInformation.weather[0].description}
          />
          <p>Wind {(weatherInformation.wind.speed.toFixed(1))} m/s</p>
        </>
      )
    } else {
        return null
    }
  }

  const FilteredCountries = () => {

    let foundCountries = countries.filter(country => {
      return country.name.common.toLowerCase().includes(searchWord.toLowerCase())
    })
    
    if (searchWord !== '') {
      if (foundCountries.length > 10) {
        return(
          <p>Too many matches, specify filter</p>
        )
      } else if (foundCountries.length > 1 && foundCountries.length < 11) {
        return foundCountries.map(country => {
          return(
            <div key={country.name.official}>
              {country.name.common}
              <button key={country.name.official} onClick={() => setSearchWord(country.name.common)}>
                show
              </button>
            </div>
          )
        })
      } else if (foundCountries.length === 1) {
          return foundCountries.map(country => {
            return(
              <div key={country.name.official}>
                <h1>{country.name.common}</h1>
                <p>Capital {country.capital} </p>
                <p>Area {country.area}</p>
                <h3>Languages:</h3>
                <ul>
                  {Object.entries(country.languages).map( ([key, value]) => {
                    return (
                      <li key={key}>{value}</li>
                    )
                  })}
                </ul>
                <img src={country.flags.png} alt={country.flags.alt}></img>
                {defineTargetLocation(country.capital[0], country.cca2)}
                {defineWeatherInformation()}
                {showWeather()}
              </div>
            )
          })
      } else {
        return null
      }
    }
  }
  
  return (
    <div className='App'>
      <div>
        Filter countries:
        <input 
          value={searchWord}
          onChange={handleSearchWordChange}
        />
      </div>
      <FilteredCountries/>
    </div>
  );
}

export default App;
