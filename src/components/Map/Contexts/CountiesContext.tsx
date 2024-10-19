import React, {createContext, ReactNode, useEffect, useState} from "react";
import PartyResults from "../../../interfaces/PartyResults";

interface CountiesContextProps {
    data: PartyResults[] | null;
    setData: React.Dispatch<React.SetStateAction<PartyResults[] | null>>;
}

const defaultContextValue: CountiesContextProps = {
    data: null,
    setData: () => {
    }
};

export const CountiesContext = createContext<CountiesContextProps>(defaultContextValue);

interface CountiesProviderProps {
    children: ReactNode;
}

export const CountiesProvider: React.FC<CountiesProviderProps> = ({children}) => {
    const [data, setData] = useState<PartyResults[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8081/api/counties");
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Błąd podczas pobierania danych:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <CountiesContext.Provider value={{data, setData}}>
            {children}
        </CountiesContext.Provider>
    );
};
