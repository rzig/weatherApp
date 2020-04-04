import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView, Alert, Keyboard, LayoutChangeEvent } from 'react-native';
import BodyText from '../components/BodyText';
import { NavigationStack } from '../types/NavigationStack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign'
import HeaderText from '../components/HeaderText';
import { measures } from '../styles/measures';
import { colors } from '../styles/colors';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { mapStyleURL } from '../config';
import { TextInput } from 'react-native-gesture-handler';
import { fonts } from '../styles/text';
import Marker from '../components/Marker';
import { useSensorsDispatch } from '../contexts/SensorContext';
import * as MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
    route: RouteProp<NavigationStack, 'SensorView'>
}
function SensorView({route: {params: {sensor, create}}}: Props) {
    const navigation = useNavigation();
    const [name, setName] = useState<string>(sensor.name);
    const [notes, setNotes] = useState<string>(sensor.notes);
    const [lon, setLon] = useState<number>(sensor.longitude);
    const [lat, setLat] = useState<number>(sensor.latitude);
    const [hasUpdated, setHasUpdated] = useState<boolean>(false);
    const sensorsDispatch = useSensorsDispatch();

    const save = () => {
        sensorsDispatch({
            type: create ? "ADD_SENSOR" : "UPDATE_SENSOR",
            uuid: sensor.uuid,
            newValues: {
                name,
                notes,
                longitude: lon,
                latitude: lat
            }
        })
        navigation.navigate("Home");
    }

    const attemptBack = () => {
        if(!hasUpdated) {
            navigation.goBack();
        } else {
            Alert.alert(
                "Are you sure?",
                "You have made changes to this sensor. These changes will not be saved when you go back.",
                [
                    {
                        text: "Cancel",
                        onPress: () => {}
                    },
                    {
                        text: "OK",
                        onPress: () => navigation.goBack()
                    }
                ]
            )
        }
    }

    const attemptDelete = () => {
        Alert.alert(
            "Are you sure?",
            "You are about to delete this sensor. This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    onPress: () => {}
                },
                {
                    text: "OK",
                    onPress: () => {
                        sensorsDispatch({type: "DELETE_SENSOR", uuid: sensor.uuid})
                        navigation.goBack();
                    }
                }
            ]
        )
    }

    const [displayMap, setDisplayMap] = useState<boolean>(true);

    const handleLayout = (event: LayoutChangeEvent) => {
        if(event.nativeEvent.layout.height < 30) {
            setDisplayMap(false);
        } else {
            setDisplayMap(true);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <HeaderText level={1} style={styles.headerText}>Configure</HeaderText>
                <TouchableOpacity onPress={() => attemptBack()}>
                    <Icon name="closecircle" size={45} color={colors.dark} style={styles.icon}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => save()}>
                    <Icon name="checkcircle" size={45} color={colors.dark} style={styles.icon}/>
                </TouchableOpacity>
            </View>
            <KeyboardAvoidingView style={[styles.container, {paddingTop: 0}]} behavior="padding" enabled>
                <View style={styles.mapContainer} onLayout={handleLayout}>
                    {displayMap && 
                        <MapboxGL.MapView
                            style={styles.map}
                            styleURL={mapStyleURL}
                            onPress={(feature) => {
                                let coords = feature.geometry.coordinates;
                                setLon(coords[0]);
                                setLat(coords[1]);
                                setHasUpdated(true);
                            }
                        }>
                            <MapboxGL.Camera
                                centerCoordinate={[lon, lat]}
                                defaultSettings={{centerCoordinate: [lon, lat], zoomLevel: 15}}
                            />
                            <Marker
                                name={name}
                                lat={lat}
                                lon={lon}
                                id={sensor.uuid}
                            />
                        </MapboxGL.MapView>
                    }
                </View>
                {displayMap && 
                                    <BodyText style={styles.mapTooltip}>
                                    Tap a location on the map to set the device's location. Use two fingers to move the map.
                                </BodyText>
                }
                <View style={[styles.form]}>
                    <BodyText>Name</BodyText>
                    <TextInput value={name} style={styles.formInput} onChangeText={(newText) => {setName(newText); setHasUpdated(true)}}/>
                    <BodyText>Notes</BodyText>
                    <TextInput
                        value={notes}
                        style={styles.formInput}
                        onChangeText={(newText) => {setNotes(newText); setHasUpdated(true)}}
                        maxLength={140}
                        multiline
                        keyboardType="default"
                    />
                </View>
            </KeyboardAvoidingView>
            {!create && 
                <TouchableOpacity onPress={() => attemptDelete()} style={styles.deleteIcon}>
                    <MaterialIcon.default name="delete-circle" size={55} color={colors.dark}/>
                </TouchableOpacity>
            }
        </View>
    )
}

export default SensorView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        paddingTop: measures.outerGutter,
        backgroundColor: "#fff"
    },
    header: {
        display: "flex",
        flexDirection: "row",
        zIndex: 10000,
        backgroundColor: "#fff"
    },
    headerText: {
        lineHeight: 50,
        marginLeft: measures.outerGutter,
        flexGrow: 1
    },
    icon: {
        marginRight: measures.outerGutter
    },
    mapContainer: {
        marginTop: measures.outerGutter,
        width: Dimensions.get("screen").width - (2 * measures.outerGutter),
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 25,
        overflow: "hidden",
        height: "35%"
    },
    map: {
        // height: "25%",
        flex: 1
    },
    mapTooltip: {
        paddingLeft: measures.outerGutter,
        paddingRight: measures.outerGutter,
        color: colors.gray,
        marginTop: measures.outerGutter / 2
    },
    form: {
        marginTop: measures.outerGutter,
        paddingLeft: measures.outerGutter,
        paddingRight: measures.outerGutter,
        height: "100%"
    },
    formInput: {
        paddingTop: 4,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: colors.dark,
        color: colors.dark,
        fontFamily: fonts.sansSerif,
        marginBottom: 5,
        paddingHorizontal: 0
    },
    deleteIcon: {
        position: "absolute",
        bottom: measures.outerGutter,
        right: measures.outerGutter,
        
    }
})