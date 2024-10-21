import React from "react";
import {PoliticalParty} from "../../PartiesEnum.ts";
import { useOptions } from "../Contexts/OptionsContext.tsx";

const SinglePartyOptions: React.FC = () => {
    const {isSinglePartyEnabled, setIsSinglePartyEnabled, selectedParty, setSelectedParty} = useOptions();


    const handleChange = () => {
        setIsSinglePartyEnabled(!isSinglePartyEnabled);
    }
    const handleSelectChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedParty(event.target.value as PoliticalParty);
    }

    return (
        <div className="flex py-3 items-center">
            <label className="inline-flex cursor-pointer w-full">
                <span
                    className="text-sm font-medium text-gray-200 dark:text-gray-300 mr-3">Wyświetl pojedynczą partię</span>
                <input type="checkbox" value="" className="sr-only peer" checked={isSinglePartyEnabled} onChange={handleChange} />
                <div
                    className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </label>
            <select  id="countries" disabled={!isSinglePartyEnabled}  value={selectedParty || 'default'} onChange={handleSelectChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected value="default">Wybierz partię</option>
                <option value="KO">Koalicja Obywatelska</option>
                <option value="PIS">Prawo i Sprawiedliwość</option>
                <option value="KONF">Konfederacja</option>
                <option value="TD">Trzecia Droga</option>
                <option value="LEW">Lewica</option>
                <option value="BS">Bezpartyjni Samorządowcy</option>
                <option value="MN">Mniejszość Niemiecka</option>
            </select>
        </div>
    );
}

export default SinglePartyOptions;

