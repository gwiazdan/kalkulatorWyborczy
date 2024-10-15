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
        case 'option1':
            return (<><MunicipalitiesMap municipalitiesResults={data.municipalitiesResults}/></>)
        case 'option2':
            return (<><CountiesMap countiesResults={data.countiesResults}/></>);
        case 'option3':
            return (<><VoivodeshipsMap voivodeshipsResults={data.voivodeshipsResults}/></>);
        default:
            return (<p>:|</p>);
    }
}

export default MapSwitcher;