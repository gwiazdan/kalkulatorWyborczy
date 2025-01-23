import PartyResults from "../interfaces/PartyResults.ts";

interface Municipality {
    id: number;
    name: string;
    numberOfVotes: number;
    votesForKO: number;
    votesForPIS: number;
    votesForKONF: number;
    votesForTD: number;
    votesForLEW: number;
    votesForBS: number;
    countyID: number;
    votesForMN: number | null;
}

interface County {
    id: number;
    name: string;
    voivodeshipID: number;
    senateID: number | null;
    sejmID: number;
    sejmikID: number;
    europarlamentID: number;
}

interface Voivodeship {
    id: number;
    name: string;
}

interface WithVotes {
    numberOfVotes: number;
    votesForKO: number;
    votesForPIS: number;
    votesForKONF: number;
    votesForTD: number;
    votesForLEW: number;
    votesForBS: number;
    votesForMN: number;
}

interface CountyWithVotes extends County, WithVotes {}
interface VoivodeshipWithVotes extends Voivodeship, WithVotes {}

export const getMunicipalities = async (): Promise<PartyResults[]> => {
    return importedMunicipalities.map(municipality => {
        return {
            id: municipality.id,
            name: municipality.name,
            numberOfVotes: municipality.numberOfVotes,
            votesForKO: municipality.votesForKO,
            votesForLEW: municipality.votesForLEW,
            votesForTD: municipality.votesForTD,
            votesForKONF: municipality.votesForKONF,
            votesForPIS: municipality.votesForPIS,
            votesForBS: municipality.votesForBS,
            votesForMN: municipality.votesForMN ? municipality.votesForMN : 0,
            votesForGovernment: municipality.votesForKO + municipality.votesForLEW + municipality.votesForTD,
            votesForOpposition: municipality.numberOfVotes - municipality.votesForKO - municipality.votesForLEW - municipality.votesForTD
        };
    });
};

const importedMunicipalities: Municipality[] = (await import('./Municipalities.json')).default;



const counties = async():Promise<CountyWithVotes[]> => {
    const importedCounties: County[] = (await import('./Counties.json')).default;

    const countiesWithVotes: CountyWithVotes[] = importedCounties.map(county => ({
        ...county,
        numberOfVotes: 0,
        votesForKO: 0,
        votesForPIS: 0,
        votesForKONF: 0,
        votesForTD: 0,
        votesForLEW: 0,
        votesForBS: 0,
        votesForMN: 0,
    }));

    importedMunicipalities.forEach(municipality => {
        const county = countiesWithVotes.find(c => c.id === municipality.countyID);
        if (county) {
            county.votesForKO += municipality.votesForKO;
            county.votesForPIS += municipality.votesForPIS;
            county.votesForKONF += municipality.votesForKONF;
            county.votesForTD += municipality.votesForTD;
            county.votesForLEW += municipality.votesForLEW;
            county.votesForBS += municipality.votesForBS;
            county.votesForMN += municipality.votesForMN ? municipality.votesForMN : 0;
            county.numberOfVotes += municipality.numberOfVotes;
        }
    });
    return countiesWithVotes;
};

export const getCounties = async (): Promise<PartyResults[]> => {
    const countiesResult = await counties();
    return countiesResult.map(county => {
        return {
            id: county.id,
            name: county.name,
            numberOfVotes: county.numberOfVotes,
            votesForKO: county.votesForKO,
            votesForLEW: county.votesForLEW,
            votesForTD: county.votesForTD,
            votesForKONF: county.votesForKONF,
            votesForPIS: county.votesForPIS,
            votesForBS: county.votesForBS,
            votesForMN: county.votesForMN ? county.votesForMN : 0,
            votesForGovernment: county.votesForKO + county.votesForLEW + county.votesForTD,
            votesForOpposition: county.numberOfVotes - county.votesForKO - county.votesForLEW - county.votesForTD
        };
    });
}

export const getVoivodeships = async(): Promise<PartyResults[]> => {
    const importedVoivodeships: Voivodeship[] = (await import('./Voivodeships.json')).default;
    const importedCounties = await counties();

    const voivodeshipsWithVotes: VoivodeshipWithVotes[] = importedVoivodeships.map(voivodeship => ({
        ...voivodeship,
        numberOfVotes: 0,
        votesForKO: 0,
        votesForPIS: 0,
        votesForKONF: 0,
        votesForTD: 0,
        votesForLEW: 0,
        votesForBS: 0,
        votesForMN: 0,
    }));

    importedCounties.forEach(county => {
        const voivodeship = voivodeshipsWithVotes.find(v => v.id === county.voivodeshipID);
        if (voivodeship) {
            voivodeship.votesForKO += county.votesForKO;
            voivodeship.votesForPIS += county.votesForPIS;
            voivodeship.votesForKONF += county.votesForKONF;
            voivodeship.votesForTD += county.votesForTD;
            voivodeship.votesForLEW += county.votesForLEW;
            voivodeship.votesForBS += county.votesForBS;
            voivodeship.votesForMN += county.votesForMN ? county.votesForMN : 0;
            voivodeship.numberOfVotes += county.numberOfVotes;
        }
    });
    return voivodeshipsWithVotes.map(voivodeship => {
        return {
            id: voivodeship.id,
            name: voivodeship.name,
            numberOfVotes: voivodeship.numberOfVotes,
            votesForKO: voivodeship.votesForKO,
            votesForLEW: voivodeship.votesForLEW,
            votesForTD: voivodeship.votesForTD,
            votesForKONF: voivodeship.votesForKONF,
            votesForPIS: voivodeship.votesForPIS,
            votesForBS: voivodeship.votesForBS,
            votesForMN: voivodeship.votesForMN ? voivodeship.votesForMN : 0,
            votesForGovernment: voivodeship.votesForKO + voivodeship.votesForLEW + voivodeship.votesForTD,
            votesForOpposition: voivodeship.numberOfVotes - voivodeship.votesForKO - voivodeship.votesForLEW - voivodeship.votesForTD
        };
    });
};

const v = await getVoivodeships();
console.log(v);