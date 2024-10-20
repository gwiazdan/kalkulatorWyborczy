import MapSwitch from "./MapSwitch.tsx";
import React, {useEffect, useState} from "react";
import MapSwitcher from "./MapSwitcher.tsx";
import '../../css/map.css'

interface MapProps{
    senateState: string;
    popularityState: string;
}

const Map: React.FC<MapProps> = ({senateState, popularityState}) => {
    const [currentState, setCurrentState] = useState<string>(() => {
        const savedState = localStorage.getItem('mapCurrentState');
        return savedState ? savedState : 'okręgi'; // Ustawienie domyślnej wartości
    });
    const handleStateChange = (newState: string) => {
        setCurrentState(newState);
    };


    useEffect(() => {
        localStorage.setItem('mapCurrentState', currentState);
    }, [currentState]);

    return (
        <>
            <MapSwitch onChange={handleStateChange}/>
            <div className="flex h-full">
                <MapSwitcher currentState={currentState} senateState={senateState} popularityState={popularityState}/>
            </div>
        </>
    )

}

export default Map;