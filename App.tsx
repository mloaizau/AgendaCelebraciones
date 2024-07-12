import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import firebase from './src/utils/firebase';
import "firebase/compat/auth";
import { Auth } from './src/components/Auth';
import { ListBirthday } from './src/components/ListBirthday';

const App = () => {

  const [user, setUser] = useState(undefined);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => setUser(response));
  }, [])

  if(user === undefined) return null;
  

  return (
    <>
      <StatusBar></StatusBar>
      <SafeAreaView style={styles.container}>
        {user ? <ListBirthday/> : <Auth/>}
      </SafeAreaView>
    </>
  );
}


export default App;

const styles = StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor: "#ff08"
    }
});