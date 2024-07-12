import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { ActionBar } from './ActionBar';
import { AddBirthday } from './AddBirthday';

export const ListBirthday = (props: any) => {

    const user = props;

    const [showList, setShowList] = useState(true);

    return (
        <View style={styles.container}>
            { showList ? (
                <>
                    <Text>ListBirthday</Text>
                </>

            ) : (
                <AddBirthday user={user} setShowList={setShowList}/>
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