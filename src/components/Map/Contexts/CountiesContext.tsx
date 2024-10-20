import React, {createContext, ReactNode, useEffect, useState} from "react";
import PartyResults from "../../../interfaces/PartyResults";


export const CountiesContext = createContext<PartyResults[] | null>(null);

interface CountiesProviderProps {
    children: ReactNode;
}

export const CountiesProvider: React.FC<CountiesProviderProps> = ({children}) => {
    const [countiesResults, setCountiesResults] = useState<PartyResults[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8081/api/counties");
                const result = await response.json();
                setCountiesResults(result);
            } catch (error) {
                console.error("Błąd podczas pobierania danych:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <CountiesContext.Provider value={countiesResults}>
            {children}
        </CountiesContext.Provider>
    );
};
