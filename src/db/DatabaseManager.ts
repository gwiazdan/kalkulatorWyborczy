import PartyResults from "../interfaces/PartyResults.ts";
import SenateResults from "../interfaces/SenateResults.ts";

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

interface Territory {
    id: number;
    name: string;
    senateID: number | null;
    sejmID: number | null;
    sejmikID: number | null;
    europarlamentID: number | null;
    numberOfVotes: number;
    votesForKO: number;
    votesForPIS: number;
    votesForKONF: number;
    votesForTD: number;
    votesForLEW: number;
    votesForBS: number;
}

interface Voivodeship {
    id: number;
    name: string;
}

interface Sejmik {
    id: number;
    name: string;
    voivodeshipID: number;
    number: number;
    seats: number;
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

interface Sejm {
    id: number;
    name: string;
    seats: number;
}

interface CountyWithVotes extends County, WithVotes {}
interface VoivodeshipWithVotes extends Voivodeship, WithVotes {}
interface SejmWithVotes extends Sejm, WithVotes {}
interface SejmikWithVotes extends Sejmik, WithVotes {}

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

let importedMunicipalities: Municipality[] = [];
fetch('../public/Municipalities.json')
    .then(res => res.json())
    .then(data => importedMunicipalities = data);



const counties = async():Promise<CountyWithVotes[]> => {
    let importedCounties: County[] = [];
    fetch('../public/Counties.json')
        .then(res => res.json())
        .then(data => importedCounties = data);

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
    let importedVoivodeships: Voivodeship[] = [];
    fetch('../public/Voivodeships.json')
        .then(res => res.json())
        .then(data => importedVoivodeships = data);
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

let importedTerritory: Territory[] = [];
    fetch('../public/Territories.json')
    .then(res => res.json())
    .then(data => importedTerritory = data);


export const getSejmResults = async (): Promise<PartyResults[]> => {
    let importedSejm: Sejm[] = [];
    fetch('../public/Sejm.json')
        .then(res => res.json())
        .then(data => importedSejm = data);
    const sejmWithVotes: SejmWithVotes[] = importedSejm.map(sejm => ({
        ...sejm,
        numberOfVotes: 0,
        votesForKO: 0,
        votesForPIS: 0,
        votesForKONF: 0,
        votesForTD: 0,
        votesForLEW: 0,
        votesForBS: 0,
        votesForMN: 0,
    }));

    importedTerritory.forEach(territory => {
        const constituency = sejmWithVotes.find(s => s.id === territory.sejmID);
        if(constituency){
            constituency.votesForKO += territory.votesForKO;
            constituency.votesForPIS += territory.votesForPIS;
            constituency.votesForKONF += territory.votesForKONF;
            constituency.votesForTD += territory.votesForTD;
            constituency.votesForLEW += territory.votesForLEW;
            constituency.votesForBS += territory.votesForBS;
            constituency.numberOfVotes += territory.numberOfVotes;
        }
    })
    const countiesResults = await counties();
    countiesResults.forEach(county=> {
        const constituency = sejmWithVotes.find(s => s.id === county.sejmID);
        if(constituency){
            constituency.numberOfVotes += county.numberOfVotes;
            constituency.votesForKO += county.votesForKO;
            constituency.votesForPIS += county.votesForPIS;
            constituency.votesForKONF += county.votesForKONF;
            constituency.votesForTD += county.votesForTD;
            constituency.votesForLEW += county.votesForLEW;
            constituency.votesForBS += county.votesForBS;
            constituency.votesForMN += county.votesForMN ? county.votesForMN : 0;
        }
    })

    return sejmWithVotes.map(sejm => {
        return {
            id: sejm.id,
            name: sejm.name,
            numberOfVotes: sejm.numberOfVotes,
            votesForKO: sejm.votesForKO,
            votesForLEW: sejm.votesForLEW,
            votesForTD: sejm.votesForTD,
            votesForKONF: sejm.votesForKONF,
            votesForPIS: sejm.votesForPIS,
            votesForBS: sejm.votesForBS,
            votesForMN: sejm.votesForMN ? sejm.votesForMN : 0,
            votesForGovernment: sejm.votesForKO + sejm.votesForLEW + sejm.votesForTD,
            votesForOpposition: sejm.numberOfVotes - sejm.votesForKO - sejm.votesForLEW - sejm.votesForTD
        };
    });
}

export const getSenateResults = async (): Promise<SenateResults[]> => {
    let importedSenate: Voivodeship[] = [];
    fetch('../public/Senate.json')
        .then(res => res.json())
        .then(data => importedSenate = data);
    const senateWithVotes: VoivodeshipWithVotes[] = importedSenate.map(senate => ({
        ...senate,
        numberOfVotes: 0,
        votesForKO: 0,
        votesForPIS: 0,
        votesForKONF: 0,
        votesForTD: 0,
        votesForLEW: 0,
        votesForBS: 0,
        votesForMN: 0,
    }));

    importedTerritory.forEach(territory => {
        const constituency = senateWithVotes.find(s => s.id === territory.senateID);
        if(constituency){
            constituency.votesForKO += territory.votesForKO;
            constituency.votesForPIS += territory.votesForPIS;
            constituency.votesForKONF += territory.votesForKONF;
            constituency.votesForTD += territory.votesForTD;
            constituency.votesForLEW += territory.votesForLEW;
            constituency.votesForBS += territory.votesForBS;
            constituency.numberOfVotes += territory.numberOfVotes;
        }
    })
    const countiesResults = await counties();
    countiesResults.forEach(county=> {
        const constituency = senateWithVotes.find(s => s.id === county.senateID);
        if(constituency){
            constituency.numberOfVotes += county.numberOfVotes;
            constituency.votesForKO += county.votesForKO;
            constituency.votesForPIS += county.votesForPIS;
            constituency.votesForKONF += county.votesForKONF;
            constituency.votesForTD += county.votesForTD;
            constituency.votesForLEW += county.votesForLEW;
            constituency.votesForBS += county.votesForBS;
            constituency.votesForMN += county.votesForMN ? county.votesForMN : 0;
        }
    })

    return senateWithVotes.map(senate => {
        return {
            id: senate.id,
            name: senate.name,
            numberOfVotes: senate.numberOfVotes,
            votesForKO: senate.votesForKO,
            votesForLEW: senate.votesForLEW,
            votesForTD: senate.votesForTD,
            votesForKONF: senate.votesForKONF,
            votesForPIS: senate.votesForPIS,
            votesForBS: senate.votesForBS,
            votesForMN: senate.votesForMN ? senate.votesForMN : 0,
            votesForSenatePact: senate.votesForKO + senate.votesForTD + senate.votesForLEW,
            votesForRightWingPact: senate.votesForKONF + senate.votesForPIS
        };
    });
}

export const getEuroResults = async (): Promise<PartyResults[]> => {
    let importedEuro: Voivodeship[] = [];
    fetch('../public/European_Parliament.json')
        .then(res => res.json())
        .then(data => importedEuro = data);
    const euroWithVotes: VoivodeshipWithVotes[] = importedEuro.map(euro => ({
        ...euro,
        numberOfVotes: 0,
        votesForKO: 0,
        votesForPIS: 0,
        votesForKONF: 0,
        votesForTD: 0,
        votesForLEW: 0,
        votesForBS: 0,
        votesForMN: 0,
    }));

    importedTerritory.forEach(territory => {
        const constituency = euroWithVotes.find(s => s.id === territory.europarlamentID);
        if(constituency){
            constituency.votesForKO += territory.votesForKO;
            constituency.votesForPIS += territory.votesForPIS;
            constituency.votesForKONF += territory.votesForKONF;
            constituency.votesForTD += territory.votesForTD;
            constituency.votesForLEW += territory.votesForLEW;
            constituency.votesForBS += territory.votesForBS;
            constituency.numberOfVotes += territory.numberOfVotes;
        }
    })
    const countiesResults = await counties();
    countiesResults.forEach(county=> {
        const constituency = euroWithVotes.find(s => s.id === county.europarlamentID);
        if(constituency){
            constituency.numberOfVotes += county.numberOfVotes;
            constituency.votesForKO += county.votesForKO;
            constituency.votesForPIS += county.votesForPIS;
            constituency.votesForKONF += county.votesForKONF;
            constituency.votesForTD += county.votesForTD;
            constituency.votesForLEW += county.votesForLEW;
            constituency.votesForBS += county.votesForBS;
            constituency.votesForMN += county.votesForMN ? county.votesForMN : 0;
        }
    })

    return euroWithVotes.map(euro => {
        return {
            id: euro.id,
            name: euro.name,
            numberOfVotes: euro.numberOfVotes,
            votesForKO: euro.votesForKO,
            votesForLEW: euro.votesForLEW,
            votesForTD: euro.votesForTD,
            votesForKONF: euro.votesForKONF,
            votesForPIS: euro.votesForPIS,
            votesForBS: euro.votesForBS,
            votesForMN: euro.votesForMN ? euro.votesForMN : 0,
            votesForGovernment: euro.votesForKO + euro.votesForLEW + euro.votesForTD,
            votesForOpposition: euro.numberOfVotes - euro.votesForKO - euro.votesForLEW - euro.votesForTD
        };
    });
}

export const getSejmikResults = async (): Promise<PartyResults[]> => {
    let importedSejmiki: Sejmik[] = [];
    fetch('../public/Sejmiki.json')
        .then(res => res.json())
        .then(data => importedSejmiki = data);
    const sejmikWithVotes: SejmikWithVotes[] = importedSejmiki.map(sejmik => ({
        ...sejmik,
        numberOfVotes: 0,
        votesForKO: 0,
        votesForPIS: 0,
        votesForKONF: 0,
        votesForTD: 0,
        votesForLEW: 0,
        votesForBS: 0,
        votesForMN: 0,
    }));

    importedTerritory.forEach(territory => {
        const constituency = sejmikWithVotes.find(s => s.id === territory.sejmikID);
        if(constituency){
            constituency.votesForKO += territory.votesForKO;
            constituency.votesForPIS += territory.votesForPIS;
            constituency.votesForKONF += territory.votesForKONF;
            constituency.votesForTD += territory.votesForTD;
            constituency.votesForLEW += territory.votesForLEW;
            constituency.votesForBS += territory.votesForBS;
            constituency.numberOfVotes += territory.numberOfVotes;
        }
    })
    const countiesResults = await counties();
    countiesResults.forEach(county=> {
        const constituency = sejmikWithVotes.find(s => s.id === county.sejmikID);
        if(constituency){
            constituency.numberOfVotes += county.numberOfVotes;
            constituency.votesForKO += county.votesForKO;
            constituency.votesForPIS += county.votesForPIS;
            constituency.votesForKONF += county.votesForKONF;
            constituency.votesForTD += county.votesForTD;
            constituency.votesForLEW += county.votesForLEW;
            constituency.votesForBS += county.votesForBS;
            constituency.votesForMN += county.votesForMN ? county.votesForMN : 0;
        }
    })

    return sejmikWithVotes.map(sejmik => {
        return {
            id: sejmik.id,
            name: sejmik.name,
            numberOfVotes: sejmik.numberOfVotes,
            votesForKO: sejmik.votesForKO,
            votesForLEW: sejmik.votesForLEW,
            votesForTD: sejmik.votesForTD,
            votesForKONF: sejmik.votesForKONF,
            votesForPIS: sejmik.votesForPIS,
            votesForBS: sejmik.votesForBS,
            votesForMN: sejmik.votesForMN ? sejmik.votesForMN : 0,
            votesForGovernment: sejmik.votesForKO + sejmik.votesForLEW + sejmik.votesForTD,
            votesForOpposition: sejmik.numberOfVotes - sejmik.votesForKO - sejmik.votesForLEW - sejmik.votesForTD
        };
    });
};