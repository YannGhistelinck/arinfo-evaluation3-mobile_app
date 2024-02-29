import React, {useContext} from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'


import { GlobalContext } from '../contexts/GlobalContext'
import axios from 'axios'

import CurrentWeatherCard from '../components/CurrentWeatherCard'

function Favorites() {
    const navigation = useNavigation()
    const {token, favorites, setFavorites} = useContext(GlobalContext)

    if(token === '')navigation.navigate('Accueil')

    const deleteFavorite = async(id) => {
        try{
            const response = await axios.delete('http://127.0.0.1:8000/api/saves/'+id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(response){
                setFavorites(prev => prev.filter(item => item.id !== id))
            }
        }catch(e){

        }
    }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Mes villes favorites</Text>

        <View>
            {favorites.map((fav, index) => (
                <View key={index}>
                    <Pressable onPress={() => deleteFavorite(fav.id)} style={styles.delete}>
                        <MaterialCommunityIcons name="delete-empty" size={24} color="#CE2C31" />
                    </Pressable>
                    <CurrentWeatherCard city={fav.save_name}/>
                    
                </View>
            ))}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FEFF',
        alignItems: 'center',
        justifyContent: 'center',
    },title: {
        fontSize: '30px'
    },delete: {
        // backgroundColor: '#CE2C31',
        // padding: 10,
        // margin: 12
    },deleteText: {
        color: '#FFFCFC'
    },
});

export default Favorites