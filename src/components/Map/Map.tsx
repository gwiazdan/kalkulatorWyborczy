import MapSwitch from "./MapSwitch.tsx";
import React, {useEffect, useState} from "react";
import MapSwitcher from "./MapSwitcher.tsx";
import '../../css/map.css'

type ElectionResultsProps = {
    municipalitiesResults: any[];
    countiesResults: any[];
    voivodeshipsResults: any[];
};

interface MapProps {
    data: ElectionResultsProps | undefined;
}

const Map: React.FC<MapProps> = ({data}) => {
    const [currentState, setCurrentState] = useState<string>(() => {
        const savedState = localStorage.getItem('mapCurrentState');
        return savedState ? savedState : 'option1'; // Ustawienie domyślnej wartości
    });
    const handleStateChange = (newState: string) => {
        setCurrentState(newState);
    };

    useEffect(() => {
        localStorage.setItem('mapCurrentState', currentState);
    }, [currentState]);

    if (data != null) {
        return (
            <>
                <MapSwitch onChange={handleStateChange}/>
                <div className="flex h-full">
                    <MapSwitcher data={data} currentState={currentState}/>
                </div>
            </>
        )

    } else {
        return (<p>123</p>)
    }

}

export default Map;