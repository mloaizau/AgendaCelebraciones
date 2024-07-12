import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import { validateEmail } from '../utils/validators';
import firebase from '../utils/firebase';

export const RegisterForm = (props: any) => {

    const { changeForm } = props;

    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError] = useState({});

    const register = () => {
        let errors = {};
        if (!formData.correo || !formData.pwd || !formData.repeatPwd) {
            if (!formData.correo) errors.correo = true;
            if (!formData.correo) errors.pwd = true;
            if (!formData.correo) errors.repeatPwd = true;
        } else if (!validateEmail(formData.correo)) {
            console.log("object")
            errors.correo = true;
        } else if (formData.pwd !== formData.repeatPwd) {
            console.log("object 1")

            errors.pwd = true;
            errors.repeatPwd = true;
        } else if (formData.pwd.length < 6){
            console.log("object 2")

            errors.pwd = true;
            errors.repeatPwd = true;
        } else {
            console.log("correcto ")
            firebase.auth().createUserWithEmailAndPassword(formData.correo, formData.pwd)
            .then( () => {
                console.log("cuenta creada");
            }).catch(() => {
                console.log("error");
                setFormError({
                    correo: true,
                    pwd: true,
                    repeatPwd: true
                })
            })
        }
        setFormError(errors);
        console.log(formData);
    }


    return (
        <>
            <TextInput
                placeholder='Correo electrónico'
                placeholderTextColor={"#969696"}
                style={[styles.input, formError.correo && styles.errorInput]}
                onChange={(e) => setFormData({...formData, correo: e.nativeEvent.text })}
            ></TextInput>
            <TextInput 
                secureTextEntry={true} 
                placeholder='Contraseña' 
                placeholderTextColor={"#969696"} 
                style={[styles.input, formError.pwd && styles.errorInput]}
                onChange={(e) => setFormData({...formData, pwd: e.nativeEvent.text })}
            ></TextInput>
            <TextInput 
                secureTextEntry={true} 
                placeholder='Repetir contraseña' 
                placeholderTextColor={"#969696"} 
                style={[styles.input, formError.repeatPwd && styles.errorInput]}
                onChange={(e) => setFormData({...formData, repeatPwd: e.nativeEvent.text })}
            ></TextInput>
            <TouchableOpacity>
                <Text style={styles.btnText} onPress={register}> Regístrate </Text>
            </TouchableOpacity>
            <View style={styles.login}>
                <TouchableOpacity>
                    <Text style={styles.btnText} onPress={changeForm} > Iniciar sesión </Text>
                </TouchableOpacity>
            </View>

        </>
    )
}

const defaultValue = () => {
    return {
        correo: "",
        pwd: "",
        repeatPwd: ""
    }
}

const styles = StyleSheet.create({
    btnText: {
        color: "#000",
        fontSize: 20
    },
    input: {
        height: 50,
        color: "#fff",
        width: "80%",
        marginBottom: 25,
        backgroundColor: "#1e3040",
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#1e3040"
    },
    login: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 10
    },
    errorInput: {
        borderColor: "#940c0c"
    }
});