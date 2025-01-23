import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import PartyResults from "../../interfaces/PartyResults.ts";


interface SelectedContextProps {
    partyResults: PartyResults | undefined;
    setPartyResults: (option: PartyResults) => void;
}

interface SelectedTerritoryProviderProps {
    children: ReactNode;
}

const SelectedTerritoryContext = createContext<SelectedContextProps | undefined>(undefined);

export const SelectedTerritoryProvider: React.FC<SelectedTerritoryProviderProps> = ({children}) => {
    const [partyResults, setPartyResults] = useState<PartyResults | undefined>(()=>{
        const savedOption = sessionStorage.getItem('selectedPartyResults');
        return savedOption ? (JSON.parse(savedOption) as PartyResults) : undefined;
    });

    useEffect(()=>{
        sessionStorage.setItem('selectedPartyResults', JSON.stringify(partyResults));
    },[partyResults])

    return (
        <>
            <SelectedTerritoryContext.Provider value={{partyResults, setPartyResults}}>
                {children}
            </SelectedTerritoryContext.Provider>
        </>
    );
};

export const useSelectedTerritoryContext = () => {
    const context = useContext(SelectedTerritoryContext);
    if(!context) throw new Error("Context musi zostać użyty w providerze!");
    return context;
}