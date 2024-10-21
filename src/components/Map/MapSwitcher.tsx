import React from "react";
import MunicipalitiesMap from "./AdministrativeMaps/MunicipalitiesMap.tsx";
import CountiesMap from './AdministrativeMaps/CountiesMap.tsx';
import VoivodeshipsMap from "./AdministrativeMaps/VoivodeshipsMap.tsx";
import {MunicipalitiesProvider} from "./Contexts/MunicipalitiesContext.tsx";
import {CountiesProvider} from "./Contexts/CountiesContext.tsx";
import {VoivodeshipsProvider} from "./Contexts/VoivodeshipsContext.tsx";
import {SenateProvider} from "./Contexts/SenateContext.tsx";
import SenateMap from "./SenateMap.tsx";


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
        case 'województwa':
            return (
                <>
                    <VoivodeshipsProvider>
                        <VoivodeshipsMap/>
                    </VoivodeshipsProvider>
                </>
            );
        default:
            return (
                <>
                    <SenateProvider>
                            <SenateMap/>
                    </SenateProvider>
                </>
            );
    }
}

export default
MapSwitcher;