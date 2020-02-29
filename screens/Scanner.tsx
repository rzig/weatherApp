import React from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar, Platform } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import BodyText from '../components/BodyText';
import { measures } from '../styles/measures';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign'
import { colors } from '../styles/colors';
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { useNavigation } from '@react-navigation/native';
import { Sensor } from '../types/Sensor';
import Geolocation from '@react-native-community/geolocation';

function Scanner() {
    const navigation = useNavigation();

    const processRead = (data: string) => {
        const jsonData = JSON.parse(data);

        if('sensor' in jsonData) {
            Geolocation.getCurrentPosition((pos) => {
                const {longitude, latitude} = pos.coords;
                const sensor: Sensor = {
                    name: "",
                    notes: "",
                    longitude,
                    latitude,
                    uuid: jsonData.uuid
                }
                navigation.navigate("SensorView", {sensor, create: true})
            })
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar hidden={Platform.OS === "ios"}/>
            <QRCodeScanner
                cameraStyle={styles.camera}
                onRead={(event) => {processRead(event.data)}}
            />
            <View style={styles.bottomTooltip}>
                <LinearGradient colors={["rgba(0,0,0,0)", "rgba(0,0,0,.9)"]} style={styles.gradient}>
                    <BodyText style={styles.tooltipText}>
                        Scan the provided QR code to activate device.
                    </BodyText>
                </LinearGradient>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backbutton}>
                <Icon name="close" size={30} color={colors.light}/>
            </TouchableOpacity>
        </View>
    )
}

export default Scanner;

const styles = StyleSheet.create({
    container: {
        flex: 1 // we want this to cover all screen, even on iphone x
    },
    camera: {
        width: "100%",
        height: "100%",
        backgroundColor: "#ccc"
    },
    bottomTooltip: {
        position: "absolute",
        width: "100%",
        bottom: 0,
        height: 100
    },
    tooltipText: {
        textAlign: "center",
        color: "white",
        // marginBottom: measures.outerGutter,
        marginTop: measures.outerGutter * 3,
        bottom: 0
    },
    gradient: {
        width: "100%",
        height: "100%",
    },
    backbutton: {
        right: measures.outerGutter,
        top: measures.outerGutter,
        position: "absolute",
        ...ifIphoneX({paddingTop: 44}, {}),
        padding: 7.5, // This icon has size 30 which is 15 smaller
                      // than on the home screen. use padding to
                      // align centers for ease of use,
    }
})