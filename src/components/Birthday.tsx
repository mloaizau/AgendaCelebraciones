import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const Birthday = (props: any) => {

    const { birthday, deleteBirthday } = props;
    const past = birthday.days > 0 ? true : false;
    const infoDay = () => {
        if (birthday.days === 0) {
            return(
                <Text style={{color: "#fff"}}> Es Hoy </Text>
            )
        } else {
            const days = -birthday.days;


            return (
                <View style={styles.textCurrent}>
                    <Text>{days}</Text>
                    <Text>
                        {days === 1 ? 'Día' : 'Días'}
                    </Text>
                </View>
            )
        }

    }

    return (
        <TouchableOpacity style={[styles.card, 
            past 
            ? styles.past 
            : birthday.days === 0 
            ? styles.actual 
            : styles.current ]}
            onPress={ () => deleteBirthday(birthday) }
            >
            <Text style={styles.userName}>
                {birthday.Nombre} {birthday.Apellidos}
            </Text>
            { past 
                ? <Text style={{color: "#fff"}}>Pasado</Text> 
                :  infoDay()
            }
        </TouchableOpacity>
    )
}

export default Birthday

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 60,
        alignItems: "center",
        paddingHorizontal: 10,
        margin: 10,
        borderRadius: 15
    },
    past:{
        backgroundColor: "red"
    },
    current: {
        backgroundColor: "#1ae1f2"
    },
    actual: {
        backgroundColor: "#559204"
    },
    userName: {
        color: "white",
        fontSize: 16
    },
    textCurrent: {
        backgroundColor: "#fff",
        borderRadius: 20,
        width: 50,
        alignItems: "center",
        justifyContent: "center"
    }
});