import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-web'

import { GlobalContext } from '../contexts/GlobalContext'

import { useNavigation } from '@react-navigation/native'

function Login() {
    const navigation = useNavigation()
    const {token, setToken} = useContext(GlobalContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')


    if(token !== '')navigation.navigate('Accueil')


    
    
    
    
    const errors={
        email: "Veuillez entrer une adresse correcte",
        password: "Veuillez entrer votre mot de passe"
    }
    const login = async()=>{

        const data={
            email: email,
            password: password
        }
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/login', data)

            if(response.data){
                localStorage.setItem('token', response.data.data.access_token.token)
                setToken(response.data.data.access_token.token)
                navigation.navigate('Accueil')
            }
        }catch(e){
            setEmailError(errors.email)
            setPasswordError(errors.password)
            console.error(e)
        }
    }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Connexion</Text>
        <TextInput 
            value={email}
            // onChange={(e) => setEmail(e.target.value)}
            onChangeText={setEmail}
            style={styles.input}
            placeholder='Email'
        />
        {/* {emailError && <Text>{emailError}</Text>} */}
        
        <TextInput 
            value={password}
            // onChange={(e) => setPassword(e.target.value)}
            onChangeText={setPassword}
            style={styles.input}
            placeholder='Mot de passe'
            secureTextEntry={true}
        />
        {/* {passwordError && <Text>{passwordError}</Text>} */}
        
        <Pressable onPress={() => /*email !== '' && password !=='' &&*/ login()} style={styles.button}>
            <Text style={styles.buttonText}>Connexion</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: '2vh',
        backgroundColor: '#F9FEFF',
        alignItems: 'center',
        justifyContent: 'center',
      },title: {
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

export default Login