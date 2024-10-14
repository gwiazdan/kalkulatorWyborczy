import MunicipalitiesMap from "./MunicipalitiesMap.tsx";

interface PartyResults {
    municipalityID: number;
    name: string;
    numberOfVotes: number;
    votesForBS: number;
    votesForKO: number;
    votesForKONF: number;
    votesForLEW: number;
    votesForPIS: number;
    votesForTD: number;
    votesForMN: number;
}

interface MunicipalitiesMapProps {
    municipalitiesResults: PartyResults[];
}

const Map: React.FC<MunicipalitiesMapProps> = ({municipalitiesResults}) => {


    return (
        <>
            <div className="flex h-full">
                <MunicipalitiesMap municipalitiesResults={municipalitiesResults}/>
            </div>
        </>
    )
}

export default Map;