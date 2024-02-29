import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Text, ActivityIndicator, Image } from 'react-native'
import axios from 'axios'

import { API_KEY } from '../env'

function CurrentWeatherCard({city}) {

  const [currentWeather, setCurrentWeather] = useState([])


  const getWeather = async()=>{
    try{
        const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${API_KEY}`)
        setCurrentWeather(weather.data)
      
    }catch(e){
      console.error(e)
    }
  }
  useEffect(() => {
    getWeather()
    console.log("weather", currentWeather)
  }, [city])

  return (
    <View style={styles.card}>
      <View>
      <Text>{city}</Text>
        {
          currentWeather.length !== 0 ? 
          <View>
            <Text>Température : {currentWeather.main.temp}°C (Ressenti {currentWeather.main.feels_like}°C)</Text>
            <Text>Temps : {currentWeather.weather[0].description}</Text>
          </View>
          :
          <ActivityIndicator/>
        }
      </View>
      
      <View>
        { currentWeather.length !== 0 ?  
        <Image style={{width:50, height:50}} source={{uri:`http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`}} />
      :
      <ActivityIndicator />
      }
      </View>
        
    </View>
  )
}

export default CurrentWeatherCard

const styles = StyleSheet.create({
  card: {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
  },   
  })