import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";

const SenateOptionsContext = createContext<SenateOptionContextType | undefined>(undefined);

interface MapOptionsProvider {
    children: ReactNode;
}

export const SenateOptionsProvider:React.FC<MapOptionsProvider> = ({children}) => {
    const [selectedOption, setSelectedOption] = useState<SenateOption>(() => {
        const savedOption = sessionStorage.getItem('selectedSenateOption') as SenateOption | null;
        return savedOption ? (savedOption as SenateOption) : SenateOption.TylkoPaktSenacki;
    });

    useEffect(() => {
        sessionStorage.setItem('selectedSenateOption', selectedOption.toString());
        console.log(selectedOption);
    }, [selectedOption]);

    return (
        <SenateOptionsContext.Provider value={{ selectedOption, setSelectedOption }}>
            {children}
        </SenateOptionsContext.Provider>
    );
};

export const useSenateOption = () => {
    const context = useContext(SenateOptionsContext);

    if (!context) {
        throw new Error('useSenateOption must be used within a SenateOptionsProvider');
    }

    return context; // Upewnij się, że context ma odpowiednią strukturę
};

interface SenateOptionContextType {
    selectedOption: SenateOption;
    setSelectedOption: (option: SenateOption) => void;
}
export enum SenateOption {
    BezPaktow = 'bez-paktow',
    TylkoPaktSenacki = 'tylkoSenacki',
    TylkoPaktPrawicy = 'tylkoPaktPrawicy',
    ObaPakty = 'obaPakty'
}
