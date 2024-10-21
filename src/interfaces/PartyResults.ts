export default interface PartyResults {
    id: number;
    name: string;
    numberOfVotes: number;
    votesForKO: number;
    votesForLEW: number;
    votesForTD: number;
    votesForKONF: number;
    votesForPIS: number;
    votesForBS: number;
    votesForMN: number | null;
    votesForGovernment: number;
    votesForOpposition: number;
}