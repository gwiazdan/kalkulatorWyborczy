import React from "react";

interface PartyFormProps {
    name: string;
    popularity: number;
    onPopularityChange: (newPopularity: number) => void;
}

export const PartyForm: React.FC<PartyFormProps> = ({name, popularity, onPopularityChange}) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(event.target.value);
        onPopularityChange(newValue);
    };


    return (
        <>
            <div className="flex items-center my-2 w-2/3">

                <label className="font-medium px-2 pb-2 w-1/2">{name}</label>
                <div className="relative flex flex-1 items-center">
                    <input type="number"
                           className="relative px-3 py-3 bg-transparent placeholder:text-slate-500 rounded transition duration-300 ease border border-slate-400 w-full pr-10"
                           placeholder="0.00" onChange={handleChange} value={popularity} min="0" max="100"/>
                    <span
                        className="absolute right-0 flex items-center px-3 text-blueGray-300 bg-transparent rounded text-base">%</span>
                </div>
            </div>
        </>
    );
};
