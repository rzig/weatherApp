import { Sensor } from "./Sensor";

export type NavigationStack = {
    Login: undefined,
    Home: undefined,
    SensorView: {sensor: Sensor, create?: boolean},
    Scanner: undefined
}