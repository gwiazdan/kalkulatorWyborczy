import { MapOption } from "../components/Contexts/OptionsContext.tsx";
import PartyResults from "../interfaces/PartyResults.ts";
import {PoliticalParty} from "../PartiesEnum.ts";

interface EvaluationResult {
    topParty: PoliticalParty;
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

    let topParty: PoliticalParty;

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