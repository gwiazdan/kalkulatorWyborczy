import React from "react";
import {SenateOption, useSenateOption} from "./Contexts/SenateOptionsContext.tsx";

const SenateOptions: React.FC = () => {
    const {selectedOption, setSelectedOption} = useSenateOption();

    const handleOptionChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value as SenateOption);
    };

    return (
        <>
            <div className="flex gap-x-6 py-1">
                <span className="tracking-tight subpixel-antialiased">Opcje wyborów senackich:</span>
                <div className="flex">
                    <input type="radio" name="senate-options-group"
                           className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                           id="senate-options-group-1" checked={selectedOption === 'tylkoSenacki'}
                           onChange={handleOptionChange} value='tylkoSenacki'/>
                    <label htmlFor="senate-options-group-1"
                           className="text-sm text-gray-500 ms-2 dark:text-neutral-400">Tylko Pakt Senacki</label>
                </div>

                <div className="flex">
                    <input type="radio" name="senate-options-group"
                           className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                           id="senate-options-group-2" checked={selectedOption === 'bez-paktow'}
                           onChange={handleOptionChange} value='bez-paktow'/>
                    <label htmlFor="senate-options-group-2"
                           className="text-sm text-gray-500 ms-2 dark:text-neutral-400">Bez paktów</label>
                </div>

                <div className="flex">
                    <input type="radio" name="senate-options-group"
                           className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                           id="senate-options-group-3" checked={selectedOption === 'tylkoPaktPrawicy'}
                           onChange={handleOptionChange} value='tylkoPaktPrawicy'/>
                    <label htmlFor="senate-options-group-3"
                           className="text-sm text-gray-500 ms-2 dark:text-neutral-400">Tylko Pakt Prawicy</label>
                </div>
                <div className="flex">
                    <input type="radio" name="senate-options-group"
                           className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                           id="senate-options-group-3" checked={selectedOption === 'obaPakty'}
                           onChange={handleOptionChange} value="obaPakty"/>
                    <label htmlFor="senate-options-group-3"
                           className="text-sm text-gray-500 ms-2 dark:text-neutral-400">Oba pakty</label>
                </div>
            </div>
        </>
    );
};
export default SenateOptions;