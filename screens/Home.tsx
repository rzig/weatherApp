import React from 'react';
import HeaderText from '../components/HeaderText';
import { View, StyleSheet, Text } from 'react-native';
import { measures } from '../styles/measures';
import Icon from 'react-native-vector-icons/AntDesign';
import { colors } from '../styles/colors';
import MapboxGL from "@react-native-mapbox-gl/maps";
import {mapboxToken, mapStyleURL} from '../config';
import { useSensors } from '../contexts/SensorContext';

MapboxGL.setAccessToken(mapboxToken);

function Home() {
    const sensors = useSensors();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <HeaderText level={1} style={styles.headerText}>Sensors</HeaderText>
                <Icon name="pluscircle" size={45} color={colors.dark} style={styles.icon}/>
            </View>
            <MapboxGL.MapView style={styles.map} styleURL={mapStyleURL} >
                <MapboxGL.Camera
                    zoomLevel={6}
                    pitch={60}
                    centerCoordinate={[39.959194, -83.002389]}
                />
                <MapboxGL.VectorSource id="composite">
                    <MapboxGL.FillExtrusionLayer 
                        id='buildingFill'
                        sourceLayerID="building"
                        // sourceID='composite' 
                        style={{
                            fillExtrusionColor: "#ccc",
                            fillExtrusionHeight: [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                15,
                                0,
                                15.05,
                                ['get', 'height']
                                ],
                            fillExtrusionBase: [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                15,
                                0,
                                15.05,
                                ['get', 'min_height']
                                ],
                            fillExtrusionOpacity: 1
                        }}
                        filter={['==', 'extrude', 'true']}
                    />
                </MapboxGL.VectorSource>
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