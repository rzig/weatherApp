import React, { useReducer, useContext } from 'react';
import { Sensor } from '../types/Sensor';

let sensors: Array<Sensor> = [
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
        latitude: 39.859195,
        notes: "Hi",
        uuid: "2"
    }
]

type Action = {type: 'UPDATE_SENSOR'|'ADD_SENSOR'|'DELETE_SENSOR', [key: string]: any};
type Dispatch = (action: Action) => void;

function sensorReducer(sensors: Array<Sensor>, action: Action): Array<Sensor> {
    switch(action.type) {
        case 'UPDATE_SENSOR': {
            //
        }
        case "ADD_SENSOR": {
            //
        }
        case "DELETE_SENSOR": {
            //
        }
        default: {
            throw new Error(`Unidentified action type ${action.type}`);
        }
    }
}

const SensorsDispatchContext = React.createContext<Dispatch | undefined>(undefined);
const SensorsStateContext = React.createContext<Array<Sensor> | undefined>(undefined);

function SensorsProvider({children}: {children: React.ReactNode}) {
    const [state, dispatch] = useReducer(sensorReducer, sensors);
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