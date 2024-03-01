import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Text, ActivityIndicator, Image, ScrollView } from 'react-native'
import axios from 'axios'
import { Ionicons, AntDesign } from '@expo/vector-icons';


import { API_KEY } from '../env'

function CurrentWeatherCard({city}) {

  const [currentWeather, setCurrentWeather] = useState([])
  const [prediction, setPrediction] = useState([])


  const getWeather = async()=>{
    try{
        const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${API_KEY}`)
        setCurrentWeather(weather.data)
      
    }catch(e){
      console.error(e)
    }

    try{
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=fr&appid=${API_KEY}`)
      setPrediction(response.data)
  }catch(e){
    console.error(e)
  }
  }
  useEffect(() => {
    getWeather()
  }, [city])

  return (
    <View style={styles.card}>
      <View>
      
        {
          currentWeather.length !== 0 ? 
          <View style={styles.current}>
            <Text style={styles.currentCity}>{city}</Text>
            { currentWeather.length !== 0 ?  
              <Image style={{width:50, height:50}} source={{uri:`http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`}} />
            :
              <ActivityIndicator />
            }
            <Text>Température : {currentWeather.main.temp}°C (Ressenti {currentWeather.main.feels_like}°C)</Text>
            <Text>Temps : {currentWeather.weather[0].description}</Text>
          </View>
          :
          <ActivityIndicator/>
        }
      </View>
      
      

      <View style={styles.toCome}>
        <AntDesign name="calendar" size={24} color="black" />
        <Text>À Venir</Text>
      </View>


      {
        prediction.length !== 0 && 
        <ScrollView horizontal style={styles.predictionList}>
          {prediction.list.map((weather, index) => 
            <View key={index} style={styles.predictionItem}>
              <Text style={styles.predictionDate}>{weather.dt_txt.split(' ')[0].split('-')[2] +' / '+ weather.dt_txt.split(' ')[0].split('-')[1]} </Text>
              <Text style={styles.predictionTime} >{weather.dt_txt.split(' ')[1].split(':')[0]}H00 </Text>
              <Image style={{width:20, height:20}} source={{uri:`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}} />
              <Text>{weather.main.temp}°C </Text>
            </View>
          )}
        </ScrollView>
      }
        
    </View>
  )
}

export default CurrentWeatherCard

const styles = StyleSheet.create({
  card: {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
  },  
  
  current: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },currentCity:{
    fontWeight: 'bold',
  } ,  
  
  toCome: {
      display: "flex",
      flexDirection: 'row',
      marginTop: '20px',
      marginBottom: '20px'
    },


    predictionList: {
      display: "flex",
    
    },
    predictionDate: {
      fontWeight: 'bold'
    },

    predictionTime: {
      fontSize: '13px'
    },

    predictionItem: {
      borderRadius: '5px',
      backgroundColor: '#E1F6FD',
      margin: '8px',
      padding: '8px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  })