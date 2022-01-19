import React, { useState,useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import axios from 'axios'


const AddGR = ({navigation}) => {

    const [input, setInput] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    const pickFromGallery = async () => {
        const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(granted) {
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[1,1],
                quality:0.5
            })
            if(!data.cancelled){
                let newfile = {
                    uri:data.uri,
                    type:`test/${data.uri.split(".")[1]}`,
                    name:`test.${data.uri.split(".")[1]}`
                }
                handleUpload(newfile)
            }
        }
        else {
            Alert.alert("You need to give up permission to work")
        }
    }


    useLayoutEffect(()=>{
        navigation.setOptions({
            title: "Add Group",
            headerStyle: {backgroundColor:"#fff"},
            headerTitleStyle:{color:"black"},
            headerTintColor:"black",
        })
    },[navigation])

    const handleUpload = (image) => {
        const data = new FormData()
        data.append('file',image)
        data.append('upload_preset','chatApp')
        data.append("cloud_name","dfasplbkw")

        fetch("https://api.cloudinary.com/v1_1/dfasplbkw/image/upload",{
            method: 'POST',
            body: data,
        })
            .then (res => res.json())
            .then(data => {
                setImgUrl(data.url)
            })

    }

    const createChat = async () => {
        const obj = {
            nameGR: input,
            img: imgUrl
        };



        await axios.post('http://10.0.2.2:5000/gr/createGR', obj)
            .then((res) => {
                alert("Successfully")
            })
            .catch((err) => {
                console.log(err)
                alert(err.message)
            });
    }

    return (
        <View style={styles.container}>
            <Input 
                placeholder="Enter group chat name"
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={createChat}
                leftIcon={
                    <Icon name="wechat" type="antdesign" size={24} color="black" />
                }
            />
            <Button  onPress={pickFromGallery} title="Choose group image" />
            <Button disabled={!input} onPress={createChat} title="Create new group" />
        </View>
    )
}

export default AddGR

const styles = StyleSheet.create({})
