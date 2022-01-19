import React, { useState,useLayoutEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView,Image } from 'react-native'
import { AntDesign} from "@expo/vector-icons"
import { Icon, Input } from 'react-native-elements'
import {Card} from 'react-native-paper'
import axios from 'axios'

const AddDR = ({route,navigation}) => {


    const [fullname1, setFullname1] = useState("");
    const [data, setData] = useState([]);


    const {username,fullname,photoURL} = route.params;
    

    const search = async () => {
        await axios.get('http://10.0.2.2:5000/user/finduser/'+fullname1,{fullname: fullname1,})
            .then(results => {
                setData(results.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: "Chat to someone",
            headerStyle: {backgroundColor:"#fff"},
            headerTitleStyle:{color:"black"},
            headerTintColor:"black",
        })
    },[navigation])


    const listUsers = data.map((item) => {
        return (
            <Card style={styles.myCard} key={item._id} onPress={() => navigation.navigate("ChatScreen2",{user1:username,name1:fullname,photoURL1:photoURL,user2:item.username,name2:item.fullname,photoURL2:item.photoURL})}>
                <View style={styles.cardView} > 
                    <Image
                        style = {{width: 60, height:60, borderRadius:30}}
                        source={{uri: item.photoURL}}
                    />
                    <View style={{flexDirection:"column"}}>
                        <Text>{item.fullname}</Text>
                    </View>
                </View>
            </Card>
        )
    })

    return (
        <View style={styles.container}>
            <View>
                <Input 
                    placeholder="Enter a name"
                    value={fullname1}
                    onChangeText={(text) => setFullname1(text)}
                    onSubmitEditing={search}
                    leftIcon={
                        <Icon name="user" type="antdesign" size={24} color="black" />
                    }
                    rightIcon={
                        <TouchableOpacity onPress={search} onSubmit>
                            <AntDesign name="search1" size={24} color="black" />
                        </TouchableOpacity>
                    }
                />
            </View>
            <ScrollView>
                {listUsers}
            </ScrollView>
        </View>
            
        
    )
}

export default AddDR

const styles = StyleSheet.create({
    myCard:{
        margin: 5,
        padding: 5,
        
    },
    cardView:{
        flexDirection:"row"
    }
})
