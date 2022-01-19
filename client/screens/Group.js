import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet,View, Text,ScrollView,Image} from 'react-native'
import {Card} from 'react-native-paper'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Group = ({navigation}) => {

    const [data, setData] = useState([])
    const [username,setUsername] = useState('')

    const getData = async () => {
        try {
        const value = await AsyncStorage.getItem('@username')
        if(value !== null) {
            setUsername(value)
        }
        } catch(e) {
        alert('Failed to fetch the data from storage')
        }
    }

    useEffect(()=>{
        getData()
        
    },[])

   

    useEffect(()=> {
        axios.get('http://10.0.2.2:5000/gr/group')
            .then(results => {
                setData(results.data)
            })
            .catch((err) => {
                console.log(err)
        })


        
    },[data])


    useLayoutEffect(()=>{
        navigation.setOptions({
            title: "Groups",
            headerStyle: {backgroundColor:"#fff"},
            headerTitleStyle:{color:"black"},
            headerTintColor:"black",
        })
    },[navigation])

    const listGroup = data.map((item) => {
        return (
            <Card style={styles.myCard} key={item._id} onPress={()=> navigation.push("GroupChat",{id:item._id,nameGR:item.nameGR,imgGR:item.img,username:username})}>
                <View style={styles.cardView} > 
                    <Image
                        style = {{width: 60, height:60, borderRadius:30}}
                        source={{uri: item.img}}
                    />
                    <View style={{flexDirection:"column", justifyContent:"space-around",paddingLeft: 15}}>
                        <Text style={{fontWeight:"bold"}}>{item.nameGR}</Text>
                        <View style={{flexDirection:"row"}}>
                            <Text style={{fontStyle:"italic"}}>{item.lastUser} :</Text>
                            <Text style={{fontStyle:"italic",flexShrink: 1}}> {item.lastMessage}</Text>
                        </View>
                    </View>
                </View>
            </Card>
        )
    })

    return (
        <ScrollView style={styles.container} >
            {listGroup}
        </ScrollView>
    )
}

export default Group

const styles = StyleSheet.create({
    myCard:{
        margin: 5,
        padding: 5,
        
    },
    cardView:{
        flexDirection:"row"
    }
})
