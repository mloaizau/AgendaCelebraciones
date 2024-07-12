import { View, Text, TouchableOpacity, StyleSheet, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import React, { useState } from 'react';
import { validateEmail } from '../utils/validators';
import firebase from '../utils/firebase';

export const LoginForm = (props: any) => {

    const changeForm = props.changeForm;

    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError] = useState({});

    const login = () => {
        let errors = {};
        if(!formData.correo || !formData.password) {
            if(!formData.correo) errors.correo = true;
            if(!formData.correo) errors.password = true;

        } else if (!validateEmail(formData.correo)) {
            errors.correo = true;
        } else {
            firebase.auth().signInWithEmailAndPassword(formData.correo, formData.password)
            .then( () => {
                console.log("ok");
            } )
            .catch((e)=> {
                console.log("error ", e);
                setFormError({ correo: true, password: true})
            })
        }

        setFormError(errors);
    }

    const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>, type: string) => {
        setFormData({...formData, [type]: e.nativeEvent.text});
    }

    return (
        <>
            <TextInput
                placeholder='Correo electrónico'
                placeholderTextColor="#969696"
                style={[styles.input, formError.correo && styles.errorInput]}
                onChange={(e) => onChange(e, "correo")}
            ></TextInput>
            <TextInput
                placeholder='Contraseña'
                placeholderTextColor="#969696"
                secureTextEntry={true}
                style={[styles.input, formError.password && styles.errorInput]}
                onChange={(e) => onChange(e, "password")}

            ></TextInput>

            <TouchableOpacity onPress={login}>
                <Text style={styles.btnText}>Iniciar sesión</Text>
            </TouchableOpacity>
            <View style={styles.register}>
                <TouchableOpacity onPress={changeForm}>
                    <Text style={styles.btnText}>Regístrate</Text>
                </TouchableOpacity>
            </View>

        </>
    )
}

const defaultValue = () => {
    return {
        correo: "",
        password: "",
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
    register: {
        flex: 1,
        justifyContent: "flex-end",
        bottom: 10
    },    
    errorInput: {
        borderColor: "#940c0c"
    }
});