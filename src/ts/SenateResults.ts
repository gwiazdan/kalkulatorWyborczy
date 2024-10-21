import SenateResults from "../interfaces/SenateResults.ts";
import {SenateOption} from "../components/Contexts/OptionsContext.tsx";

interface EvaluationResult {
    topParty: string;
    isTossup: boolean;
    isLeaning: boolean;
    isLikely: boolean;
}

interface SenateResultsProps {
    results: SenateResults;
    state: SenateOption;
}


export default function evaluateSenateResults({results, state}:SenateResultsProps): EvaluationResult {
    let topParty: string = '';
    let maxVotes;
    const totalVotes: number = results.numberOfVotes;
    let secondLargestResult : number;

    switch(state) {
        case SenateOption.BezPaktow: {
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
            secondLargestResult = sortedVotes[1];
            break;
        }
        case SenateOption.TylkoPaktSenacki: {
            const votes = [
                results.votesForBS,
                results.votesForKONF,
                results.votesForPIS,
                results.votesForSenatePact
            ]
            const sortedVotes = votes.sort((a,b)=>b-a);
            maxVotes = sortedVotes[0];
            secondLargestResult = sortedVotes[1];
            break;
        }
        case SenateOption.TylkoPaktPrawicy: {
            const votes = [
                results.votesForBS,
                results.votesForKO,
                results.votesForLEW,
                results.votesForRightWingPact,
                results.votesForTD
            ]
            const sortedVotes = votes.sort((a,b)=>b-a);
            maxVotes = sortedVotes[0];
            secondLargestResult = sortedVotes[1];
            break;
            }
        default: {
            const votes = [
                results.votesForBS,
                results.votesForSenatePact,
                results.votesForRightWingPact
            ]
            const sortedVotes = votes.sort((a,b)=>b-a);
            maxVotes = sortedVotes[0];
            secondLargestResult = sortedVotes[1];
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
        case results.votesForSenatePact:
            topParty='SP';
            break;
        case results.votesForRightWingPact:
            topParty='RWP';
            break;
        default:
            topParty='MN';
            break;
    }


    const isTossup = (maxVotes-secondLargestResult)/totalVotes * 100 < 2;
    const isLeaning = (maxVotes-secondLargestResult)/totalVotes * 100 < 4;
    const isLikely = (maxVotes-secondLargestResult)/totalVotes * 100 < 6;

    return {
        topParty,
        isTossup,
        isLeaning,
        isLikely,
    };
}