import React , {useState,useEffect,useLayoutEffect} from 'react'
import { Entypo } from "@expo/vector-icons"
import { Button, Input, Image,Icon } from 'react-native-elements';
import { StyleSheet, Text, View,KeyboardAvoidingView,Keyboard,Alert,TouchableWithoutFeedback,TouchableOpacity,Modal,Pressable, } from 'react-native'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

const Profile = ({navigation, route}) => {

    const [data,setData] = useState('')
    const [passWordViewMode,setPassWordViewMode] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [imgUrl, setImgUrl] = useState("");
    const [password,setPassword] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [fullName,setFullName] = useState('')

    const username = route.params.username

    const signOut = () =>{
        Alert.alert("Sign Out?", "", [
            { 
                text: "OK", onPress: () => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Login" }],
                    })
                } 
            },
            { text: "Cancel"}
        ])
    }
    
    const showModal = () => {
        setModalVisible(true)
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight:() => (
                  <View style={{
                      flexDirection:"row",
                      justifyContent:"flex-end",
                      width:80,
                      marginRight:20,
                  }}>
                      <TouchableOpacity onPress={signOut} activeOpacity={0.5}>
                          <Entypo name="log-out" size = {24} color="black" />
                      </TouchableOpacity>
                  </View>
            )
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

    const checkImg = () => {
        if(imgUrl === "") return (<View></View>)
        else return (<View>
            <Text>Please click Update to update your new Avatar</Text>
        </View>)
    }

    useEffect(() =>{
        axios.get("http://10.0.2.2:5000/user/findone/"+username)
            .then(res=>{
                setData(res.data)
            })

    },[data])

    const changePasswordViewMode = () => {
        if(passWordViewMode === true) setPassWordViewMode(false)
        else setPassWordViewMode(true)
    }

    const passWordView = () =>{
        if(passWordViewMode === false) return(
            <View></View>
        )
        else return(
            <View style={styles.input}>
                <Text>Old Password:</Text>
                <Input 
                    style={styles.textInput}
                    type="password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text)=>setPassword(text)}
                    >
                </Input>
                <Text>New Password:</Text>
                <Input 
                    style={styles.textInput}
                    type="password"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={(text)=>setNewPassword(text)}
                    >
                </Input>
                <Text>Confirm New Password:</Text>
                <Input 
                    style={styles.textInput}
                    type="password"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={(text)=>setConfirmPassword(text)}
                    onSubmitEditing={update}
                    >
                </Input>
            </View>
        )
    }

    const update = () =>{
        if (newPassword === '' || password === '') {
            Alert.alert("Update?", "", [
                { 
                    text: "OK", onPress: () => {
                        if(fullName !== '' && imgUrl !== '') {
                            axios.put("http://10.0.2.2:5000/user/update/"+username,{
                                fullname:fullName,
                                photoUrl:imgUrl,
                            })
                                .then(Alert.alert("Update success!"))
                        }
                        else if(fullName === '' && imgUrl !== '') {
                            axios.put("http://10.0.2.2:5000/user/update/"+username,{
                                photoUrl:imgUrl,
                            })
                                .then(Alert.alert("Update success!"))
                        }
                        else{
                            axios.put("http://10.0.2.2:5000/user/update/"+username,{
                                fullname:fullName,
                            })
                                .then(Alert.alert("Update success!"))
                        }
                    } 
                },
                { text: "Cancel"}
            ])
        } 
        else if (password !== data.password) Alert.alert('Password is incorrect')
        else if (newPassword.length < 6) Alert.alert('Password must be at least 6 characters')
        else if (newPassword !== confirmPassword) Alert.alert('Password confirm is incorrect')
        else {
            Alert.alert("Update?", "", [
                { 
                    text: "OK", onPress: () => {
                        if(fullName !== '' && imgUrl !== '') {
                            axios.put("http://10.0.2.2:5000/user/update/"+username,{
                                fullname:fullName,
                                password:newPassword,
                                photoUrl:imgUrl,
                            })
                                .then(Alert.alert("Update success!"))
                        }
                        else if(fullName === '' && imgUrl !== '') {
                            axios.put("http://10.0.2.2:5000/user/update/"+username,{
                                password:newPassword,
                                photoUrl:imgUrl,
                            })
                                .then(Alert.alert("Update success!"))
                        }
                        else{
                            axios.put("http://10.0.2.2:5000/user/update/"+username,{
                                fullname:fullName,
                                password:newPassword,
                            })
                                .then(Alert.alert("Update success!"))
                        }
                    } 
                },
                { text: "Cancel"}
            ])
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.view}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Image
                        style={styles.avatar}
                        source={{ uri: data.photoURL}}
                        onPress={showModal}
                    >
                    </Image>
                    {checkImg()}
                    <View style={styles.input}>
                        <Text>Fullname:</Text>
                        <Input 
                            style={styles.textInput}
                            defaultValue={data.fullname}
                            // value={fullName}
                            onChangeText={(text)=>setFullName(text)}
                            >
                        </Input>
            

                    </View>
                    <Button containerStyle = {styles.button} onPress={changePasswordViewMode} title="Change Password"></Button>
                    {passWordView()}

                    <Button containerStyle = {styles.button} onPress={update}  title="Update"></Button>
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
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default Profile

const styles = StyleSheet.create({
    avatar: {
        width:150,
        height:150,
        borderRadius:5,
    },
    view: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    input:{
        width:300,
        marginTop:20
    },
    textInput:{
        textAlign: 'center',
        borderWidth: 1,
        borderRadius:5,
        flex:1,
    },
    button: {
        width: 200, 
        marginTop: 10,
        marginBottom: 10,
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
