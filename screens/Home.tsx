import React, { useState, useRef } from 'react';
import HeaderText from '../components/HeaderText';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { measures } from '../styles/measures';
import * as AntIcon from 'react-native-vector-icons/AntDesign';
import * as MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../styles/colors';
import MapboxGL from "@react-native-mapbox-gl/maps";
import {mapboxToken, mapStyleURL} from '../config';
import { useSensors } from '../contexts/SensorContext';
import { useNavigation } from '@react-navigation/native';

interface MarkerProps {
    lon: number,
    lat: number,
    id: string,
    name: string,
    onPress?: () => void,
}
function Marker({lon, lat, onPress, id, name}: MarkerProps) {
    return (
        <MapboxGL.PointAnnotation id={id} title={name} coordinate={[lon, lat]} onSelected={() => onPress()}>
            <View style={{padding: measures.outerGutter / 3, backgroundColor: colors.dark, borderRadius: 10}}>
                <MaterialIcon.default name="thermometer" color={colors.light} size={20}/>
            </View>
        </MapboxGL.PointAnnotation>
    )
}

MapboxGL.setAccessToken(mapboxToken);

function Home() {
    const sensors = useSensors();
    const [datavis, setDatavis] = useState<boolean>(false);
    const camera = useRef<MapboxGL.Camera>();
    const navigation = useNavigation();

    const transition = () => {
        if(!datavis) {
            camera.current.setCamera({
                // centerCoordinate: [-83.002389, 39.959194],
                pitch: 60,
                zoomLevel: 17.5,
                animationDuration: 2000
            });
        } else {
            camera.current.setCamera({
                // centerCoordinate: [-83.002389, 39.959194],
                pitch: 0,
                animationDuration: 2000,
                zoomLevel: 15
            })
        }
        setDatavis(!datavis);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <HeaderText level={1} style={styles.headerText}>Sensors</HeaderText>
                <TouchableOpacity onPress={transition}>
                    <MaterialIcon.default name="cube" size={45} color={colors.dark} style={styles.icon}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                    <AntIcon.default name="pluscircle" size={45} color={colors.dark} style={styles.icon}/>
                </TouchableOpacity>
            </View>
            <MapboxGL.MapView style={styles.map} styleURL={mapStyleURL}>
                <MapboxGL.Camera
                    zoomLevel={15}
                    centerCoordinate={[-83.002389, 39.959194]}
                    ref={ref => camera.current = ref}
                    defaultSettings={{centerCoordinate: [-83.002389, 39.959194]}}
                />
                <MapboxGL.VectorSource id="composite">
                    {datavis && <MapboxGL.FillExtrusionLayer 
                        id='buildingFill'
                        sourceLayerID="building"
                        style={{
                            fillExtrusionColor: "#ccc",
                            fillExtrusionHeight: [
                                "interpolate",
                                ["linear"],
                                ["get", "height"],
                                0,
                                10,
                                2000,
                                2000
                            ],
                            fillExtrusionBase: [
                                "interpolate",
                                ["linear"],
                                ["get", "min_height"],
                                0,
                                0,
                                2000,
                                2000
                              ],
                            fillExtrusionOpacity: 1
                        }}
                        filter={['==', 'extrude', 'true']}
                    />}
                </MapboxGL.VectorSource>
                {sensors.map(sensor => (
                    <Marker
                        name={sensor.name}
                        lon={sensor.longitude}
                        lat={sensor.latitude}
                        id={sensor.uuid}
                        onPress={() => navigation.navigate("SensorView", {sensor})}
                        key={sensor.uuid}
                    />
                ))}
                {/* <Marker name="Sensor Name" lon={-83.002389} lat={39.959194} id="ann2" onPress={() => alert("hi")}/> */}
                {/* <MapboxGL.PointAnnotation key="ann1" id="ann1" title="Sensor Name" coordinate={[-83.002389, 39.959194]}>
                    <View style={{width: 100, height: 100, backgroundColor: "red"}}></View>
                </MapboxGL.PointAnnotation> */}
            </MapboxGL.MapView>
        </View>
    )
}

export default Home

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
        flexDirection: "row"
    },
    headerText: {
        lineHeight: 50,
        marginLeft: measures.outerGutter,
        flexGrow: 1
    },
    icon: {
        marginRight: measures.outerGutter
    },
    map: {
        flex: 1,
        marginTop: .5 * measures.outerGutter
    }
})