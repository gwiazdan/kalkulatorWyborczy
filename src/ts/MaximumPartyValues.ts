import PartyResults from "../interfaces/PartyResults.ts";

export interface ExtremePartyResults {
    MaxKO: number;
    MinKO: number;
    MaxPIS: number;
    MinPIS: number;
    MaxKONF: number;
    MinKONF: number;
    MaxTD: number;
    MinTD: number;
    MaxLEW: number;
    MinLEW: number;
    MaxBS: number;
    MinBS: number;
    MaxMN: number;
    MinMN: number;
    MaxSP: number;
    MinSP: number;
    MaxRWP: number;
    MinRWP: number;
}

export default function getExtremePartyResults(results: PartyResults[]): ExtremePartyResults {
    const maxMinResults= {
        MaxKO: -Infinity, MinKO: Infinity,
        MaxPIS: -Infinity, MinPIS: Infinity,
        MaxKONF: -Infinity, MinKONF: Infinity,
        MaxTD: -Infinity, MinTD: Infinity,
        MaxLEW: -Infinity, MinLEW: Infinity,
        MaxBS: -Infinity, MinBS: Infinity,
        MaxMN: -Infinity, MinMN: Infinity,
        MaxSP: -Infinity, MinSP: Infinity,
        MaxRWP: -Infinity, MinRWP: Infinity,
    };

    results.forEach(party => {
        const votesForKO = party.votesForKO / party.numberOfVotes;
        const votesForPIS = party.votesForPIS / party.numberOfVotes;
        const votesForKONF = party.votesForKONF / party.numberOfVotes;
        const votesForTD = party.votesForTD / party.numberOfVotes;
        const votesForLEW = party.votesForLEW / party.numberOfVotes;
        const votesForBS = party.votesForBS / party.numberOfVotes;
        const votesForMN = party.votesForMN != null ? party.votesForMN / party.numberOfVotes : 0;
        const votesForGov = party.votesForGovernment / party.numberOfVotes;
        const votesForOpp = party.votesForOpposition / party.numberOfVotes;

        maxMinResults.MaxKO = Math.max(maxMinResults.MaxKO, votesForKO);
        maxMinResults.MinKO = Math.min(maxMinResults.MinKO, votesForKO);

        maxMinResults.MaxPIS = Math.max(maxMinResults.MaxPIS, votesForPIS);
        maxMinResults.MinPIS = Math.min(maxMinResults.MinPIS, votesForPIS);

        maxMinResults.MaxKONF = Math.max(maxMinResults.MaxKONF, votesForKONF);
        maxMinResults.MinKONF = Math.min(maxMinResults.MinKONF, votesForKONF);

        maxMinResults.MaxTD = Math.max(maxMinResults.MaxTD, votesForTD);
        maxMinResults.MinTD = Math.min(maxMinResults.MinTD, votesForTD);

        maxMinResults.MaxLEW = Math.max(maxMinResults.MaxLEW, votesForLEW);
        maxMinResults.MinLEW = Math.min(maxMinResults.MinLEW, votesForLEW);

        maxMinResults.MaxBS = Math.max(maxMinResults.MaxBS, votesForBS);
        maxMinResults.MinBS = Math.min(maxMinResults.MinBS, votesForBS);

        maxMinResults.MaxMN = Math.max(maxMinResults.MaxMN, votesForMN);
        maxMinResults.MinMN = Math.min(maxMinResults.MinMN, votesForMN);

        maxMinResults.MaxSP = Math.max(maxMinResults.MaxSP, votesForGov);
        maxMinResults.MinSP = Math.min(maxMinResults.MinSP, votesForGov);

        maxMinResults.MaxRWP = Math.max(maxMinResults.MaxRWP, votesForOpp);
        maxMinResults.MinRWP = Math.min(maxMinResults.MinRWP, votesForOpp);
    });

    // Convert results to percentages
    Object.keys(maxMinResults).forEach(key => {
        const typedKey = key as keyof ExtremePartyResults; // Type assertion
        maxMinResults[typedKey] *= 100; // Correct type access
    });

    return maxMinResults as ExtremePartyResults;
}
