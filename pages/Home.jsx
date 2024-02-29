import React, { useState } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import { TextInput } from 'react-native-web'
import axios from 'axios'


import {API_KEY} from '../env.jsx'

import Result from '../components/Result.jsx'


function Home() {
const [search, setSearch] = useState('')
const [searchResultName, setSearchResultName] = useState('')
const [researchWeather, setResearchWeather] = useState([])
const [weatherPrediction, setWeatherPrediction] = useState([])
const [errorSearch, setErrorSearch] = useState([])

const sendResearch = async()=>{
    setResearchWeather([])
    try{
        const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&lang=fr&appid=${API_KEY}`)
        setSearchResultName(search)
        setResearchWeather(weather.data)
        setErrorSearch([])
        console.log(weather.data)
    }catch(e){
        setErrorSearch(e.response)
    }
    
    try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${search}&units=metric&lang=fr&appid=${API_KEY}`)
        setWeatherPrediction(response.data)
        setErrorSearch([])
        console.log(response.data)
    }catch(e){
        setErrorSearch(e.response)
    }
}


  return (
    <View style={styles.container}>
        <Text style={styles.title}>
            Weather App
        </Text>
        {
            errorSearch.length !== 0 &&
            <Text>
                Aucune ville ne correspond à votre recherche...
            </Text>
        }
        
        <TextInput
        style={styles.input} 
        placeholder="Tappez votre recherche ici"
        value={search}
        // onChange={(text) => (setSearch(text.target.value), setErrorSearch([]))}
        onChangeText={setSearch}
        onChange={() => setResearchWeather([])}
        />
        
        <Pressable onPress={() => sendResearch()} style={styles.button}>
            <Text style={styles.buttonText}>Rechercher</Text>
        </Pressable>

        {researchWeather.length !== 0 && weatherPrediction.length !== 0 && 
            <Result researchWeather={researchWeather} prediction={weatherPrediction}/>
        }

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: "95vh",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'start',
        gap: '10px',
        backgroundColor: '#F9FEFF',
      },title:{
        marginTop: '20px',
        fontSize: '25px'
      },input: {
        minWidth: 200,
        width: 'fit-content',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },button:{
        backgroundColor: '#E1F6FD',
        height: 40,
        margin: 12,
        border: '1px solid #A9DAED',
        padding: 10,    
    },buttonActive: {
        backgroundColor: 'red'
    },buttonText: {
        color: '#00749E'
    },
  });
  

export default Home