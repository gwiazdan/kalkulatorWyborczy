import PartyResults from "../interfaces/PartyResults.ts";
import {PoliticalParty} from "../PartiesEnum.ts";
import {ExtremePartyResults} from "./MaximumPartyValues.ts";

interface CalculateColorProps {
    results: PartyResults;
    selectedParty: PoliticalParty;
    extremePartyResults: ExtremePartyResults;
}

const partyColors = {
    [PoliticalParty.KoalicjaObywatelska]: '#e19f39',
    [PoliticalParty.PrawoISprawiedliwosc]: '#073A76',
    [PoliticalParty.Konfederacja]: '#102440',
    [PoliticalParty.TrzeciaDroga]: '#96d544',
    [PoliticalParty.Lewica]: '#ac145a',
    [PoliticalParty.BezpartyjniSamorzadowcy]: '#DA251D',
    [PoliticalParty.MniejszoscNiemiecka]: '#0780C4',
    [PoliticalParty.PaktSenacki]: '#e19f39',
    [PoliticalParty.PaktPrawicy]: '#073A76'
};

export function calculateColor({selectedParty, results, extremePartyResults}: CalculateColorProps) {
    const partyVotesMap = {
        [PoliticalParty.KoalicjaObywatelska]: results.votesForKO,
        [PoliticalParty.PrawoISprawiedliwosc]: results.votesForPIS,
        [PoliticalParty.Konfederacja]: results.votesForKONF,
        [PoliticalParty.TrzeciaDroga]: results.votesForTD,
        [PoliticalParty.Lewica]: results.votesForLEW,
        [PoliticalParty.BezpartyjniSamorzadowcy]: results.votesForBS,
        [PoliticalParty.MniejszoscNiemiecka]: results.votesForMN != null ? results.votesForMN : 0,
        [PoliticalParty.PaktSenacki]: results.votesForGovernment,
        [PoliticalParty.PaktPrawicy]: results.votesForOpposition
    };

    const partyVotes = partyVotesMap[selectedParty] / results.numberOfVotes * 100;
    const max = extremePartyResults[`Max${selectedParty}`];
    const min = extremePartyResults[`Min${selectedParty}`];

    return getGradientColor(partyVotes, min, max, partyColors[selectedParty]);
}

function getGradientColor(value: number, min: number, max: number, partyColor: string): string {
    const normalized = Math.max(0, Math.min(1, (value - min) / (max - min)));

    // Obsługa sytuacji, gdy min i max są równe
    if (min === max) {
        return partyColor; // Zwraca kolor partii, jeśli brak różnicy
    }

    // Zastosowanie koloru partii jako koloru maksymalnego
    const endColor = hexToRgb(partyColor);
    const startColor = lightenColor(endColor, 90);

    const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * normalized);
    const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * normalized);
    const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * normalized);

    return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex: string): [number, number, number] {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return [r, g, b];
}

function lightenColor(rgb: [number, number, number], percent: number): [number, number, number] {
    return rgb.map(channel => Math.min(255, Math.round(channel + (255 - channel) * (percent / 100))) as number) as [number, number, number];
}