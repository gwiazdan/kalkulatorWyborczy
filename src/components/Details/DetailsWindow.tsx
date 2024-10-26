import {CurrentMap, useCurrentMapContext} from "../Map/Contexts/CurrentMapContext.tsx";
import React from "react";
import {MunicipalitiesWindow} from "./MunicipalitiesWindow.tsx";

export const DetailsWindow: React.FC = () => {
    const {currentMap} = useCurrentMapContext();

    switch (currentMap) {
        case CurrentMap.GMINY:
            return (
                <>
                    <div className="p-4 bg-zinc-900 w-full">
                        <MunicipalitiesWindow/>
                    </div>
                </>
            );
        default:
            return (
                <>
                    <div className="p-4 bg-zinc-900 w-full">

                    </div>
                </>
            );
    }

};
