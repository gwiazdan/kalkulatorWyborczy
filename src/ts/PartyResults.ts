import { MapOption } from "../components/Contexts/OptionsContext.tsx";
import PartyResults from "../interfaces/PartyResults.ts";

interface EvaluationResult {
    topParty: string;
    isBelow10: boolean;
    isBelow20: boolean;
    isBelow30: boolean;
    isBelow40: boolean;
    isBelow50: boolean;
    isBelow60: boolean;
}
interface PartyResultsProps {
    results: PartyResults;
    state: MapOption;
}

export default function evaluatePartyResults({results, state}:PartyResultsProps): EvaluationResult {

    let topParty: string = '';

    const totalVotes: number = results.numberOfVotes;

    let maxVotes: number;

    switch(state) {
        case MapOption.PoparciePartii: {
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
        case MapOption.RzadVsOpozycja: {
            const votes = [
                results.votesForOpposition,
                results.votesForGovernment
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

        case results.votesForGovernment:
            topParty='SP';
            break;
        case results.votesForOpposition:
            topParty='RWP';
            break;
        default:
            break;
    }
    const isBelow10 = (maxVotes / totalVotes) * 100 < 10;
    const isBelow20 = (maxVotes / totalVotes) * 100 < 20;
    const isBelow30 = (maxVotes / totalVotes) * 100 < 30;
    const isBelow40 = (maxVotes / totalVotes) * 100 < 40;
    const isBelow50 = (maxVotes / totalVotes) * 100 < 50;
    const isBelow60 = (maxVotes / totalVotes) * 100 < 60;


    return {
        topParty,
        isBelow10,
        isBelow20,
        isBelow30,
        isBelow40,
        isBelow50,
        isBelow60
    };
}