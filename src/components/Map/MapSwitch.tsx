import React from "react";
import {CurrentMap, useCurrentMapContext} from "./Contexts/CurrentMapContext.tsx";

const MapSwitch: React.FC = () => {
    const {currentState, setCurrentState} = useCurrentMapContext();

    const handleChange = (value: string) => {
        setCurrentState(value as CurrentMap);
    };
    return (
        <>
            <div className="flex flex-auto justify-evenly border rounded-md w-1/2">
                {['gminy', 'powiaty', 'województwa', 'okręgi'].map((option) => (
                    <button
                        key={option}
                        className={`border-none px-2 py-1 rounded-md w-full ${currentState === option ? 'bg-cyan-900 text-white' : ''}`}
                        onClick={() => handleChange(option)}
                    >
                        <input
                            type="radio"
                            className="hidden"
                            checked={currentState === option}
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