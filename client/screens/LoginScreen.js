import React, { useState } from 'react'
import { Button, Input, Image } from 'react-native-elements';
import { StyleSheet, Text, View,Alert } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({navigation}) => {
    const [data, setData] = useState([])

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const signIn = () => {
        axios.post('http://10.0.2.2:5000/user/login', {
            username: username,
            password: password,
        })
          .then((res) => {
              if(res.data.exists == true) {   
                  setData(res.data.data)
                  navigation.navigate("Home",{data:res.data.data});
              }
              else {
                  alert("Username or password is incorrect")
              }
          })

          storeData()
    }
        
    const storeData = async () => {
        try {
        await AsyncStorage.setItem('@username', username)
        } catch (e) {
            
        }

        // signIn()
    }

    
    

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar   style="light" />
            <Image 
                source= {{
                    uri: "https://blog360.vn/wp-content/uploads/2020/09/chat-voi-nguoi-la-6-ung-dung-mien-phi-tai-viet-nam-5.jpg",
                }}
                style={{width:150, height:150, marginBottom: 30}}
            />

            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Username" 
                    autoFocus 
                    type="text"
                    value={username}
                    onChangeText={(text)=> setUsername(text)}
                    />
                <Input 
                    placeholder="Password" 
                    secureTextEntry
                    type="password"
                    value={password}
                    onChangeText={(text)=> setPassword(text)}
                    onSubmitEditing={signIn}
                    />
            </View>

            <Button containerStyle = {styles.button} onPress={signIn} title="Login" />
            <Button containerStyle = {styles.button} onPress={()=> navigation.navigate("Register")} type="outline" title="Register" />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
    inputContainer:{
        width: 300,
    },
    button: {
        width: 200, 
        marginTop: 10,
        marginBottom: 10,
    }
})
