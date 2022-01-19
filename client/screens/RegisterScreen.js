import {  StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View,Pressable,KeyboardAvoidingView, Alert, Modal  } from 'react-native'
import { Button, Input, Image,Icon } from 'react-native-elements';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

const RegisterScreen = ({navigation}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [modalVisible, setModalVisible] = useState(false);


    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle:"Login",
            headerBackTitleVisible:true,
        })
    }, [navigation])

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

    const pickFromCamera = async () => {
        const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(granted) {
            let data = await ImagePicker.launchCameraAsync({
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
                // console.log(data)
                setImgUrl(data.url)
            })

    }

    const register = async () => {
        const obj = {
            username: username,
            password: password,
            fullname: fullname,
            phone: phone,
            photoURL: imgUrl
        };

        axios.get('http://10.0.2.2:5000/user/findone/'+username,)
        .then((res) => {
           if(!res.data) {
                axios.post('http://10.0.2.2:5000/user/create', obj)
                .then((res) => {
                    Alert.alert("Successfully")
                })
                .catch((err) => {
                    console.log(err)
                    Alert.alert(err.message)
                });
            }
            else {
                alert("Username already exist!")
            }
        })     


        
        
    }

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>
            <StatusBar   style="light" />
            <Text h3 style={{marginBottom: 50}}>
                Create a Account
            </Text>

            <View style={styles.inputContainer}>
                <Input 
                    placeholder='Fullname' 
                    autoFocus 
                    type='text'
                    value={fullname}
                    onChangeText={(text)=> setFullname(text)} 
                />
                <Input 
                    placeholder='Username' 
                    type='text'
                    value={username}
                    onChangeText={(text)=> setUsername(text)} 
                />
                <Input 
                    placeholder='Password' 
                    secureTextEntry
                    type='password'
                    value={password}
                    onChangeText={(text)=> setPassword(text)} 
                />
                <Input 
                    placeholder='Phone number' 
                    type='number'
                    value={phone}
                    onChangeText={(text)=> setPhone(text)}
                    onSubmitEditing={register}
                />

                <Pressable
                    style={[styles.buttonModal, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}
                >
                    <View style={{flexDirection: "row", alignItems: "center",justifyContent: "center"}}>
                        <Icon name="file-upload"/>
                        <Text style={styles.textStyle}>Choose Image</Text>

                    </View>
                    
                </Pressable>

            </View>

            <Button 
                containerStyle = {styles.button}
                raised
                onPress={register}
                title="Register"
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <View style={styles.modalButtonView}>
                        <Pressable
                            style={[styles.buttonModal, styles.buttonClose]}
                            onPress={() => pickFromCamera()}
                        >
                            <View style={{flexDirection: "row"}}>
                                <Icon name="photo-camera"/>
                                <Text style={styles.textStyle}>Camera</Text>

                            </View>
                        </Pressable>
                        <Pressable
                            style={[styles.buttonModal, styles.buttonClose]}
                            onPress={() => pickFromGallery()}
                            
                            
                            >
                            <View style={{flexDirection: "row"}}>
                                <Icon name="collections"/>
                                <Text style={styles.textStyle}>Gallery</Text>

                            </View>
                            
                        </Pressable>
                    </View>
                        <Pressable
                        style={[styles.buttonModal, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                        >
                            <View style={{flexDirection: "row"}}>
                                <Icon name="close"/>
                                <Text style={styles.textStyle}>Cancel</Text>

                            </View>
                        
                    </Pressable>
                </View>
            </Modal>

            <View style={{height:100}} />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    button:{
        width: 200,
        marginTop: 10,
    },
    inputContainer: {
        width:300,
    },
    modalButtonView:{
        flexDirection:"row",
        justifyContent:"space-around",
        padding: 10,
    },
    buttonModal: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
        buttonOpen: {
        backgroundColor: "#F194FF",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        position: "absolute",
        bottom: 5,
        width : '90%',
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle:{
        textAlign:"center"
    }
})
