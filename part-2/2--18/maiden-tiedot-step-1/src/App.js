import './App.css'
import { useEffect, useState} from 'react'
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState([])
  const [searchWord, setSearchWord] = useState('')
  

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [searchWord])

  const handleSearchWordChange = (event) => {
    setSearchWord(event.target.value)
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
