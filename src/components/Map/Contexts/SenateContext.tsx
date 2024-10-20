import React, {createContext, ReactNode, useEffect, useState} from "react";
import SenateResults from "../../../interfaces/SenateResults";

export const SenateContext = createContext<SenateResults[] | null>(null);

interface SenateProviderProps {
    children: ReactNode;
}

export const SenateProvider: React.FC<SenateProviderProps> = ({children}) => {
    const [senateResults, setSenateResults] = useState<SenateResults[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8081/api/senate");
                const result = await response.json();
                setSenateResults(result);
            } catch (error) {
                console.error("Błąd podczas pobierania danych:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <SenateContext.Provider value={senateResults}>
            {children}
        </SenateContext.Provider>
    );
};
