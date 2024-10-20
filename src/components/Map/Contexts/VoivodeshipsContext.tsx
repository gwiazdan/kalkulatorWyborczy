import React, {createContext, ReactNode, useEffect, useState} from "react";
import PartyResults from "../../../interfaces/PartyResults";

export const VoivodeshipsContext = createContext<PartyResults[] | null>(null);

interface VoivodeshipsProviderProps {
    children: ReactNode;
}

export const VoivodeshipsProvider: React.FC<VoivodeshipsProviderProps> = ({children}) => {
    const [voivodeshipsResults, setVoivodeshipsResults] = useState<PartyResults[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8081/api/voivodeships");
                const result = await response.json();
                setVoivodeshipsResults(result);
            } catch (error) {
                console.error("Błąd podczas pobierania danych:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <VoivodeshipsContext.Provider value={voivodeshipsResults}>
            {children}
        </VoivodeshipsContext.Provider>
    );
};
