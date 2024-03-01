import React, {useContext} from 'react'
import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native'
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

        <ScrollView>
            {favorites.map((fav, index) => (
                <View key={index} style={styles.currentCardContainer}>
                    <Pressable onPress={() => deleteFavorite(fav.id)} style={styles.delete}>
                        <MaterialCommunityIcons name="delete-empty" size={24} color="#CE2C31" />
                    </Pressable>
                    <CurrentWeatherCard city={fav.save_name}/>
                    
                </View>
            ))}
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#F9FEFF',
        alignItems: 'center',
        justifyContent: 'center',
    },title: {
        fontSize: '30px'
    },
    currentCardContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    
    
    delete: {
        // backgroundColor: '#CE2C31',
        // padding: 10,
        // margin: 12
    },deleteText: {
        color: '#FFFCFC'
    },
});

export default Favorites