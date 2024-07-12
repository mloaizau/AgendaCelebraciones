import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

export const AddBirthday = () => {

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [formData, setFormData] = useState({});

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        const dateBirth = date;
        dateBirth.setHours(0);
        dateBirth.setMinutes(0);
        dateBirth.setSeconds(0);
        setFormData({...formData, dateBirth});
        hideDatePicker();
    };

    return (
        <>
            <View style={styles.container}>
                <TextInput
                    placeholder='Nombre'
                    placeholderTextColor={"#969696"}
                    style={styles.input}
                ></TextInput>
                <TextInput
                    placeholder='Apellidos'
                    placeholderTextColor={"#969696"}
                    style={styles.input}
                ></TextInput>
                <View style={[styles.input, styles.datePicker]}>
                    <Text style={{color: formData.dateBirth ? '#fff' : '#969696', fontSize: 18}} 
                        onPress={showDatePicker}>
                        { formData.dateBirth ? moment(formData.dateBirth).format("LL")
                        : 'Fecha de nacimiento' }
                    </Text>
                </View>
            </View>
            <DateTimePickerModal 
                isVisible={isDatePickerVisible} 
                mode='date' 
                onConfirm={handleConfirm} 
                onCancel={hideDatePicker} 
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        height: 50,
        color: "white",
        width: "80%",
        marginBottom: 25,
        backgroundColor: "#1e3040",
        paddingHorizontal: 20,
        paddingRight: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#1e3040",
        borderRadius: 50
    },
    datePicker: {
        justifyContent: "center"
    }
})