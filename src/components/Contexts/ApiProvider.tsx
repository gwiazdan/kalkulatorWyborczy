import React, {createContext, ReactNode, useEffect, useState} from 'react';

export const ApiContext = createContext();

interface ApiProviderProps {
    children: ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({children}) => {
    const [isApiAvailable, setIsApiAvailable] = useState(false);
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
    }, []);

    return (
        <ApiContext.Provider value={{isApiAvailable}}>
            {children}
        </ApiContext.Provider>
    );
};
