import MapSwitch from "./MapSwitch.tsx";
import React from "react";
import MapSwitcher from "./MapSwitcher.tsx";
import '../../css/map.css'


const Map: React.FC = () => {


    return (
        <>
            <MapSwitch/>
            <MapSwitcher/>
        </>
    )

}

export default Map;