import { StatusBar } from 'expo-status-bar';
import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import axios from 'axios';
import { Feather, FontAwesome5, Entypo, MaterialIcons } from '@expo/vector-icons';

import { GlobalContext } from './contexts/GlobalContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Favorites from './pages/Favorites';
import Account from './pages/Account';

function MyTabBar({ state, descriptors, navigation }) {

  
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            
            style={{flex: 1, 
              justifyContent: 'center',
              alignItems: 'center',
              height: '5vh',
              minHeight: '30px',
              backgroundColor: isFocused ? '#00749E' : '#1D3E56',
            }}
          >
            <Text style={{ color: isFocused ? '#F9FEFF' : '#F1FAFD' }}>
              {/* {label} */}
              {label === 'Accueil' && <FontAwesome5 name='home' size={24} color={isFocused ? '#F9FEFF' : '#F1FAFD'} />}
              {label === 'Connexion' && <Entypo name="lock-open" size={24} color={isFocused ? '#F9FEFF' : '#F1FAFD'} />}
              {label === 'Favoris' && <MaterialIcons name="favorite" size={24} color={isFocused ? '#F9FEFF' : '#F1FAFD'} />}
              {label === 'Mon Compte' && <MaterialIcons name="account-circle" size={24} color={isFocused ? '#F9FEFF' : '#F1FAFD'} />}
              {label === 'Déconnexion' && <MaterialIcons name="logout" size={24} color={isFocused ? '#F9FEFF' : '#F1FAFD'} />}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function App() {
  const Tab = createBottomTabNavigator()
  
  const [favorites, setFavorites ] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [user, setUser] = useState([])

  const getUser = async() => {
    try{
      const response = await axios.get('http://127.0.0.1:8000/api/currentuser', token)
    }catch(e){
      setToken('')
      localStorage.removeItem('token')
    }
  }

  const getFavorites = async()=>{
    try{
      const response = await axios.get('http://127.0.0.1:8000/api/saves', {
        headers:{
          Authorization: `Bearer ${token}` 
        }
      })
      if(response.data){
        setFavorites(response.data)
      }
    }catch(e){
      console.error(e)
    }
  }


  useEffect(() => {
    // if(token !== '')getUser()
    
    if(token !== '')getFavorites()
  }, [token])

  return (
    <GlobalContext.Provider value={{token, setToken, favorites, setFavorites, user, setUser}}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false,}} tabBar={props => <MyTabBar {...props} />}>


          <Tab.Screen name="Accueil" component={Home} />
          { token !== "" && <Tab.Screen name="Favoris" icon='home' component={Favorites} />}
          { token !== "" && <Tab.Screen name="Mon Compte" component={Account}/>}
          { token !== "" && <Tab.Screen name="Déconnexion" component={Logout} />}
          { token == "" && <Tab.Screen name="Connexion" component={Login} />}


        </Tab.Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },buttonBar: {
    

  },
});
