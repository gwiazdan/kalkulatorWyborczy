import React, {useEffect, useState} from "react";

interface MapSwitchProps {
    onChange: (state: string) => void;
}

const MapSwitch: React.FC<MapSwitchProps> = ({onChange}) => {
    const [state, setState] = useState<string>(() => {
        const savedState = localStorage.getItem('mapSwitchState');
        return savedState ? savedState : 'option1';
    });

    useEffect(() => {
        localStorage.setItem('mapSwitchState', state);
        onChange(state);
    }, [state]);

    const handleChange = (value: string) => {
        setState(value);
    };
    return (
        <>
            <div className="flex flex-auto justify-evenly border rounded-md w-1/2">
                {['gminy', 'powiaty', 'wojewodztwa', 'okreg'].map((option) => (
                    <button
                        key={option}
                        className={`border-none px-2 py-1 rounded-md w-full ${state === option ? 'bg-cyan-900 text-white' : ''}`}
                        onClick={() => handleChange(option)}
                    >
                        <input
                            type="radio"
                            className="hidden"
                            checked={state === option}
                            readOnly
                        />
                        <label className="cursor-pointer">{option.charAt(0).toUpperCase() + option.slice(1)}</label>
                    </button>
                ))}
            </div>
        </>
    );
};
export default MapSwitch;