import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import * as MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { measures } from '../styles/measures';
import { colors } from '../styles/colors';
import { View } from 'react-native';

interface MarkerProps {
    lon: number,
    lat: number,
    id: string,
    name: string,
    onPress?: () => void,
}
function Marker({lon, lat, onPress, id, name}: MarkerProps) {
    return (
        <MapboxGL.PointAnnotation id={id} title={name} coordinate={[lon, lat]} onSelected={onPress}>
            <View style={{padding: measures.outerGutter / 3, backgroundColor: colors.dark, borderRadius: 10}}>
                <MaterialIcon.default name="thermometer" color={colors.light} size={20}/>
            </View>
        </MapboxGL.PointAnnotation>
    )
}

export default Marker;