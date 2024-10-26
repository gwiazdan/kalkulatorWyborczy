import {ElectionsOption, useElectionsContext} from "../Contexts/ElectionsContext.tsx";
import {SejmMap} from "./ConstituencyMaps/SejmMap.tsx";
import SenateMap from "./ConstituencyMaps/SenateMap.tsx";
import {SejmikMap} from "./ConstituencyMaps/SejmikMap.tsx";
import {EuroMap} from "./ConstituencyMaps/EuroMap.tsx";

export const ElectionMap = () => {
    const {electionsOption} = useElectionsContext()

    switch (electionsOption) {
        case ElectionsOption.Sejm: {
            return (<><SejmMap/></>);
        }
        case ElectionsOption.Senat: {
            return (<><SenateMap/></>);
        }
        case ElectionsOption.Sejmiki: {
            return (<><SejmikMap/></>);
        }
        default:
            return (<><EuroMap/></>);
    }
};