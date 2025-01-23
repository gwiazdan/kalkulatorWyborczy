import Dexie from 'dexie';
import PartyResults from "../interfaces/PartyResults";
import SenateResults from '../interfaces/SenateResults';
import {getMunicipalities, getCounties, getVoivodeships, getSejmResults, getSenateResults, getEuroResults, getSejmikResults} from "./DatabaseManager.ts";

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
            senateResults: "id, name, numberOfVotes, votesForKO, votesForPIS, votesForKONF, votesForTD, votesForLEW, votesForBS, votesForMN, votesForRightWingPact, votesForSenatePact",
            sejmResults: "id, name, numberOfVotes, votesForKO, votesForLEW, votesForTD, votesForKONF, votesForPIS, votesForBS, votesForMN, votesForGovernment, votesForOpposition",
            sejmikResults: "id, name, numberOfVotes, votesForKO, votesForLEW, votesForTD, votesForKONF, votesForPIS, votesForBS, votesForMN, votesForGovernment, votesForOpposition",
            euroResults: "id, name, numberOfVotes, votesForKO, votesForLEW, votesForTD, votesForKONF, votesForPIS, votesForBS, votesForMN, votesForGovernment, votesForOpposition",
        });
    }
}

const db = new ResultsDB();

// Funkcja do pobierania danych z API
async function fetchDataFromAPI(func: Promise<PartyResults[]>, tableName: keyof ResultsDB) {
    const data: PartyResults[] = await func;
    await db.table(tableName).bulkPut(data);

}

async function fetchSenateDataFromAPI(func: Promise<SenateResults[]>, tableName: keyof ResultsDB) {
    const data: SenateResults[] = await func;
    await db.table(tableName).bulkPut(data);
}

// Funkcja do pobierania wszystkich danych
export async function fetchAllData() {
    await fetchDataFromAPI(getMunicipalities(), "municipalitiesResults");
    await fetchDataFromAPI(getCounties(), "countiesResults");
    await fetchDataFromAPI(getVoivodeships(), "voivodeshipsResults");
    await fetchSenateDataFromAPI(getSenateResults(), "senateResults");
    await fetchDataFromAPI(getSejmResults(), "sejmResults");
    await fetchDataFromAPI(getSejmikResults(), "sejmikResults");
    await fetchDataFromAPI(getEuroResults(), "euroResults");

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