interface CountyResults {
    countyID: number;
    name:string;
    votes: number;
    votesForBS:number;
    votesForKO:number;
    votesForKONF:number;
    votesForLEW:number;
    votesForPIS:number;
    votesForTD:number;
    votesForMN:number;
}

interface PercentResults {
    BS: number;
    KO: number;
    KONF: number;
    LEW: number;
    PIS: number;
    TD: number;
    MN: number;
}

interface EvaluationResult {
    topParty: keyof PercentResults;
    isAbove40: boolean;
    isAbove50: boolean;
    percentResults: PercentResults;
}


export default function evaluateCountyResults(results: CountyResults): EvaluationResult {
    const totalVotes: number = results.votes;

    const partyVotes = {
        BS: results.votesForBS,
        KO: results.votesForKO,
        KONF: results.votesForKONF,
        LEW: results.votesForLEW,
        PIS: results.votesForPIS,
        TD: results.votesForTD,
        MN: results.votesForMN,
    };

    const percentResults: PercentResults = {
        BS: (partyVotes.BS / totalVotes) * 100,
        KO: (partyVotes.KO / totalVotes) * 100,
        KONF: (partyVotes.KONF / totalVotes) * 100,
        LEW: (partyVotes.LEW / totalVotes) * 100,
        PIS: (partyVotes.PIS / totalVotes) * 100,
        TD: (partyVotes.TD / totalVotes) * 100,
        MN: (partyVotes.MN / totalVotes) * 100,
    };

    const topParty = (Object.entries(partyVotes) as [keyof PercentResults, number][]).reduce((a, b) => (b[1] > a[1] ? b : a))[0];

    const isAbove40 = (partyVotes[topParty] / totalVotes) * 100 > 40;
    const isAbove50 = (partyVotes[topParty] / totalVotes) * 100 > 50;

    return {
        topParty,
        isAbove40,
        isAbove50,
        percentResults,
    };
}