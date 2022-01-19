import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen'; 
import AddChatScreen from './screens/AddChatScreen'; 
import ChatScreen from './screens/ChatScreen'; 
import ChatScreen2 from './screens/ChatScreen2'; 
import AddDRC from './screens/AddDR';
import Direct from './screens/Direct';
import Group from './screens/Group';
import GroupChat from './screens/ChatScreenGR';
import Profile from './screens/Profile';
import { LogBox } from 'react-native';



const Stack = createNativeStackNavigator();

const globalScreenOptions= {
  headerStyle: { backgroundColor:"#2C6BED"},
  headerTitleStyle: { color:"white"},
  headerTintColor: { color:"white"},
  headerTitleAlign: 'center',
}

export default function App() {
  return (
    <NavigationContainer >
        <Stack.Navigator screenOptions={globalScreenOptions}>
            <Stack.Screen style={styles.container} name="Login" component={LoginScreen}  />
            <Stack.Screen style={styles.container} name="Register" component={RegisterScreen}  />
            <Stack.Screen style={styles.container} name="Home" component={HomeScreen}  />
            <Stack.Screen style={styles.container} name="ChatScreen" component={ChatScreen}  />
            <Stack.Screen style={styles.container} name="ChatScreen2" component={ChatScreen2}  />
            <Stack.Screen style={styles.container} name="AddChat" component={AddChatScreen}  />
            <Stack.Screen style={styles.container} name="AddDirectChat" component={AddDRC}  />
            <Stack.Screen style={styles.container} name="Direct Chat" component={Direct}  />
            <Stack.Screen style={styles.container} name="Group" component={Group}  />
            <Stack.Screen style={styles.container} name="GroupChat" component={GroupChat}  />
            <Stack.Screen style={styles.container} name="Profile" component={Profile}  />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

LogBox.ignoreAllLogs()
