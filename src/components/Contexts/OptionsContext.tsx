import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { PoliticalParty } from "../../PartiesEnum";

interface OptionsContextType {
    mapOption: MapOption;
    setMapOption: (option: MapOption) => void;
    senateOption: SenateOption;
    setSenateOption: (option: SenateOption) => void;
    isSinglePartyEnabled: boolean;
    setIsSinglePartyEnabled: (option: boolean) => void;
    selectedParty: PoliticalParty | undefined;
    setSelectedParty: (option: PoliticalParty) => void;
}

const OptionsContext = createContext<OptionsContextType | undefined>(undefined);

interface OptionsProviderProps {
    children: ReactNode;
}

export const OptionsProvider: React.FC<OptionsProviderProps> = ({ children }) => {
    const [mapOption, setMapOption] = useState<MapOption>(() => {
        const savedOption = sessionStorage.getItem('selectedMapPaintingOption');
        return savedOption ? (savedOption as MapOption) : MapOption.PoparciePartii;
    });

    const [senateOption, setSenateOption] = useState<SenateOption>(() => {
        const savedOption = sessionStorage.getItem('selectedSenateOption') as SenateOption | null;
        return savedOption ? (savedOption as SenateOption) : SenateOption.TylkoPaktSenacki;
    });

    const [isSinglePartyEnabled, setIsSinglePartyEnabled] = useState<boolean>(() => {
       const savedOption = sessionStorage.getItem('singlepartyenabled') as boolean | null;
       return savedOption ? JSON.parse(String(savedOption)) : false;
    });

    const [selectedParty, setSelectedParty] = useState<PoliticalParty | undefined>(() => {
        const savedOption = sessionStorage.getItem('selectedParty') as PoliticalParty;
        return savedOption ? savedOption : undefined;
    });

    useEffect(() => {
        if(selectedParty){
            sessionStorage.setItem('selectedParty', selectedParty.toString());
        }
    }, [selectedParty]);

    useEffect(() => {
        sessionStorage.setItem('singlepartyenabled', isSinglePartyEnabled.toString());
    }, [isSinglePartyEnabled]);

    useEffect(() => {
        sessionStorage.setItem('selectedMapPaintingOption', mapOption);
    }, [mapOption]);

    useEffect(() => {
        sessionStorage.setItem('selectedSenateOption', senateOption.toString());
    }, [senateOption]);

    return (
        <OptionsContext.Provider value={{ mapOption, setMapOption, senateOption, setSenateOption, isSinglePartyEnabled, setIsSinglePartyEnabled, selectedParty, setSelectedParty }}>
            {children}
        </OptionsContext.Provider>
    );
};

export const useOptions = () => {
    const context = useContext(OptionsContext);

    if (!context) {
        throw new Error('useOptions must be used within an OptionsProvider');
    }

    return context;
};

export enum MapOption {
    PoparciePartii = 'poparcie-partii',
    RzadVsOpozycja = 'rzad-vs-opozycja',
}

export enum SenateOption {
    BezPaktow = 'bez-paktow',
    TylkoPaktSenacki = 'tylkoSenacki',
    TylkoPaktPrawicy = 'tylkoPaktPrawicy',
    ObaPakty = 'obaPakty'
}
