import React from "react";
import {MapOption, useOptions} from "../../Contexts/OptionsContext.tsx";

const MapPaintingOptions: React.FC = () => {
    const {mapOption, setMapOption} = useOptions();

    const handleOptionChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setMapOption(event.target.value as MapOption);
    };

    return (
        <>
            <div className="flex gap-x-16 py-1">
                <span className="tracking-tight subpixel-antialiased">Opcje rysowania mapy poparcia:</span>
                <div className="flex">
                    <input type="radio" name="map-options-group"
                           className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                           id="map-options-group-1" checked={mapOption === 'poparcie-partii'}
                           onChange={handleOptionChange} value="poparcie-partii"/>
                    <label htmlFor="map-options-group-1"
                           className="text-sm text-gray-500 ms-2 dark:text-neutral-400">Poparcie partii</label>
                </div>

                <div className="flex">
                    <input type="radio" name="map-options-group"
                           className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                           id="map-options-group-2" checked={mapOption === 'rzad-vs-opozycja'}
                           onChange={handleOptionChange} value="rzad-vs-opozycja"/>
                    <label htmlFor="map-options-group-2"
                           className="text-sm text-gray-500 ms-2 dark:text-neutral-400">Rząd vs Opozycja</label>
                </div>
            </div>
        </>
    );
};
export default MapPaintingOptions;