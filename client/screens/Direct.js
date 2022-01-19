import React, { useEffect, useState,useLayoutEffect } from 'react'
import axios from 'axios'
import { StyleSheet, Text, View, ScrollView,Image } from 'react-native'
import {Card} from 'react-native-paper'

const Direct = ({route,navigation}) => {

    const [data,setData] = useState([])
    const {username,fullname,photoURL} = route.params.data.data;



    useEffect(()=>{
        axios.get('http://10.0.2.2:5000/drroom/findroom/'+username,{username: username})
            .then(results => {
                setData(results.data)
            })
            .catch((err) => {
                console.log(err)
            })
    })

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: "People",
            headerStyle: {backgroundColor:"#fff"},
            headerTitleStyle:{color:"black"},
            headerTintColor:"black",
        })
    },[navigation])

    const listUsers = data.map((item) => {
        if(username === item.username1){
            return (
                <Card style={styles.myCard} key={item._id} onPress={() => navigation.navigate("ChatScreen",{user1:item.username1,name1:item.name1,photoURL1:item.photoURL1,user2:item.username2,name2:item.name2,photoURL2:item.photoURL2,nameH:item.name2,photoH:item.photoURL2,userH:username})}>
                    <View style={styles.cardView} > 
                        <Image
                            style = {{width: 60, height:60, borderRadius:30}}
                            source={{uri: item.photoURL2}}
                        />
                        <View style={{flexDirection:"column", justifyContent:"space-around",paddingLeft: 15}}>
                            <Text style={{fontWeight: "bold"}}>{item.name2}</Text>
                            <View style={{flexDirection:"row"}}>
                                {/* <Text style={{fontStyle:"italic"}}>{item.lastUser} :</Text> */}
                                <Text style={{flexShrink: 1}}> {item.lastMessage}</Text>
                            </View>
                        </View>
                    </View>
                </Card>
            )
        }
        else{
            return (
                <Card style={styles.myCard} key={item._id} onPress={() => navigation.navigate("ChatScreen",{user1:item.username2,name1:item.name2,photoURL1:item.photoURL2,user2:item.username1,name2:item.name1,photoURL2:item.photoURL1,nameH:item.name1,photoH:item.photoURL1,userH:username})}>
                    <View style={styles.cardView} > 
                        <Image
                            style = {{width: 60, height:60, borderRadius:30}}
                            source={{uri: item.photoURL1}}
                        />
                        <View style={{flexDirection:"column", justifyContent:"space-around",paddingLeft: 15}}>
                            <Text style={{fontWeight: "bold"}}>{item.name1}</Text>
                            <View style={{flexDirection:"row"}}>
                                {/* <Text style={{fontStyle:"italic"}}>{item.lastUser} :</Text> */}
                                <Text style={{flexShrink: 1,fontWeight:"bold"}}> {item.lastMessage}</Text>
                            </View>
                        </View>
                    </View>
                </Card>
            )
        }
    })

    return (
        <ScrollView>
            {listUsers}
        </ScrollView>
    )
}

export default Direct

const styles = StyleSheet.create({
    myCard:{
        margin: 5,
        padding: 5,
        
    },
    cardView:{
        flexDirection:"row"
    }
})
