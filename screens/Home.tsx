import React from 'react';
import HeaderText from '../components/HeaderText';
import { View, StyleSheet } from 'react-native';
import { measures } from '../styles/measures';
import Icon from 'react-native-vector-icons/AntDesign';
import { colors } from '../styles/colors';

function Home() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <HeaderText level={1} style={styles.headerText}>Sensors</HeaderText>
                <Icon name="pluscircle" size={45} color={colors.dark} style={styles.icon}/>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        paddingTop: 2.5 * measures.outerGutter,
        backgroundColor: "#fff"
    },
    header: {
        display: "flex",
        flexDirection: "row"
    },
    headerText: {
        lineHeight: 50,
        marginLeft: measures.outerGutter,
        flexGrow: 1
    },
    icon: {
        marginRight: measures.outerGutter
    }
})