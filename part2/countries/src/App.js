import React, {useState, useEffect} from 'react';
import axios from 'axios';




const Weather = (props) => {

  const {weather,capital} = props 

  return (
    <div>
      <h2>Weather in {capital}</h2>
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


  if(leng > 10) {
    return(
      <p>Too many matches, specify another filter</p>
    )
  }  
  else if(leng === 1){

    if(weather !== null){

      return ( 
        <div>
        <FullCountry country={filtered[0]} />
        <Weather weather={weather} capital={filtered[0].capital}/>
        </div>
      )
    }
    else
      return ( 
    
        <FullCountry country={filtered[0]} />
      )
  }
  if(showState.state && weather !== null){
    return(
      <div>
      <FullCountry country={filtered[showState.index]}/>
      <Weather weather={weather} capital={filtered[showState.index].capital}/>
      </div>
    )
  }
  return(
    filtered.map((country,index) => {
    
      return(
      <div>
      <Country key={index.name} country={country.name} />
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

  const filtered = filterState
  ? countries.filter((country) =>
      country.name.toLowerCase().includes(searchName.toLowerCase())
    )
  : countries;



  const weatherHook = () => {

    let Capital = null
    console.log(showState.state)

    if(filtered.length === 1 || showState.state){
      if (showState.state){
        console.log(filtered[showState.index])
        Capital = filtered[showState.index].capital
      }
      else{
        Capital = filtered[0].capital
      }
    }
    else{
      Capital = null
    }
  



  console.log(Capital)


    let url =  'http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + Capital
    console.log(url)
    if(Capital !== null){
    axios
      .get(url)
      .then(response => {
        setWeather(response.data)
    
      })   
    }
    else{
      setWeather(null)
    }

    
}

  useEffect(weatherHook,[filtered.length === 1 || showState.state])


  const buttonHandler = (event) => {
 

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
