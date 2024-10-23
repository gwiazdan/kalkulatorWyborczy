import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";

interface ElectionsContextType {
    electionsOption: ElectionsOption;
    setElectionsOption: (option: ElectionsOption) => void;
}

const ElectionsContext = createContext<ElectionsContextType | undefined>(undefined);

interface ElectionsProviderProps {
    children: ReactNode;
}

export const ElectionsProvider: React.FC<ElectionsProviderProps> = ({children}) => {
    const [electionsOption, setElectionsOption] = useState<ElectionsOption>(() => {
        const savedOption: ElectionsOption | null = sessionStorage.getItem('electionsOption') as ElectionsOption;
        return savedOption ? savedOption : ElectionsOption.Sejm;
    });

    useEffect(() => {
        sessionStorage.setItem('electionsOption', electionsOption);
    }, [electionsOption]);

    return (
        <ElectionsContext.Provider value={{electionsOption, setElectionsOption}}>
            {children}
        </ElectionsContext.Provider>
    );
};

export const useElectionsContext = () => {
    const context = useContext(ElectionsContext);

    if (!context) {
        throw new Error('useElectionsContext must be used within an ElectionsProvider');
    }

    return context;
};

export enum ElectionsOption {
    Sejm = 'sejm',
    Senat = 'senat',
    Sejmik = 'sejmik',
    Europarlament = 'europarlament'
}