import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
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
import {FormContext} from "../../Contexts/FormContext.tsx";


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

interface initialResults {
    counties: PartyResults[];
    municipalities: PartyResults[];
    voivodeships: PartyResults[];
    sejm: PartyResults[];
    sejmik: PartyResults[];
    senate: SenateResults[];
    euro: PartyResults[];
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
    const [initialResults, setInitialResults] = useState<initialResults | null>(null);
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("Forms must be used within a FormProvider");
    }
    const {results, multiplyPartyResults, multiplySenateResults} = context;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const municipalitiesResults = await getAllMunicipalitiesResults();
                const countiesResults = await getAllCountiesResults();
                const voivodeshipsResults = await getAllVoivodeshipsResults();
                const senateResults = await getAllSenateResults();
                const sejmResults = await getAllSejmResults();
                const sejmikResults = await getAllSejmikResults()
                const euroResults = await getAllEuroResults()

                setInitialResults({
                    municipalities: municipalitiesResults,
                    counties: countiesResults,
                    voivodeships: voivodeshipsResults,
                    senate: senateResults,
                    sejm: sejmResults,
                    sejmik: sejmikResults,
                    euro: euroResults
                });

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        if (initialResults) {
            const municipalitiesResults: PartyResults[] = [];
            initialResults.municipalities.forEach((result) => {
                municipalitiesResults.push(multiplyPartyResults(result));
            })
            setMunicipalitiesResults(municipalitiesResults);

            const countiesResults: PartyResults[] = [];
            initialResults.counties.forEach((result) => {
                countiesResults.push(multiplyPartyResults(result));
            })
            setCountiesResults(countiesResults);
            const voivodeshipResults: PartyResults[] = [];
            initialResults.voivodeships.forEach((result) => {
                voivodeshipResults.push(multiplyPartyResults(result));
            })
            setVoivodeshipsResults(voivodeshipResults);
            const sejmResults: PartyResults[] = [];
            initialResults.sejm.forEach((result) => {
                sejmResults.push(multiplyPartyResults(result));
            })
            setSejmResults(sejmResults);
            const sejmikResults: PartyResults[] = [];
            initialResults.sejmik.forEach((result) => {
                sejmikResults.push(multiplyPartyResults(result));
            })
            setSejmikResults(sejmikResults);
            const senateResults: SenateResults[] = [];
            initialResults.senate.forEach((result) => {
                senateResults.push(multiplySenateResults(result));
            })
            setSenateResults(senateResults);
            const euroResults: PartyResults[] = [];
            initialResults.euro.forEach((result) => {
                euroResults.push(multiplyPartyResults(result));
            })
            setEuroResults(euroResults);
        }
    }, [results, initialResults]);

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
