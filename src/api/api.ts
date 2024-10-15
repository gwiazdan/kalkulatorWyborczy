import axios from 'axios';

interface municipalityResults {
    municipalityID: number;
    name: string;
    numberOfVotes: number;
    votesForBS: number;
    votesForKO: number;
    votesForKONF: number;
    votesForLEW: number;
    votesForPIS: number;
    votesForTD: number;
    votesForMN: number;
}

interface countiesResults {
    countyID: number;
    name: string;
    numberOfVotes: number;
    votesForBS: number;
    votesForKO: number;
    votesForKONF: number;
    votesForLEW: number;
    votesForPIS: number;
    votesForTD: number;
    votesForMN: number;
}

interface voivodeshipsResults {
    voivodeshipID: number;
    name: string;
    numberOfVotes: number;
    votesForBS: number;
    votesForKO: number;
    votesForKONF: number;
    votesForLEW: number;
    votesForPIS: number;
    votesForTD: number;
    votesForMN: number;
}

type ElectionResultsProps = {
    municipalitiesResults: municipalityResults[];
    countiesResults: countiesResults[];
    voivodeshipsResults: voivodeshipsResults[];
};
export const fetchData = async () =>  {
    try {
        const response1 = await axios.get('http://localhost:8081/api/municipalities');
        const response2 = await axios.get("http://localhost:8081/api/counties");
        const response3 = await axios.get("http://localhost:8081/api/voivodeships")
        const results: ElectionResultsProps = {
            municipalitiesResults: response1.data,
            countiesResults: response2.data,
            voivodeshipsResults: response3.data,
        }
        return results;
    } catch (error) {
        console.error('Błąd pobierania danych: ', error);
        return null;
    }
}