import {MapOption} from "../components/Contexts/OptionsContext.tsx";
import PartyResults from "../interfaces/PartyResults.ts";
import {PoliticalParty} from "../PartiesEnum.ts";

interface EvaluationResult {
    topParty: PoliticalParty;
}
interface PartyResultsProps {
    results: PartyResults;
    state: MapOption;
}

export default function evaluatePartyResults({results, state}:PartyResultsProps): EvaluationResult {

    let topParty: PoliticalParty;

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
            topParty=PoliticalParty.BezpartyjniSamorzadowcy;
            break;
        case results.votesForKO:
            topParty=PoliticalParty.KoalicjaObywatelska;
            break;
        case results.votesForLEW:
            topParty=PoliticalParty.Lewica;
            break;
        case results.votesForPIS:
            topParty=PoliticalParty.PrawoISprawiedliwosc;
            break;
        case results.votesForTD:
            topParty=PoliticalParty.TrzeciaDroga;
            break;
        case results.votesForKONF:
            topParty=PoliticalParty.Konfederacja;
            break;
        case results.votesForGovernment:
            topParty=PoliticalParty.PaktSenacki;
            break;
        case results.votesForOpposition:
            topParty=PoliticalParty.PaktPrawicy;
            break;
        default:
            topParty=PoliticalParty.MniejszoscNiemiecka;
            break;
    }
    return {
        topParty,
    };
}