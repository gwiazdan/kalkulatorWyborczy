import React, {createContext, ReactNode, useEffect, useState} from 'react';

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

        checkApiAvailability().then(()=> {
            if (!isApiAvailable) {
                console.error("Błąd! Nie można połączyć się z Api")
            }
        });
    }, []);

    return (
        <ApiContext.Provider value={isApiAvailable}>
            {children}
        </ApiContext.Provider>
    );
};
