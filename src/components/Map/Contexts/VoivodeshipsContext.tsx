import React, {createContext, ReactNode, useEffect, useState} from "react";
import PartyResults from "../../../interfaces/PartyResults";

interface VoivodeshipsContextProps {
    data: PartyResults[] | null;
    setData: React.Dispatch<React.SetStateAction<PartyResults[] | null>>;
}

const defaultContextValue: VoivodeshipsContextProps = {
    data: null,
    setData: () => {
    }
};

export const VoivodeshipsContext = createContext<VoivodeshipsContextProps>(defaultContextValue);

interface VoivodeshipsProviderProps {
    children: ReactNode;
}

export const VoivodeshipsProvider: React.FC<VoivodeshipsProviderProps> = ({children}) => {
    const [data, setData] = useState<PartyResults[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8081/api/voivodeships");
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Błąd podczas pobierania danych:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <VoivodeshipsContext.Provider value={{data, setData}}>
            {children}
        </VoivodeshipsContext.Provider>
    );
};
