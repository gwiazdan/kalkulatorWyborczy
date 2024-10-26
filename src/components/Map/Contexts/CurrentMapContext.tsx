import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {ElectionsOption, useElectionsContext} from "../../Contexts/ElectionsContext.tsx";

interface CurrentMapContextType {
    children: ReactNode;
}

interface CurrentMapContextProps {
    currentMap: CurrentMap;
    currentState: CurrentMap;
    setCurrentState: (option: CurrentMap) => void;
}

const CurrentMapContext = createContext<CurrentMapContextProps | undefined>(undefined);

export const CurrentMapProvider: React.FC<CurrentMapContextType> = ({children}) => {
    const [currentMap, setCurrentMap] = useState<CurrentMap>(() => {
        const savedState = localStorage.getItem('currentMap') as CurrentMap;
        return savedState ? savedState : CurrentMap.GMINY;
    });
    const {electionsOption} = useElectionsContext();
    const [currentState, setCurrentState] = useState<CurrentMap>(() => {
        const savedState = localStorage.getItem('mapCurrentState') as CurrentMap;
        return savedState ? savedState : CurrentMap.GMINY;
    });

    useEffect(() => {
        if (currentState != CurrentMap.OKREGI) setCurrentMap(currentState);
        if (currentState == CurrentMap.OKREGI) {
            switch (electionsOption) {
                case ElectionsOption.Sejm:
                    setCurrentMap(CurrentMap.SEJM);
                    break;
                case(ElectionsOption.Senat):
                    setCurrentMap(CurrentMap.SENAT);
                    break;
                case(ElectionsOption.Sejmiki):
                    setCurrentMap(CurrentMap.SEJMIKI);
                    break;
                case(ElectionsOption.Europarlament):
                    setCurrentMap(CurrentMap.EUROPARLAMENT);
                    break;
                default:
            }
        }

    }, [electionsOption, currentState]);

    useEffect(() => {
        localStorage.setItem('mapCurrentState', currentState);
    }, [currentState]);

    useEffect(() => {
        localStorage.setItem('currentMap', currentMap);
    }, [currentMap]);

    return (
        <>
            <CurrentMapContext.Provider value={{currentMap, currentState, setCurrentState}}>
                {children}
            </CurrentMapContext.Provider>
        </>
    );
};

export const useCurrentMapContext = () => {
    const context = useContext(CurrentMapContext);
    if (!context) throw new Error("You need to use useCurrentMap in a component wrapped by CurrentMapProvider!");
    return context;
}


export enum CurrentMap {
    EUROPARLAMENT = 'europarlament',
    GMINY = 'gminy',
    POWIAT = 'powiaty',
    SEJM = 'sejm',
    SEJMIKI = 'sejmiki',
    SENAT = 'senat',
    WOJEWODZTWA = 'województwa',
    OKREGI = "okręgi"
}