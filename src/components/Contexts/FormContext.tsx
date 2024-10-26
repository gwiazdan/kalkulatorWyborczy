import React, {createContext, ReactNode, useEffect, useState} from "react";
import PartyResults from "../../interfaces/PartyResults.ts";
import {ExtremePartyResults} from "../../ts/MaximumPartyValues.ts";
import SenateResults from "../../interfaces/SenateResults.ts";

export interface Results {
    votesForKO: number;
    votesForLEW: number;
    votesForTD: number;
    votesForKONF: number;
    votesForPIS: number;
    votesForBS: number;
    votesForOthers: number;
}

interface ElectionsContextType {
    results: Results;
    setResults: (option: Results | ((prevResults: Results) => Results)) => void;
    multiplyPartyResults: (option: PartyResults) => PartyResults;
    multiplyExtremePartyResults: (result: ExtremePartyResults, totalResults: PartyResults) => ExtremePartyResults;
    multiplySenateResults: (results: SenateResults) => SenateResults;
}

export const FormContext = createContext<ElectionsContextType | undefined>(undefined);


interface FormContextProps {
    children: ReactNode;
}


export const FormProvider: React.FC<FormContextProps> = ({children}) => {
    const initialResults: Results = {
        votesForKO: 37.06,
        votesForPIS: 36.16,
        votesForKONF: 12.08,
        votesForTD: 6.91,
        votesForLEW: 6.3,
        votesForBS: 0.93,
        votesForOthers: 100 - 37.06 - 36.16 - 12.08 - 6.91 - 6.3 - 0.93
    };

    const [results, setResults] = useState<Results>(() => {
        const storedResults = sessionStorage.getItem("results");
        return storedResults ? JSON.parse(storedResults) : initialResults;
    });

    useEffect(() => {
        sessionStorage.setItem("results", JSON.stringify(results));
    }, [results]);

    const multiplyPartyResults = (r: PartyResults) => {
        let votesForKO = Math.floor((r.votesForKO * results.votesForKO) / initialResults.votesForKO);
        let votesForLEW = Math.floor((r.votesForLEW * results.votesForLEW) / initialResults.votesForLEW);
        let votesForTD = Math.floor((r.votesForTD * results.votesForTD) / initialResults.votesForTD);
        let votesForKONF = Math.floor((r.votesForKONF * results.votesForKONF) / initialResults.votesForKONF);
        let votesForPIS = Math.floor((r.votesForPIS * results.votesForPIS) / initialResults.votesForPIS);
        let votesForBS = Math.floor((r.votesForBS * results.votesForBS) / initialResults.votesForBS);
        let votesForMN = r.votesForMN ? r.votesForMN : 0;
        const votesForOthers = Math.floor(((r.votesForOpposition - r.votesForPIS - r.votesForKONF - r.votesForBS - votesForMN) * results.votesForOthers) / initialResults.votesForOthers);


        const sum = votesForKONF + votesForLEW + votesForTD + votesForKO + votesForBS + votesForPIS + votesForOthers + votesForMN;

        if (sum > r.numberOfVotes) {
            const coefficient = r.numberOfVotes / sum;
            votesForKO *= coefficient;
            votesForLEW *= coefficient;
            votesForTD *= coefficient;
            votesForKONF *= coefficient;
            votesForPIS *= coefficient;
            votesForBS *= coefficient;
            votesForMN *= coefficient;
        }

        const votesForGovernment = votesForKO + votesForTD + votesForLEW;
        const votesForOpposition = r.numberOfVotes - votesForGovernment;

        return {
            id: r.id,
            name: r.name,
            numberOfVotes: r.numberOfVotes,
            votesForKO,
            votesForLEW,
            votesForTD,
            votesForKONF,
            votesForPIS,
            votesForBS,
            votesForMN,
            votesForGovernment,
            votesForOpposition
        };
    }

    const multiplySenateResults = (r: SenateResults) => {
        const votesForKO = Math.floor((r.votesForKO * results.votesForKO) / initialResults.votesForKO);
        const votesForLEW = Math.floor((r.votesForLEW * results.votesForLEW) / initialResults.votesForLEW);
        const votesForTD = Math.floor((r.votesForTD * results.votesForTD) / initialResults.votesForTD);
        const votesForKONF = Math.floor((r.votesForKONF * results.votesForKONF) / initialResults.votesForKONF);
        const votesForPIS = Math.floor((r.votesForPIS * results.votesForPIS) / initialResults.votesForPIS);
        const votesForBS = Math.floor((r.votesForBS * results.votesForBS) / initialResults.votesForBS);


        const votesForSenatePact = votesForKO + votesForTD + votesForLEW;
        const votesForRightWingPact = votesForKONF + votesForPIS;

        return {
            id: r.id,
            name: r.name,
            numberOfVotes: r.numberOfVotes,
            votesForKO,
            votesForLEW,
            votesForTD,
            votesForKONF,
            votesForPIS,
            votesForBS,
            votesForMN: r.votesForMN, // Zakładam, że chcesz zachować wartość r.votesForMN
            votesForSenatePact,
            votesForRightWingPact
        };
    }

    const multiplyExtremePartyResults = (e: ExtremePartyResults, p: PartyResults): ExtremePartyResults => {
        return {
            MaxKO: Math.floor(e.MaxKO * results.votesForKO / initialResults.votesForKO),
            MinKO: Math.floor(e.MinKO * results.votesForKO / initialResults.votesForKO),
            MaxPIS: Math.floor(e.MaxPIS * results.votesForPIS / initialResults.votesForPIS),
            MinPIS: Math.floor(e.MinPIS * results.votesForPIS / initialResults.votesForPIS),
            MaxKONF: Math.floor(e.MaxKONF * results.votesForKONF / initialResults.votesForKONF),
            MinKONF: Math.floor(e.MinKONF * results.votesForKONF / initialResults.votesForKONF),
            MaxTD: Math.floor(e.MaxTD * results.votesForTD / initialResults.votesForTD),
            MinTD: Math.floor(e.MinTD * results.votesForTD / initialResults.votesForTD),
            MaxLEW: Math.floor(e.MaxLEW * results.votesForLEW / initialResults.votesForLEW),
            MinLEW: Math.floor(e.MinLEW * results.votesForLEW / initialResults.votesForLEW),
            MaxBS: Math.floor(e.MaxBS * results.votesForBS / initialResults.votesForBS),
            MinBS: Math.floor(e.MinBS * results.votesForBS / initialResults.votesForBS),
            MaxMN: e.MaxMN,
            MinMN: e.MinMN,
            MaxSP: Math.floor(e.MaxSP * (results.votesForKO + results.votesForLEW + results.votesForTD) / (initialResults.votesForLEW + initialResults.votesForTD + initialResults.votesForKO)),
            MinSP: Math.floor(e.MinSP * (results.votesForKO + results.votesForLEW + results.votesForTD) / (initialResults.votesForLEW + initialResults.votesForTD + initialResults.votesForKO)),
            MaxRWP: Math.floor(e.MaxRWP * (p.numberOfVotes - results.votesForKO - results.votesForLEW - results.votesForTD) / (p.numberOfVotes - initialResults.votesForLEW - initialResults.votesForTD - initialResults.votesForKO)),
            MinRWP: Math.floor(e.MinRWP * (p.numberOfVotes - results.votesForKO - results.votesForLEW - results.votesForTD) / (p.numberOfVotes - initialResults.votesForLEW - initialResults.votesForTD - initialResults.votesForKO))
        };
    };


    return (
        <>
            <FormContext.Provider
                value={{results, setResults, multiplyPartyResults, multiplyExtremePartyResults, multiplySenateResults}}>
                {children}
            </FormContext.Provider>
        </>
    );
};