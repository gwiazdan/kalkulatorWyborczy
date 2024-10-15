import MunicipalitiesMap from "./MunicipalitiesMap.tsx";
import CountiesMap from "./CountiesMap.tsx";
import React from "react";
import VoivodeshipsMap from "./VoivodeshipsMap.tsx";

type ElectionResultsProps = {
    municipalitiesResults: any[];
    countiesResults: any[];
    voivodeshipsResults: any[];
};

interface MunicipalitiesMapProps {
    data: ElectionResultsProps;
    currentState: string;
}

const MapSwitcher: React.FC<MunicipalitiesMapProps> = ({data, currentState}) => {

    switch (currentState) {
        case 'gminy':
            return (<><MunicipalitiesMap municipalitiesResults={data.municipalitiesResults}/></>)
        case 'powiaty':
            return (<><CountiesMap countiesResults={data.countiesResults}/></>);
        case 'wojewodztwa':
            return (<><VoivodeshipsMap voivodeshipsResults={data.voivodeshipsResults}/></>);
        default:
            return (<p>:|</p>);
    }
}

export default MapSwitcher;