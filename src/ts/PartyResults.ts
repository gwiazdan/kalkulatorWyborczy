import PartyResults from "../interfaces/PartyResults.ts";

interface EvaluationResult {
    topParty: string;
    isAbove40: boolean;
    isAbove50: boolean;
}
interface PartyResultsProps {
    results: PartyResults;
    state: number;
}

export default function evaluatePartyResults({results, state}:PartyResultsProps): EvaluationResult {

    let topParty: string = '';

    const totalVotes: number = results.numberOfVotes;

    let maxVotes: number;

    switch(state) {
        case 0: {
            const votes = [
                results.votesForBS,
                results.votesForKO,
                results.votesForKONF,
                results.votesForLEW,
                results.votesForPIS,
                results.votesForTD
            ]
            const sortedVotes = votes.sort((a,b)=>b-a);
            maxVotes = sortedVotes[0];
            break;
        }
        case 1: {
            const votes = [
                results.votesForBS,
                results.votesForKONF,
                results.votesForPIS,
                //results.votesForSenatePact
            ]
            const sortedVotes = votes.sort((a,b)=>b-a);
            maxVotes = sortedVotes[0];
            break;
        }
        default: {
            const votes = [
                results.votesForBS,
                //results.votesForSenatePact,
                //results.votesForRightWingPact
            ]
            const sortedVotes = votes.sort((a,b)=>b-a);
            maxVotes = sortedVotes[0];
            break;
        }
    }
    switch(maxVotes){
        case results.votesForBS:
            topParty='BS';
            break;
        case results.votesForKO:
            topParty='KO';
            break;
        case results.votesForLEW:
            topParty='LEW';
            break;
        case results.votesForPIS:
            topParty='PIS';
            break;
        case results.votesForTD:
            topParty='TD';
            break;
        case results.votesForKONF:
            topParty='KONF';
            break;
            /*
        case results.votesForSenatePact:
            topParty='SP';
            break;
        case results.votesForRightWingPact:
            topParty='RWP';
            break;*/
        default:
            topParty='MN';
            break;
    }
    const isAbove40 = (maxVotes / totalVotes) * 100 > 40;
    const isAbove50 = (maxVotes / totalVotes) * 100 > 50;

    return {
        topParty,
        isAbove40,
        isAbove50,
    };
}