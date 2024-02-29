import React, {useContext} from 'react'
import { View, Text, Image, StyleSheet } from 'react-native-web'

import { GlobalContext } from '../contexts/GlobalContext'
import { Pressable, ScrollView } from 'react-native'
import axios from 'axios'
import { Ionicons, AntDesign } from '@expo/vector-icons';

function Result({researchWeather, prediction}) {
  const {token, favorites, setFavorites} = useContext(GlobalContext)

  const addFavorite = async(name) => {
    const data = {
      save_name: name
    }
    try{
      const response = await axios.post('http://127.0.0.1:8000/api/saves', data, {
        headers: {
          Authorization : `Bearer ${token}`
        }
      })
      if(response.data){
        setFavorites(prev => [...prev, response.data.data])
      }

    }catch(e){
      console.error(e)
    }
  }

  return (
    <View style={styles.container} >
      <View style={styles.current} >
        {token !== '' && !favorites.find(f => f.save_name === researchWeather.name)&&
        <Pressable onPress={() => addFavorite(researchWeather.name)}>
          <Ionicons name="add-circle" size={24} color="#30A46C" />
        </Pressable>
      }
        <Text style={styles.currentCity} >{researchWeather.name}</Text>
        <Text>{researchWeather.main.temp}°C</Text>
        <Text>(Ressenti {researchWeather.main.feels_like}°C)</Text>
        {/* <Text>Temps : {researchWeather.weather[0].description}</Text> */}
        <Image style={{width:50, height:50}} source={{uri:`http://openweathermap.org/img/w/${researchWeather.weather[0].icon}.png`}} />
      </View>


      <View style={styles.toCome}>
        <AntDesign name="calendar" size={24} color="black" />
        <Text>À Venir</Text>
      </View>
      
      {
        prediction && 
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

export default Result

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection:'column',
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



});
