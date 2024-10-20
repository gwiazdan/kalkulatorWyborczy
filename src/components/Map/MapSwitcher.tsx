import React from "react";
import MunicipalitiesMap from "./MunicipalitiesMap.tsx";
import CountiesMap from './CountiesMap.tsx';
import VoivodeshipsMap from "./VoivodeshipsMap.tsx";
import {MunicipalitiesProvider} from "./Contexts/MunicipalitiesContext.tsx";
import {CountiesProvider} from "./Contexts/CountiesContext.tsx";
import {VoivodeshipsProvider} from "./Contexts/VoivodeshipsContext.tsx";


interface MapSwitcherProps {
    currentState: string;
}

const MapSwitcher: React.FC<MapSwitcherProps> = ({currentState}) => {
    switch (currentState) {
        case 'gminy':
            return (
                <>
                    <MunicipalitiesProvider>
                        <MunicipalitiesMap/>
                    </MunicipalitiesProvider>
                </>
            )
        case 'powiaty':
            return (
                <>
                    <CountiesProvider>
                        <CountiesMap/>
                    </CountiesProvider>
                </>
            );
        case 'wojewodztwa':
            return (
                <>
                    <VoivodeshipsProvider>
                        <VoivodeshipsMap/>
                    </VoivodeshipsProvider>
                </>
            );
        default:
            return (<p>:|</p>);
    }
}

export default MapSwitcher;