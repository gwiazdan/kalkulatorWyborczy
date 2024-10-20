import React, {createContext, ReactNode, useEffect, useState} from "react";
import PartyResults from "../../../interfaces/PartyResults";


export const MunicipalitiesContext = createContext<PartyResults[] | null>(null);

interface MunicipalitiesProviderProps {
    children: ReactNode;
}

export const MunicipalitiesProvider: React.FC<MunicipalitiesProviderProps> = ({children}) => {
    const [municipalitiesResults, setMunicipalitiesResults] = useState<PartyResults[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8081/api/municipalities");
                const result = await response.json();
                setMunicipalitiesResults(result);
            } catch (error) {
                console.error("Błąd podczas pobierania danych:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <MunicipalitiesContext.Provider value={municipalitiesResults}>
            {children}
        </MunicipalitiesContext.Provider>
    );
};
