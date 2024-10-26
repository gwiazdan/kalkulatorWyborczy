import React from "react";
import {ElectionsOption, useElectionsContext} from "../Contexts/ElectionsContext.tsx";

export const ElectionsSwitch: React.FC = () => {
    const {electionsOption, setElectionsOption} = useElectionsContext();

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setElectionsOption(event.target.value as ElectionsOption);
    };

    return (
        <>
            <div className="p-8 flex flex-row items-center">
                <div className="flex w-full relative">
                    <input type="radio" id="option0" name="tabs" className="appearance-none"
                           checked={electionsOption === ElectionsOption.Sejm} onChange={handleOptionChange}
                           value={ElectionsOption.Sejm}/>
                    <label htmlFor="option0"
                           className="cursor-pointer w-1/4 flex items-center justify-center truncate uppercase select-none font-semibold text-lg rounded-full py-2">Sejm</label>

                    <input type="radio" id="option1" name="tabs" className="appearance-none"
                           checked={electionsOption === ElectionsOption.Senat} onChange={handleOptionChange}
                           value={ElectionsOption.Senat}/>
                    <label htmlFor="option1"
                           className="cursor-pointer w-1/4 flex items-center justify-center truncate uppercase select-none font-semibold text-lg rounded-full py-2">Senat</label>

                    <input type="radio" id="option2" name="tabs" className="appearance-none"
                           checked={electionsOption === ElectionsOption.Sejmiki} onChange={handleOptionChange}
                           value={ElectionsOption.Sejmiki}/>
                    <label htmlFor="option2"
                           className="cursor-pointer w-1/4 flex items-center justify-center truncate uppercase select-none font-semibold text-lg rounded-full py-2">Sejmik</label>

                    <input type="radio" id="option3" name="tabs" className="appearance-none"
                           checked={electionsOption === ElectionsOption.Europarlament} onChange={handleOptionChange}
                           value={ElectionsOption.Europarlament}/>
                    <label htmlFor="option3"
                           className="cursor-pointer w-1/4 flex items-center justify-center truncate uppercase select-none font-semibold text-lg rounded-full py-2">Europarlament</label>
                    <div
                        className="w-1/4 flex items-center justify-center truncate uppercase select-none font-semibold text-lg rounded-full p-0 h-full bg-sky-900 absolute transform transition-transform tabAnim"></div>
                </div>
            </div>
        </>
    );
};