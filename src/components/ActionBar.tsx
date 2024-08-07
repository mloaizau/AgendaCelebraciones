import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import firebase from '../utils/firebase';

export const ActionBar = (props: { showList: any; setShowList: any; }) => {

    const {showList, setShowList} = props;

    return (
        <View style={styles.viewFooter}>
            <View style={styles.viewClose}>
                <Text style={styles.textClose} onPress={ () => firebase.auth().signOut() }>Cerrar sesión</Text>
            </View>
            <View style={styles.viewAdd}>
                <Text style={styles.textClose} onPress={ () => setShowList(!showList) } >
                    { showList ? "Nueva fecha" : "Cancelar fecha" }
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewFooter: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        width: "100%",
        height: 50,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 30,
        marginBottom: 20
    },
    viewClose: {
        backgroundColor: "#820000",
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 30
    },
    textClose: {
        fontSize: 16,
        color: "#fff",
        textAlign: "center"
    },
    viewAdd: {
        backgroundColor: "#1ea1f2",
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 30
    }
});