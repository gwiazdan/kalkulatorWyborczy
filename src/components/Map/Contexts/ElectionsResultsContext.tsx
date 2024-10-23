import React, {createContext, ReactNode, useState} from "react";
import PartyResults from "../../../interfaces/PartyResults";
import SenateResults from "../../../interfaces/SenateResults";

interface ElectionResults {
    countiesResults: PartyResults[] | null;
    municipalitiesResults: PartyResults[] | null;
    senateResults: SenateResults[] | null;
    voivodeshipsResults: PartyResults[] | null;
    loading: boolean;
    fetchCounties: () => Promise<void>;
    fetchMunicipalities: () => Promise<void>;
    fetchSenate: () => Promise<void>;
    fetchVoivodeships: () => Promise<void>;
}

export const ElectionResultsContext = createContext<ElectionResults | undefined>(undefined);

interface ElectionResultsProviderProps {
    children: ReactNode;
}

export const ElectionResultsProvider: React.FC<ElectionResultsProviderProps> = ({children}) => {
    const [countiesResults, setCountiesResults] = useState<PartyResults[] | null>(null);
    const [municipalitiesResults, setMunicipalitiesResults] = useState<PartyResults[] | null>(null);
    const [senateResults, setSenateResults] = useState<SenateResults[] | null>(null);
    const [voivodeshipsResults, setVoivodeshipsResults] = useState<PartyResults[] | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchCounties = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8081/api/counties");
            const result = await response.json();
            setCountiesResults(result);
        } catch (error) {
            console.error("Błąd podczas pobierania danych:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMunicipalities = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8081/api/municipalities");
            const result = await response.json();
            setMunicipalitiesResults(result);
        } catch (error) {
            console.error("Błąd podczas pobierania danych:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSenate = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8081/api/senate");
            const result = await response.json();
            setSenateResults(result);
        } catch (error) {
            console.error("Błąd podczas pobierania danych:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchVoivodeships = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8081/api/voivodeships");
            const result = await response.json();
            setVoivodeshipsResults(result);
        } catch (error) {
            console.error("Błąd podczas pobierania danych:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ElectionResultsContext.Provider value={{
            countiesResults,
            municipalitiesResults,
            senateResults,
            voivodeshipsResults,
            loading,
            fetchCounties,
            fetchMunicipalities,
            fetchSenate,
            fetchVoivodeships,
        }}>
            {children}
        </ElectionResultsContext.Provider>
    );
};

export const useElectionResultsContext = () => {
    const context = React.useContext(ElectionResultsContext);
    if (!context) {
        throw new Error("useElectionResultsContext must be used within an ElectionResultsProvider");
    }
    return context;
};
