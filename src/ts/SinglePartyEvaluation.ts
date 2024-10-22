import PartyResults from "../interfaces/PartyResults.ts";
import {PoliticalParty} from "../PartiesEnum.ts";

export

interface EvaluationResult {
    zeroVotes: boolean;
}

interface SinglePartyEvaluationProps {
    results: PartyResults;
    selectedParty: PoliticalParty;
}

export default function singlePartyEvaluation({results, selectedParty}:SinglePartyEvaluationProps): EvaluationResult{
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
    const zeroVotes: boolean = partyVotes == 0;

    return{
        zeroVotes
    }

}