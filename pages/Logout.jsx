import { Text, View, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'

import { GlobalContext } from '../contexts/GlobalContext'
import axios from 'axios'

import { useNavigation } from '@react-navigation/native'

function Logout() {
    const navigation = useNavigation()
    
    const {token, setToken} = useContext(GlobalContext)
    
    if(token === "")navigation.navigate('Accueil')
    const logout = async() => {
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/logout', null,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(response){
                setToken('')
                localStorage.removeItem('token')
                navigation.navigate("Accueil")
            }
        }catch(e){
            console.error(e)
        }
    }

    logout()
    
    
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large"/>
        </View>
    )  
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#F9FEFF',
    alignItems: 'center',
    justifyContent: 'center',
    },   
    })

export default Logout