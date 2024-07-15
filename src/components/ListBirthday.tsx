import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActionBar } from './ActionBar';
import { AddBirthday } from './AddBirthday';
import firebase from '../utils/firebase';
import "firebase/compat/firestore";
import moment from 'moment';
import Birthday from './Birthday';

const db = firebase.firestore();

export const ListBirthday = (props: any) => {

    const {user} = props;

    const [showList, setShowList] = useState(true);
    const [birthday, setBirthday] = useState([]);
    const [pastBirthday, setPastBirthday] = useState([]);
    const [reloadData, setReloadData] = useState(false);

    useEffect(() => {
        setBirthday([]);
        setPastBirthday([]);
        db.collection(user.uid)
            .orderBy("dateBirth", "asc")
            .get()
            .then((response) => {
                const itemsArray: any = [];
                response.forEach((doc) => {
                    const data = doc.data();
                    data.id = doc.id;
                    itemsArray.push(data);
                });
                formatData(itemsArray);
            });
        setReloadData(false);
    }, [reloadData]);

    const formatData = (items: any) => {
        const currentDate = moment().set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        });
        const birthdayTempArray: any = [];
        const pastBirthdayTempArray: any = [];

        items.forEach((item: any) => {
            const dateBirth = new Date(item.dateBirth.seconds * 1000);
            const dateBirthday = moment(dateBirth);
            const currentYear = moment().get("year");
            dateBirthday.set({ year: currentYear });
            const diffDate = currentDate.diff(dateBirthday, "days");
            let itemTemp = item;
            itemTemp.dateBirth = dateBirthday;
            itemTemp.days = diffDate;

            if (diffDate <= 0) {
                birthdayTempArray.push(itemTemp);
            } else {
                pastBirthdayTempArray.push(itemTemp);
            }

        });
        setBirthday(birthdayTempArray);
        setPastBirthday(pastBirthdayTempArray);
    }

    const deleteBirthday = (birthday) => {
        Alert.alert(
            'Eliminar cumpleaños',
            `¿Estás seguro de eliminar el cumpleaños de ${birthday.Nombre} ${birthday.Apellidos}`,
            [
                {
                    text: "Cancelar",
                    style: 'cancel'
                },
                {
                    text: "Aceptar",
                    onPress: () => {
                        db.collection(user.uid)
                            .doc(birthday.id)
                            .delete().then( () => {
                                setReloadData(true);
                            });
                    }
                }
            ],
            { cancelable: false }
        )
    }

    return (
        <View style={styles.container}>
            {showList ? (
                <ScrollView style={styles.scrollview}>
                    { birthday.map( (item, index) => (
                        <Birthday key={index} birthday={item} deleteBirthday={deleteBirthday} />
                    ))}
                    { pastBirthday.map( (item, index) => (
                        <Birthday key={index} birthday={item} deleteBirthday={deleteBirthday} />
                    ) )}
                </ScrollView>
            ) : (
                <AddBirthday user={user} setShowList={setShowList} setReloadData={setReloadData} />
            )}
            <ActionBar showList={showList} setShowList={setShowList} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        height: "100%"
    },
    scrollview: {
        marginBottom: 50,
        width: "100%"
    }
});