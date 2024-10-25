import PartyResults from "../interfaces/PartyResults.ts";

interface EvaluationResult {
    topParty: string;
    below30: boolean;
    below40: boolean;
}

interface TopPartyProps {
    results: PartyResults;

}


export default function evaluateTopParty({results}: TopPartyProps): EvaluationResult {
    let topParty: string = '';
    const totalVotes: number = results.numberOfVotes;

    const votes = [
        results.votesForBS,
        results.votesForKO,
        results.votesForKONF,
        results.votesForLEW,
        results.votesForPIS,
        results.votesForTD,
        results.votesForMN ? results.votesForMN : 0
    ]
    const sortedVotes = votes.sort((a, b) => b - a);
    const maxVotes = sortedVotes[0];

    switch (maxVotes) {
        case results.votesForBS:
            topParty = 'BS';
            break;
        case results.votesForKO:
            topParty = 'KO';
            break;
        case results.votesForLEW:
            topParty = 'LEW';
            break;
        case results.votesForPIS:
            topParty = 'PIS';
            break;
        case results.votesForTD:
            topParty = 'TD';
            break;
        case results.votesForKONF:
            topParty = 'KONF';
            break;
        case results.votesForGovernment:
            topParty = 'SP';
            break;
        case results.votesForOpposition:
            topParty = 'RWP';
            break;
        default:
            topParty = 'MN';
            break;
    }
    const below30 = maxVotes / totalVotes * 100 < 30;
    const below40 = maxVotes / totalVotes * 100 < 40;

    return {
        topParty,
        below30,
        below40
    };
}