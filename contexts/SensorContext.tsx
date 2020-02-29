import React, { useReducer, useContext, useEffect } from 'react';
import { Sensor } from '../types/Sensor';
import firestore from '@react-native-firebase/firestore';

function createSensorInFirebase(sensor: Sensor) {
    console.log(JSON.stringify(sensor))
    firestore().collection("devices").doc(sensor.uuid).set(sensor).then().catch();
}

function updateSensorInFirebase(sensor: Partial<Sensor>) {
    console.warn("in update")
    firestore().collection("devices").doc(sensor.uuid).update(sensor).then().catch();
}

function deleteSensorInFirebase(uuid: string) {
    firestore().collection("devices").doc(uuid).delete().then().catch();
}

type Action = {type: 'UPDATE_SENSOR'|'ADD_SENSOR'|'DELETE_SENSOR'|'SET_SENSORS', [key: string]: any};
type Dispatch = (action: Action) => void;

function sensorReducer(sensors: Array<Sensor>, action: Action): Array<Sensor> {
    console.log(action);
    switch(action.type) {
        case 'UPDATE_SENSOR': {
            const uuid = action.uuid;
            const newValues: Partial<Sensor> = action.newValues;
            updateSensorInFirebase({uuid, ...newValues});
            let newSensors = [];
            sensors.forEach(sensor => {
                if(sensor.uuid === uuid) {
                    newSensors.push({...sensor, ...newValues})
                } else {
                    newSensors.push(sensor);
                }
            })
            return newSensors;
        }
        case "ADD_SENSOR": {
            let newSensors = [...sensors];
            const {name, notes, longitude, latitude} = action.newValues;
            let newSensor: Sensor = {
                uuid: action.uuid,
                name,
                notes,
                longitude,
                latitude
            }
            createSensorInFirebase(newSensor);
            newSensors.push(newSensor);
            return newSensors;
        }
        case "DELETE_SENSOR": {
            deleteSensorInFirebase(action.uuid);
            let newSensors = [];
            sensors.forEach(sensor => {
                if(sensor.uuid !== action.uuid) {
                    newSensors.push(sensor);
                }
            });
            return newSensors;
        }
        case "SET_SENSORS": {
            return action.sensors;
        }
        default: {
            throw new Error(`Unidentified action type ${action.type}`);
        }
    }
}

const SensorsDispatchContext = React.createContext<Dispatch | undefined>(undefined);
const SensorsStateContext = React.createContext<Array<Sensor> | undefined>(undefined);

function SensorsProvider({children}: {children: React.ReactNode}) {
    const [state, dispatch] = useReducer(sensorReducer, []);

    useEffect(() => {
        firestore().collection("devices").get().then(({docs}) => {
            let sensors: Array<Sensor> = [];
            docs.forEach(doc => {
                sensors.push(doc.data<Sensor>());
            })
            dispatch({type: "SET_SENSORS", sensors})
        }).catch((err) => {
            // Fail silenty because *demos*.
            alert("failure");
            const backupSensors = [
                {
                    name: "Sensor 1",
                    longitude: -83.002387,
                    latitude: 39.959195,
                    notes: "Hi",
                    uuid: "1"
                },
                {
                    name: "Sensor 2",
                    longitude: -83.002387,
                    latitude: 39.950195,
                    notes: "Hi",
                    uuid: "2"
                }
            ];
            dispatch({type: "SET_SENSORS", backupSensors})
        });
        firestore().collection("devices").onSnapshot(({docs}) => {
            let sensors: Array<Sensor> = [];
            docs.forEach(doc => {
                sensors.push(doc.data<Sensor>());
            })
            dispatch({type: "SET_SENSORS", sensors})
        })
    }, [])

    return (
        <SensorsStateContext.Provider value={state}>
            <SensorsDispatchContext.Provider value={dispatch}>
                {children}
            </SensorsDispatchContext.Provider>
        </SensorsStateContext.Provider>
    )
}

function useSensors(): Array<Sensor> {
    const context = useContext(SensorsStateContext);
    if(context === undefined) { throw new Error(`useSensors must be used within a SensorsProvider.`)}
    return context;
}

function useSensorsDispatch(): Dispatch {
    const context = useContext(SensorsDispatchContext);
    if(context === undefined) { throw new Error(`useSensorsDispatch must be used within a SensorsProvider.`)}
    return context;
}

export {SensorsProvider, useSensors, useSensorsDispatch};