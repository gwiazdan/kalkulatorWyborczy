import React, {useEffect, useState} from "react";
import MunicipalitiesMap from "./MunicipalitiesMap.tsx";
import CountiesMap from './CountiesMap.tsx';
import VoivodeshipsMap from "./VoivodeshipsMap.tsx";
import {MunicipalitiesProvider} from "./Contexts/MunicipalitiesContext.tsx";
import {CountiesProvider} from "./Contexts/CountiesContext.tsx";
import {VoivodeshipsProvider} from "./Contexts/VoivodeshipsContext.tsx";
import {SenateProvider} from "./Contexts/SenateContext.tsx";
import SenateMap from "./SenateMap.tsx";


interface MapSwitcherProps {
    currentState: string;
    senateState: string;
    popularityState: string;
}

const MapSwitcher: React.FC<MapSwitcherProps> = ({currentState, senateState, popularityState}) => {
    const [currentPopularityState, setCurrentPopularityState] = useState<number>(0);
    useEffect(() => {
        switch(popularityState){
            case 'Poparcie partii':
                setCurrentPopularityState(0);
                break;
            case 'Rząd vs PiS':
                setCurrentPopularityState(1);
                break;
            case 'Rząd vs Opozycja':
                setCurrentPopularityState(2);
                break;
            default:
        }
    }, [popularityState]);

    switch (currentState) {
        case 'gminy':
            return (
                <>
                    <MunicipalitiesProvider>
                        <MunicipalitiesMap popularityState={currentPopularityState}/>
                    </MunicipalitiesProvider>
                </>
            )
        case 'powiaty':
            return (
                <>
                    <CountiesProvider>
                        <CountiesMap popularityState={currentPopularityState}/>
                    </CountiesProvider>
                </>
            );
        case 'województwa':
            return (
                <>
                    <VoivodeshipsProvider>
                        <VoivodeshipsMap popularityState={currentPopularityState}/>
                    </VoivodeshipsProvider>
                </>
            );
        default:
            return (
                <>
                    <SenateProvider>
                        <SenateMap senateState={senateState}/>
                    </SenateProvider>
                </>
            );
    }
}

export default
MapSwitcher;