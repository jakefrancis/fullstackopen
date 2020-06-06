import React, {useState, useEffect} from 'react';
import axios from 'axios';




const Weather = (props) => {

  const {weather} = props 

  return (
    <div>
      <h2>Weather in {weather.location.name}</h2>
      <p>temperature: {weather.current.temperature} C</p>
      <img src={weather.current.weather_icons[0]} alt={weather.current.weather_icons[1]}></img>
      <p>wind: {weather.current.wind_speed} mph direction{weather.current.wind_dir}</p>
    </div>
  )


}

const SearchBox = (props) => {
  
  const {searchHandler, searchName} =  props
    return (
    <div>
          Search for Country :<input onFocus={searchHandler} onChange={searchHandler} value={searchName} />
    </div>
    )
}

const Country = (props) => {
  const {country} = props
  return(
    <div>
      <p>{country}</p>
    </div>
  )
}

const FullCountry = (props) => {
  const {country} = props


  return (
  <div>
  <div>
    <h3>{country.name}</h3>
    <p>Capital: {country.capital}</p>
    <p>Population: {country.population}</p>
  </div>
  <div>
    <h2>Languages</h2>
    <ol>
    {country.languages.map((language) => <li>{language.name}</li>)}
    </ol>
    <img src={country.flag} alt={`The Flag of ${country.name}`}width='120' height='80'></img>
  </div>
  </div>
  )
}


const LimitDisplay = (props) => {
  const {filtered,showState,buttonHandler,weather} = props
  const leng = filtered.length
  console.log(filtered)

  if(leng > 10) {
    return(
      <p>Too many matches, specify another filter</p>
    )
  }  
  else if(leng === 1){

    if(filtered[0].captial = 'Stockholm'){
      console.log('stockholm')
      return ( 
        <div>
        <FullCountry country={filtered[0]} />
        <Weather weather={weather}/>
        </div>
      )
    }
    else
      return ( 
    
        <FullCountry country={filtered[0]} />
      )
  }
  if(showState.state){
    return(
      <FullCountry country={filtered[showState.index]}/>
    )
  }
  return(
    filtered.map((country,index) => {
      console.log(country,index)
    
      return(
      <div>
      <Country key={index} country={country.name} />
      <ShowCountryButton index ={index} key={index} country={country.name} buttonHandler={buttonHandler} />
      </div>
      )
      

      }
    )
  )
}

 const ShowCountryButton = (props) => {
   const {buttonHandler,country,index} = props
   return (
     <button index={index} country={country} onClick={buttonHandler}>show</button>
   )
 }



const App = () => {




  
  const [countries, setCountries] = useState([])
  const [filterState, setFilterState] = useState(false);
  const [searchName, setSearchName] = useState('')
  const [showState, setShowState] = useState({state: false, index: 0})
  const [weather, setWeather] = useState({})
  const api_key = process.env.REACT_APP_API_KEY
  
  
  
  const dbHook = () => {
    console.log('pending')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response =>{
        setCountries(response.data)
      })
  }

  useEffect(dbHook,[]);


  const searchHandler = (event) => {
    setSearchName(event.target.value)
    setShowState(false)
    if(event.target.value !== '') {
      setFilterState(true)
    }
    else{
      setFilterState(false)
    }
  }

  const weatherHook = () => {

    let url =  'http://api.weatherstack.com/current?access_key=' + api_key + '&query=Stockholm'

    axios
      .get(url)
      .then(response => {
        setWeather(response.data)
        console.log(response)
      })   
    
}

  useEffect(weatherHook,[])

  const filtered = filterState
    ? countries.filter((country) =>
        country.name.toLowerCase().includes(searchName.toLowerCase())
      )
    : countries;
  
  const buttonHandler = (event) => {
    console.log('index', event.target.getAttribute('index'))

    setShowState({state: true, index: event.target.getAttribute('index')});
    
 

  }

  return (    

  <div>
     <SearchBox searchHandler={searchHandler} searchName={searchName} />
     <LimitDisplay weather={weather} showState={showState} buttonHandler={buttonHandler} filtered={filtered} />
  </div>

  

  )

}

export default App;
