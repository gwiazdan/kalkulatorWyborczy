import React, {createContext, ReactNode} from 'react';

export const ApiContext = createContext<boolean>(false);

interface ApiProviderProps {
    children: ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({children}) => {

    return (
        <ApiContext.Provider value={isApiAvailable}>
            {children}
        </ApiContext.Provider>
    );
};
