import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { LoginForm } from './LoginForm';
import {RegisterForm} from './RegisterForm';

export const Auth = () => {

    const [isLogin, setIsLogin] = useState(true);

    const changeForm = () => {
        setIsLogin(!isLogin);
    }

    return(
        <View style={styles.view}>
            <Image style={styles.logo} source={require("../assets/logo.webp")}></Image>
            { isLogin ? <LoginForm changeForm={changeForm} /> : <RegisterForm changeForm={changeForm} /> }
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: "center"
    },
    logo: {
        width: "80%",
        height: 240,
        marginTop: 50,
        marginBottom: 50
    }
});
