import React, { useLayoutEffect} from 'react'
import { StyleSheet,  View,TouchableOpacity} from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign,FontAwesome } from "@expo/vector-icons"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GroupChat from './Group';
import DirectChat from './Direct';


const Tab = createBottomTabNavigator();

const HomeScreen = ({route,navigation}) => {

  const {photoURL,username,fullname} = route.params?.data;
  const data = route.params;
  
  useLayoutEffect(() => {
      navigation.setOptions({
          title: "Chat App",
          headerStyle: {backgroundColor:"#66c5ed"},
          headerTitleStyle:{color:"black"},
          headerTintColor:"black",
          headerLeft: () => (
              <View style={{marginLeft: 20}}>
                  <TouchableOpacity
                   activeOpacity={0.5}
                   onPress={() =>
                    // navigation.reset({
                    //   index: 0,
                    //   routes: [{ name: "Login" }],
                    // })
                    navigation.navigate("Profile",{username:username})
                  }>
                    <Avatar rounded source={{ uri: photoURL}} />
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
                        <AntDesign name = "camerao" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("AddChat",{username:username,fullname:fullname,photoURL:photoURL})} activeOpacity={0.5}>
                        <AntDesign name="adduser" size = {24} color="black" />
                    </TouchableOpacity>
                </View>
          )
      })
    }, [navigation])

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
          })}>
            <Tab.Screen name="Group" component={GroupChat} />
            <Tab.Screen name="Direct" component={DirectChat}
               listeners={({ navigation, route }) => ({
                tabPress: (e) => {
                  // Prevent default action
                  e.preventDefault();
            
                  // Do something with the `navigation` object
                  navigation.navigate("Direct",{data:data});
                },
              })}
            />
        </Tab.Navigator>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        height:"100%",
    }
})
