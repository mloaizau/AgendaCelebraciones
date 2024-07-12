import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActionBar } from './ActionBar';
import { AddBirthday } from './AddBirthday';
import firebase from '../utils/firebase';
import "firebase/compat/firestore";

const db = firebase.firestore();

export const ListBirthday = (props: any) => {

    const user = props;

    const [showList, setShowList] = useState(true);
    const [birthday, setBirthday] = useState([]);

    useEffect(() => {
        setBirthday([]);
        db.collection(user.user.uid)
        .orderBy("dateBirth", "asc")
        .get()
        .then( (response) => {
            const itemsArray: any = [];
            response.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                itemsArray.push(data);
            });
            console.log(itemsArray)
        });
    }, [])


    return (
        <View style={styles.container}>
            {showList ? (
                <>
                    <Text>ListBirthday</Text>
                </>

            ) : (
                <AddBirthday user={user} setShowList={setShowList} />
            )}
            <ActionBar showList={showList} setShowList={setShowList} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        height: "100%"
    }
});