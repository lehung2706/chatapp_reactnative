import React, { useLayoutEffect } from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from "@expo/vector-icons"
import GroupChat from './AddGR';
import DirectChat from './AddDR';


const Tab = createBottomTabNavigator();

const AddChatScreen = ({route,navigation}) => {

    const {username,fullname,photoURL} = route.params

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add a new chat',
            headerBackTitle:'Chats',
            headerBackTitleVisible:true,
        })
    },[navigation])

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === 'Group') {
                return (
                  <FontAwesome
                    name={
                      focused
                        ? 'group'
                        : 'group'
                    }
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === 'Direct') {
                return (
                  <FontAwesome 
                    name={focused ? 'user-circle' : 'user'}
                    size={size}
                    color={color}
                  />
                );
              }
            },
            
            tabBarInactiveTintColor: 'gray',
            tabBarActiveTintColor: 'tomato',
            headerShown:false,
            
          })
          }>
            <Tab.Screen name="Group" component={GroupChat} />
            <Tab.Screen name="Direct" component={DirectChat} 
              listeners={({ navigation, route }) => ({
                tabPress: (e) => {
                  // Prevent default action
                  e.preventDefault();
            
                  // Do something with the `navigation` object
                  navigation.navigate("Direct",{username: username,fullname: fullname,photoURL:photoURL});
                },
              })} />
        </Tab.Navigator>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        padding:30,
        height:"100%"
    }
})
