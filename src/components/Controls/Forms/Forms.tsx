import React, {useContext} from "react";
import {PartyForm} from "./PartyForm";
import {FormContext, Results} from "../../Contexts/FormContext";


export const Forms: React.FC = () => {
    const context = useContext(FormContext);

    if (!context) {
        throw new Error("Forms must be used within a FormProvider");
    }
    const {results, setResults} = context;

    const handlePopularityChange = (party: keyof Results, newPopularity: number) => {
        setResults((prevResults: Results) => {
            const newResults = {
                ...prevResults,
                [party]: newPopularity,
            };
            const sumExcludingOthers = Object.entries(newResults)
                .filter(([key]) => key !== "votesForOthers")
                .reduce((sum, [_, value]) => sum + value, 0);

            if (sumExcludingOthers > 100) {
                console.warn("Suma głosów przekracza 100%");
                return prevResults;
            };

            const votesForOthers = 100 - sumExcludingOthers;
            newResults.votesForOthers = votesForOthers;
            return newResults;
        });
    };



    return (
        <>
            <div className="flex flex-col items-center my-2">
                <PartyForm name={"Koalicja Obywatelska"} popularity={results.votesForKO}
                           onPopularityChange={(newPopularity) => handlePopularityChange("votesForKO", newPopularity)}/>
                <PartyForm name={"Prawo i Sprawiedliwość"} popularity={results.votesForPIS}
                           onPopularityChange={(newPopularity) => handlePopularityChange("votesForPIS", newPopularity)}/>
                <PartyForm name={"Konfederacja"} popularity={results.votesForKONF}
                           onPopularityChange={(newPopularity) => handlePopularityChange("votesForKONF", newPopularity)}/>
                <PartyForm name={"Trzecia Droga"} popularity={results.votesForTD}
                           onPopularityChange={(newPopularity) => handlePopularityChange("votesForTD", newPopularity)}/>
                <PartyForm name={"Lewica"} popularity={results.votesForLEW}
                           onPopularityChange={(newPopularity) => handlePopularityChange("votesForLEW", newPopularity)}/>
                <PartyForm name={"Bezpartyjni Samorządowcy"} popularity={results.votesForBS}
                           onPopularityChange={(newPopularity) => handlePopularityChange("votesForBS", newPopularity)}/>
            </div>
        </>
    );
};