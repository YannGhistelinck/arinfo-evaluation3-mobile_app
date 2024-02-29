import React, {useContext, useEffect} from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'

import { GlobalContext } from '../contexts/GlobalContext'
import axios from 'axios'

function Account() {

    const {token, user, setUser} = useContext(GlobalContext)

    const getUser = async()=> {
        try{
            const response = await axios.get('http://127.0.0.1:8000/api/currentuser', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.data){
                setUser(response.data.data.user)
            }
        }catch(e){
            console.error(e)
        }
    }

    useEffect(() => {
        if(token !== ''){
            getUser()
        }
    }, [])

    


  return (
    <View style={styles.container}>
        <Text>Mon compte</Text>
        {
            user.length !== 0 ?
            <View>
                <Text>Prénom : {user.firstname}</Text>
                <Text>Nom : {user.lastname}</Text>
                <Text>Email : {user.email}</Text>
            </View>
            :
            <ActivityIndicator size='large'/>
        }
    </View>
  )
}

export default Account

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F9FEFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });