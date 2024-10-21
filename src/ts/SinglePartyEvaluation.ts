import PartyResults from "../interfaces/PartyResults.ts";
import {PoliticalParty} from "../PartiesEnum.ts";

export

interface EvaluationResult {
    isOver60: boolean;
    is40to60: boolean;
    is30to40: boolean;
    is20to30: boolean;
    is10to20: boolean;
    is5to10: boolean;
    is3to5: boolean;
    is1to3: boolean;
    isBelow1: boolean;
    zeroVotes: boolean;
}

interface SinglePartyEvaluationProps {
    results: PartyResults;
    selectedParty: PoliticalParty;
}

export default function singlePartyEvaluation({results, selectedParty}:SinglePartyEvaluationProps): EvaluationResult{
    const totalVotes: number = results.numberOfVotes;
    let partyVotes: number;
    switch(selectedParty){
        case PoliticalParty.KoalicjaObywatelska:
            partyVotes = results.votesForKO;
            break;
        case PoliticalParty.PrawoISprawiedliwosc:
            partyVotes = results.votesForPIS;
            break;
        case PoliticalParty.Konfederacja:
            partyVotes = results.votesForKONF;
            break;
        case PoliticalParty.TrzeciaDroga:
            partyVotes = results.votesForTD;
            break;
        case PoliticalParty.Lewica:
            partyVotes = results.votesForLEW;
            break;
        case PoliticalParty.BezpartyjniSamorzadowcy:
            partyVotes = results.votesForBS;
            break;
        default:
            partyVotes = results.votesForMN==null ? 0 : results.votesForMN;
            break;
    }


    const percent: number = partyVotes / totalVotes * 100;
    const isOver60: boolean = percent >= 50;
    const is40to60: boolean = percent < 60 && percent >= 40;
    const is30to40: boolean = percent < 40 && percent >= 30;
    const is20to30: boolean = percent < 30 && percent >= 20;
    const is10to20: boolean = percent < 20 && percent >= 10;
    const is5to10: boolean = percent < 10 && percent >= 5;
    const is3to5: boolean = percent < 5 && percent >=3;
    const is1to3: boolean = percent < 3 && percent >=1;
    const isBelow1: boolean = percent < 1;
    const zeroVotes: boolean = partyVotes == 0;

    return{
        isOver60,
        is40to60,
        is30to40,
        is20to30,
        is10to20,
        is5to10,
        is3to5,
        is1to3,
        isBelow1,
        zeroVotes
    }

}