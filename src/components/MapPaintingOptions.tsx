import React from "react";
import {MapOption, useMapOptions} from "./Contexts/MapPaintingOptionsContext.tsx";

const MapPaintingOptions: React.FC = () => {
    const {selectedOption, setSelectedOption} = useMapOptions();

    const handleOptionChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value as MapOption);
    };

    return (
        <>
            <div className="flex gap-x-6 py-1">
                <span className="tracking-tight subpixel-antialiased">Opcje rysowania mapy poparcia:</span>
                <div className="flex">
                    <input type="radio" name="hs-radio-group"
                           className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                           id="hs-radio-group-1" checked={selectedOption === 'poparcie-partii'}
                           onChange={handleOptionChange} value="poparcie-partii"/>
                    <label htmlFor="hs-radio-group-1"
                           className="text-sm text-gray-500 ms-2 dark:text-neutral-400">Poparcie partii</label>
                </div>

                <div className="flex">
                    <input type="radio" name="hs-radio-group"
                           className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                           id="hs-radio-group-2" checked={selectedOption === 'rzad-vs-opozycja'}
                           onChange={handleOptionChange} value="rzad-vs-opozycja"/>
                    <label htmlFor="hs-radio-group-2"
                           className="text-sm text-gray-500 ms-2 dark:text-neutral-400">Rząd vs Opozycja</label>
                </div>

                <div className="flex">
                    <input type="radio" name="hs-radio-group"
                           className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                           id="hs-radio-group-3" checked={selectedOption === 'konkretna-partia'}
                           onChange={handleOptionChange} value="konkretna-partia"/>
                    <label htmlFor="hs-radio-group-3"
                           className="text-sm text-gray-500 ms-2 dark:text-neutral-400">Konkretna partia</label>
                </div>
            </div>
        </>
    );
};
export default MapPaintingOptions;