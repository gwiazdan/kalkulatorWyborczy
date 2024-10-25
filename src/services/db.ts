import Dexie from 'dexie';
import PartyResults from "../interfaces/PartyResults";
import SenateResults from '../interfaces/SenateResults';

class ResultsDB extends Dexie {
    municipalitiesResults!: Dexie.Table<PartyResults, number>;
    countiesResults!: Dexie.Table<PartyResults, number>;
    voivodeshipsResults!: Dexie.Table<PartyResults, number>;
    senateResults!: Dexie.Table<SenateResults, number>;
    sejmResults!: Dexie.Table<PartyResults, number>;
    sejmikResults!: Dexie.Table<PartyResults, number>;
    euroResults!: Dexie.Table<PartyResults, number>;

    constructor() {
        super('ResultsDB');
        this.version(7).stores({
            municipalitiesResults: "id, name, numberOfVotes, votesForKO, votesForLEW, votesForTD, votesForKONF, votesForPIS, votesForBS, votesForMN, votesForGovernment, votesForOpposition",
            countiesResults: "id, name, numberOfVotes, votesForKO, votesForLEW, votesForTD, votesForKONF, votesForPIS, votesForBS, votesForMN, votesForGovernment, votesForOpposition",
            voivodeshipsResults: "id, name, numberOfVotes, votesForKO, votesForLEW, votesForTD, votesForKONF, votesForPIS, votesForBS, votesForMN, votesForGovernment, votesForOpposition",
            senateResults: "id, name, numberOfVotes, votesForKO, votesForPIS, votesForKONF, votesForTD, votesForLEW, votesForBS, votesForMN, votesForRigthWingPact, votesForSenatePact",
            sejmResults: "id, name, numberOfVotes, votesForKO, votesForLEW, votesForTD, votesForKONF, votesForPIS, votesForBS, votesForMN, votesForGovernment, votesForOpposition",
            sejmikResults: "id, name, numberOfVotes, votesForKO, votesForLEW, votesForTD, votesForKONF, votesForPIS, votesForBS, votesForMN, votesForGovernment, votesForOpposition",
            euroResults: "id, name, numberOfVotes, votesForKO, votesForLEW, votesForTD, votesForKONF, votesForPIS, votesForBS, votesForMN, votesForGovernment, votesForOpposition",
        });
    }
}

const db = new ResultsDB();

// Funkcja do pobierania danych z API
async function fetchDataFromAPI(url: string, tableName: keyof ResultsDB) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: PartyResults[] = await response.json();
        console.log(`Fetched data from ${url}:`, data);
        await db.table(tableName).bulkPut(data);
        console.log(`Data saved to ${tableName} successfully`);
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
    }
}

async function fetchSenateDataFromAPI(url: string, tableName: keyof ResultsDB) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: SenateResults[] = await response.json();
        console.log(`Fetched data from ${url}:`, data);
        await db.table(tableName).bulkPut(data);
        console.log(`Data saved to ${tableName} successfully`);
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
    }
}

// Funkcja do pobierania wszystkich danych
export async function fetchAllData() {
    await fetchDataFromAPI("http://localhost:8081/api/municipalities", "municipalitiesResults");
    await fetchDataFromAPI("http://localhost:8081/api/counties", "countiesResults");
    await fetchDataFromAPI("http://localhost:8081/api/voivodeships", "voivodeshipsResults");
    await fetchSenateDataFromAPI("http://localhost:8081/api/senate", "senateResults");
    await fetchDataFromAPI("http://localhost:8081/api/sejm", "sejmResults");
    await fetchDataFromAPI("http://localhost:8081/api/sejmik", "sejmikResults");
    await fetchDataFromAPI("http://localhost:8081/api/euro", "euroResults");

}

export async function getAllMunicipalitiesResults(): Promise<PartyResults[]> {
    try {
        const results = await db.municipalitiesResults.toArray();
        console.log('All municipalities results:', results);
        return results;
    } catch (error) {
        console.error('Error fetching municipalities results:', error);
        return [];
    }
}

export async function getAllCountiesResults(): Promise<PartyResults[]> {
    try {
        const results = await db.countiesResults.toArray();
        console.log('All counties results:', results);
        return results;
    } catch (error) {
        console.error('Error fetching counties results:', error);
        return [];
    }
}

export async function getAllVoivodeshipsResults(): Promise<PartyResults[]> {
    try {
        const results = await db.voivodeshipsResults.toArray();
        console.log('All voivodeships results:', results);
        return results;
    } catch (error) {
        console.error('Error fetching voivodeships results:', error);
        return [];
    }
}

export async function getAllSenateResults(): Promise<SenateResults[]> {
    try {
        const results = await db.senateResults.toArray();
        console.log('All senate results:', results);
        return results;
    } catch (error) {
        console.error('Error fetching senate results:', error);
        return [];
    }
}

export async function getAllSejmResults(): Promise<PartyResults[]> {
    try {
        const results = await db.sejmResults.toArray();
        console.log('All sejm results:', results);
        return results;
    } catch (error) {
        console.error('Error fetching sejm results:', error);
        return [];
    }
}

export async function getAllSejmikResults(): Promise<PartyResults[]> {
    try {
        const results = await db.sejmikResults.toArray();
        console.log('All sejmik results:', results);
        return results;
    } catch (error) {
        console.error('Error fetching sejmik results:', error);
        return [];
    }
}

export async function getAllEuroResults(): Promise<PartyResults[]> {
    try {
        const results = await db.euroResults.toArray();
        console.log('All euro results:', results);
        return results;
    } catch (error) {
        console.error('Error fetching euro results:', error);
        return [];
    }
}