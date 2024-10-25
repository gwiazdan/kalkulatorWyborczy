import React, {createContext, ReactNode, useEffect, useState} from "react";
import PartyResults from "../../../interfaces/PartyResults.ts";
import SenateResults from "../../../interfaces/SenateResults.ts";
import {
    getAllCountiesResults,
    getAllEuroResults,
    getAllMunicipalitiesResults,
    getAllSejmikResults,
    getAllSejmResults,
    getAllSenateResults,
    getAllVoivodeshipsResults
} from "../../../services/db.ts";


interface ResultsContextType {
    countiesResults: PartyResults[] | null;
    municipalitiesResults: PartyResults[] | null;
    senateResults: SenateResults[] | null;
    sejmResults: PartyResults[] | null;
    sejmikResults: PartyResults[] | null;
    euroResults: PartyResults[] | null;
    voivodeshipsResults: PartyResults[] | null;
    loading: boolean;
}

export const ResultsContext = createContext<ResultsContextType>({
    countiesResults: null,
    municipalitiesResults: null,
    senateResults: null,
    sejmResults: null,
    sejmikResults: null,
    euroResults: null,
    voivodeshipsResults: null,
    loading: true
});

interface SenateProviderProps {
    children: ReactNode;
}

export const ElectionResultsProvider: React.FC<SenateProviderProps> = ({children}) => {
    const [countiesResults, setCountiesResults] = useState<PartyResults[] | null>(null);
    const [municipalitiesResults, setMunicipalitiesResults] = useState<PartyResults[] | null>(null);
    const [senateResults, setSenateResults] = useState<SenateResults[] | null>(null);
    const [sejmResults, setSejmResults] = useState<PartyResults[] | null>(null);
    const [sejmikResults, setSejmikResults] = useState<PartyResults[] | null>(null);
    const [euroResults, setEuroResults] = useState<PartyResults[] | null>(null);
    const [voivodeshipsResults, setVoivodeshipsResults] = useState<PartyResults[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const municipalitiesResults = await getAllMunicipalitiesResults();
                setMunicipalitiesResults(municipalitiesResults);

                const countiesResults = await getAllCountiesResults();
                setCountiesResults(countiesResults);

                const voivodeshipsResults = await getAllVoivodeshipsResults();
                setVoivodeshipsResults(voivodeshipsResults);

                const senateResults = await getAllSenateResults();
                setSenateResults(senateResults);

                const sejmResults = await getAllSejmResults();
                setSejmResults(sejmResults);

                const sejmikResults = await getAllSejmikResults()
                setSejmikResults(sejmikResults);

                const euroResults = await getAllEuroResults()
                setEuroResults(euroResults);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return (
        <div>
            Ładowanie!
        </div>
    )

    return (
        <ResultsContext.Provider value={{
            countiesResults,
            municipalitiesResults,
            senateResults,
            voivodeshipsResults,
            loading,
            sejmResults,
            sejmikResults,
            euroResults
        }}>
            {children}
        </ResultsContext.Provider>
    )
};
