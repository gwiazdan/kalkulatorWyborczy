import React from "react";
import MunicipalitiesMap from "./AdministrativeMaps/MunicipalitiesMap.tsx";
import CountiesMap from './AdministrativeMaps/CountiesMap.tsx';
import VoivodeshipsMap from "./AdministrativeMaps/VoivodeshipsMap.tsx";
import {ElectionMap} from "./ElectionMap.tsx";
import {useCurrentMapContext} from "./Contexts/CurrentMapContext.tsx";


const MapSwitcher: React.FC = () => {
    const {currentState} = useCurrentMapContext();

    switch (currentState) {
        case 'gminy':
            return (
                <>
                    <MunicipalitiesMap/>
                </>
            )
        case 'powiaty':
            return (
                <>
                    <CountiesMap/>
                </>
            );
        case 'województwa':
            return (
                <>
                    <VoivodeshipsMap/>
                </>
            );
        default:
            return (
                <>
                    <ElectionMap/>
                </>
            );
    }
}

export default
MapSwitcher;