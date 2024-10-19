import React, {createContext, ReactNode, useEffect, useState} from "react";
import PartyResults from "../../../interfaces/PartyResults";

interface MunicipalitiesContextProps {
    data: PartyResults[] | null;
    setData: React.Dispatch<React.SetStateAction<PartyResults[] | null>>;
}

const defaultContextValue: MunicipalitiesContextProps = {
    data: null,
    setData: () => {
    }
};

export const MunicipalitiesContext = createContext<MunicipalitiesContextProps>(defaultContextValue);

interface MunicipalitiesProviderProps {
    children: ReactNode;
}

export const MunicipalitiesProvider: React.FC<MunicipalitiesProviderProps> = ({children}) => {
    const [data, setData] = useState<PartyResults[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8081/api/municipalities");
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Błąd podczas pobierania danych:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <MunicipalitiesContext.Provider value={{data, setData}}>
            {children}
        </MunicipalitiesContext.Provider>
    );
};
