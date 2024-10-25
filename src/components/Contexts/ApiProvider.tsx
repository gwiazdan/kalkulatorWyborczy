import React, {createContext, ReactNode, useEffect, useState} from 'react';
import {fetchAllData} from "../../services/db.ts";

export const ApiContext = createContext<boolean>(false);

interface ApiProviderProps {
    children: ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({children}) => {
    const [isApiAvailable, setIsApiAvailable] = useState<boolean>(false);
    const apiUrl = 'http:/localhost:8081/api';

    useEffect(() => {
        const checkApiAvailability = async () => {
            try {
                const response = await fetch(apiUrl, {method: 'HEAD'});
                if (response.ok) {
                    setIsApiAvailable(true);
                }
            } catch (error) {
                console.error('API is not available:', error);
            }
        };

        checkApiAvailability();
        fetchAllData();
    }, [isApiAvailable]);

    return (
        <ApiContext.Provider value={isApiAvailable}>
            {children}
        </ApiContext.Provider>
    );
};
