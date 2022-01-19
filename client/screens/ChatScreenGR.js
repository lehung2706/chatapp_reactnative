import React, { useEffect, useLayoutEffect,useState,useRef } from 'react'
import { Platform, ScrollView,Text,TextInput, TouchableOpacity,KeyboardAvoidingView, TouchableWithoutFeedback,StyleSheet,Keyboard,View,ImageBackground } from 'react-native'
import axios from 'axios'
import { AntDesign,Ionicons } from "@expo/vector-icons"
import { Avatar } from 'react-native-elements'


const ChatScreen = ({route,navigation}) => {
    const [input, setInput] = useState("");
    const [messages,setMessages] = useState([]);
    const [imgUser,setImgUser] = useState('')
    const [fullname,setFullname] = useState('')

    const scrollViewRef = useRef();

    

    const {id,nameGR,imgGR,username} = route.params

    useEffect(()=> {
        axios.get('http://10.0.2.2:5000/user/findone/'+username,)
        .then((res) => {
            setImgUser(res.data.photoURL)
            setFullname(res.data.fullname)
        })
        
    },[])



    useEffect(()=>{
        axios.get('http://10.0.2.2:5000/grm/findone/'+username,)
        .then((res)=>{
            if(res.data.idGR !== id) {
                axios.post('http://10.0.2.2:5000/grm/createGRM',{
                    idGR:id,
                    username:username,
                    imgGR:imgGR
                })
            }
        })

        
    },[])
    
    const sendMessage = () => {
        Keyboard.dismiss()
        axios.post('http://10.0.2.2:5000/msgr/createMSGR',{
                idGroup: id,
                username: username,
                message: input,
                photoURL: imgUser,
            })

        axios.put('http://10.0.2.2:5000/gr/update/'+id,{
            lastUser:fullname,
            lastMessage: input,
        })

        scrollViewRef.current.scrollToEnd({animated: true})

        setInput("")
    }

    useLayoutEffect(()=>{
        axios.get('http://10.0.2.2:5000/msgr/findmsgr/'+id)
            .then(res=> setMessages(res.data))
    },[messages])


    useLayoutEffect(() => {
        navigation.setOptions({
            title: nameGR,
            headerStyle: {backgroundColor:"#5cab7c"},
            headerTitleStyle:{color:"black"},
            headerTintColor:"black",
            headerLeft: () => (
                <View style={{marginLeft: 10, flexDirection:"row"}}>
                    <TouchableOpacity activeOpacity={0.5} style={{alignItems:"center",justifyContent:"center"}}>
                         <AntDesign name = "arrowleft" onPress={()=> navigation.goBack()} size={24} color="black" />
                     </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 20, flexDirection:"row"}} activeOpacity={0.5}>
                      <Avatar rounded source={{ uri: imgGR}} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight:() => (
                 <View style={{
                     flexDirection:"row",
                     justifyContent:"space-between",
                     width:80,
                     marginRight:20,
                 }}>
                     <TouchableOpacity activeOpacity={0.5}>
                         <AntDesign name = "videocamera" size={24} color="black" />
                     </TouchableOpacity>
                     <TouchableOpacity activeOpacity={0.5}>
                         <Ionicons name="call-outline" size = {24} color="black" />
                     </TouchableOpacity>
                 </View>
            )
        })
    }, [navigation])


    const listMessages = messages.map((message) => {
        return (
            message.username === username ? (
                <View key={message._id} style={styles.receiver}>
                    <Avatar 
                        rounded
                        containerStyle={{
                            position: 'absolute',
                            bottom:-15,
                            right: -5,
                        }}
                        
                        source={{
                            uri: message.photoURL,
                        }}
                    />
                    <Text style={styles.receiveText}>{message.message}</Text>
                </View>
            ):(
                <View key={message._id} style={styles.sender}>
                     <Avatar 
                        rounded
                        containerStyle={{
                            position: 'absolute',
                            bottom:-15,
                            right: -5,
                        }}
                        
                        source={{
                            uri: message.photoURL,
                        }}
                     />
                    <Text style={styles.senderText}>{message.message}</Text>
                </View>
            )
        )
    })

    return (
        <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                {/* <ImageBackground source={{uri : "https://upanh123.com/wp-content/uploads/2020/10/hinh-nen-3d-1024x576.jpg"}}  resizeMode="cover" style={styles.image}> */}

                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                    <>
                    <ScrollView contentContainerStyle={{ paddingTop: 15, flexDirection:"column"}} ref={scrollViewRef} >
                        {listMessages}
                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput 
                            value={input} 
                            onChangeText = {(text)=> setInput(text)} 
                            onSubmitEditing={sendMessage}
                            placeholder="Enter Message" 
                            style={styles.textInput}
                        >

                        </TextInput>
                        <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                            <Ionicons name = "send" size={24} color="#2B6BE6" /> 
                        </TouchableOpacity >
                    </View>
                    </>
                </TouchableWithoutFeedback>
                {/* </ImageBackground> */}
            </KeyboardAvoidingView>
    );
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    footer:{
        flexDirection:"row",
        alignItems: "center",
        width:"100%",
        padding:15,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    textInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        backgroundColor:"#ECECEC",
        borderWidth:1,
        padding:10,
        color:"black",
        borderRadius:30,
    },
    receiver:{
        padding:15,
        backgroundColor:"#ECECEC",
        alignSelf:"flex-end",
        borderRadius:20,
        marginRight: 15,
        marginBottom:20,
        maxWidth: "80%",
        position: "relative",
    },
    sender:{
        padding:15,
        backgroundColor:"#2B68E6",
        alignSelf:"flex-start",
        borderRadius:20,
        margin:15,
        maxWidth:"80%",
        position: "relative",
    },
    senderText:{
        color: "white",
        fontWeight: "500",
        marginLeft:10,
        marginBottom:15,
    },
    senderName:{
        left:10,
        paddingRight:10,
        fontSize: 10,
        color : "white",
    },
})
