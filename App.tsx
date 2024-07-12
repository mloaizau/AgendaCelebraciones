import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import firebase from './src/utils/firebase';
import "firebase/compat/auth";
import { Auth } from './src/components/Auth';

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
        {user ? <Logout/> : <Auth/>}
      </SafeAreaView>
    </>
  );
}

const Logout = () => {

  const logout = () => {
    firebase.auth().signOut();
  }

  return(
    <View>
      <Text>Estas Logeado</Text>
      <Button title='Cerrar Sesión' onPress={logout}></Button>
    </View>
  )
}

export default App;

const styles = StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor: "#ff08"
    }
});