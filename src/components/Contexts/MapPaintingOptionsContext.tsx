import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";

const MapPaintingOptionsContext = createContext<MapOptionContextType | undefined>(undefined);

interface MapOptionsProvider {
    children: ReactNode;
}

export const MapOptionsProvider:React.FC<MapOptionsProvider> = ({children}) => {
    const [selectedOption, setSelectedOption] = useState<MapOption>(() => {
        const savedOption = sessionStorage.getItem('selectedMapPaintingOption');
        return savedOption ? (savedOption as MapOption): MapOption.PoparciePartii
    });

    useEffect(() => {
        sessionStorage.setItem('selectedMapOption', selectedOption);
    }, [selectedOption]);

    return (
        <MapPaintingOptionsContext.Provider value={{ selectedOption, setSelectedOption }}>
            {children}
        </MapPaintingOptionsContext.Provider>
    );
};

export const useMapOptions = () => {
    const context = useContext(MapPaintingOptionsContext);

    if (!context) {
        throw new Error('useMapOptions must be used within a MapPaintingOptionsProvider');
    }

    return context; // Upewnij się, że context ma odpowiednią strukturę
};

interface MapOptionContextType {
    selectedOption: MapOption;
    setSelectedOption: (option: MapOption) => void;
}

export enum MapOption {
    PoparciePartii = 'poparcie-partii',
    RzadVsOpozycja = 'rzad-vs-opozycja',
    KonkretnaPartia = 'konkretna-partia'
}
