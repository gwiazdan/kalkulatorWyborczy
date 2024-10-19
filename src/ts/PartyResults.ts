import PartyResults from "../interfaces/PartyResults.ts";

interface EvaluationResult {
    topParty: string;
    isAbove40: boolean;
    isAbove50: boolean;
    percentResults: {
        BS: number;
        KO: number;
        KONF: number;
        LEW: number;
        PIS: number;
        TD: number;
        MN: number;
    };
}


export default function evaluatePartyResults(results: PartyResults): EvaluationResult {

    let topParty: string = '';

    const totalVotes: number = results.numberOfVotes;

    const percentResults = {
        BS: (results.votesForBS / totalVotes) * 100,
        KO: (results.votesForKO / totalVotes) * 100,
        KONF: (results.votesForKONF / totalVotes) * 100,
        LEW: (results.votesForLEW / totalVotes) * 100,
        PIS: (results.votesForPIS / totalVotes) * 100,
        TD: (results.votesForTD / totalVotes) * 100,
        MN: (results.votesForMN / totalVotes) * 100
    };

    let maxVotes = Math.max(
        results.votesForBS,
        results.votesForKO,
        results.votesForKONF,
        results.votesForLEW,
        results.votesForPIS,
        results.votesForTD
    );

    if (maxVotes === results.votesForBS) {
        topParty = 'BS';
    } else if (maxVotes === results.votesForKO) {
        topParty = 'KO';
    } else if (maxVotes === results.votesForKONF) {
        topParty = 'KONF';
    } else if (maxVotes === results.votesForLEW) {
        topParty = 'LEW';
    } else if (maxVotes === results.votesForPIS) {
        topParty = 'PIS';
    } else if (maxVotes === results.votesForTD) {
        topParty = 'TD';
    } else if (maxVotes === results.votesForMN) {
        topParty = 'MN';
    }
    const isAbove40 = (maxVotes / totalVotes) * 100 > 40;
    const isAbove50 = (maxVotes / totalVotes) * 100 > 50;

    return {
        topParty,
        isAbove40,
        isAbove50,
        percentResults,
    };
}