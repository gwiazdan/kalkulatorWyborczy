import React, {useEffect, useState} from "react";

interface MapSwitchProps {
    onChange: (state: string) => void;
}

// Potrójny przełącznik
const MapSwitch: React.FC<MapSwitchProps> = ({onChange}) => {
    const [state, setState] = useState<string>(() => {
        const savedState = localStorage.getItem('mapSwitchState');
        return savedState ? savedState : 'option1';
    });

    useEffect(() => {
        localStorage.setItem('mapSwitchState', state);
    }, [state]);

    // Funkcja zmieniająca stan
    const handleSwitch = () => {
        let newState: string;
        switch (state) {
            case 'option1':
                newState = 'option2';
                break;
            case 'option2':
                newState = 'option3';
                break;
            case 'option3':
                newState = 'option1';
                break;
            default:
                newState = 'option1';
                break;
        }
        setState(newState);
        onChange(newState); // Informujemy o zmianie stanu
    };

    return (
        <div>
            <button onClick={handleSwitch}>
                Zmień stan
            </button>
        </div>
    );
};
export default MapSwitch;