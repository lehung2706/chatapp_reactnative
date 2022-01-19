import React, { useEffect, useLayoutEffect,useState,useRef } from 'react'
import { Platform, ImageBackground, ScrollView,Text,Button, TextInput, TouchableOpacity,KeyboardAvoidingView, TouchableWithoutFeedback,StyleSheet,Keyboard,View } from 'react-native'
import axios from 'axios'
import { AntDesign,Ionicons } from "@expo/vector-icons"
import { Avatar } from 'react-native-elements'

const ChatScreen = ({route,navigation}) => {
    const [input, setInput] = useState("");
    const [data,setData] = useState([]);
    const [messages,setMessages] = useState([]);
    const scrollViewRef = useRef();

    const {user1,name1,photoURL1,name2,user2,photoURL2,nameH,photoH,userH} = route.params;



    useEffect(()=>{
        axios.post('http://10.0.2.2:5000/drroom/find',{
            username1:user1,
            username2:user2,
        })
        .then(res=>{
            if(res.data.exists){
                setData(res.data.data)
            }
        })
        
    },[])

    const sendMessage = () => {
        Keyboard.dismiss()
        if(userH !== messages.username){
            axios.post('http://10.0.2.2:5000/msdr/create',{
                idRoom: data._id,
                username: user1,
                message: input,
                photoURL: photoURL1,
            })

            axios.put('http://10.0.2.2:5000/drroom/update/'+data._id,{
                lastUser:name1,
                lastMessage:input,
            })
        }
        else{
            axios.post('http://10.0.2.2:5000/msdr/create',{
                idRoom: data._id,
                username: user2,
                message: input,
                photoURL: photoURL2,
            })

            axios.put('http://10.0.2.2:5000/drroom/update/'+data._id,{
                lastUser:name2,
                lastMessage:input,
            })
        }
        scrollViewRef.current.scrollToEnd({animated: true})
        setInput("")
    }


    useLayoutEffect(()=>{
        
        axios.get('http://10.0.2.2:5000/msdr/findmsdr/'+data._id,{idRoom:data._id})
            .then(res=> setMessages(res.data))


    },[messages])


    useLayoutEffect(() => {
        navigation.setOptions({
            title: nameH,
            headerStyle: {backgroundColor:"#5055b5"},
            headerTitleStyle:{color:"black"},
            headerTintColor:"black",
            headerLeft: () => (
                <View style={{marginLeft: 10, flexDirection:"row"}}>
                    <TouchableOpacity activeOpacity={0.5} style={{alignItems:"center",justifyContent:"center"}}>
                         <AntDesign name = "arrowleft" onPress={()=> navigation.goBack()} size={24} color="black" />
                     </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 20, flexDirection:"row"}} activeOpacity={0.5}>
                      <Avatar rounded source={{ uri: photoH}} />
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
            message.username === userH ? (
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

            <ImageBackground source={{uri : "https://anhdep123.com/wp-content/uploads/2021/02/hinh-nen-cho-soi-dep-cho-dien-thoai.jpg"}}  resizeMode="stretch" style={styles.image}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                    <>
                   
                    <ScrollView contentContainerStyle={{ paddingTop: 15}} ref={scrollViewRef}>
                        
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
                </ImageBackground>
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
