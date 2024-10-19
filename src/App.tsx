import {useContext} from 'react'
import './App.css'
import Map from "./components/Map/Map.tsx";
import {ApiContext} from "./components/Contexts/ApiProvider.tsx";


type ElectionResultsProps = {
    municipalitiesResults: any[];
    countiesResults: any[];
    voivodeshipsResults: any[];
};


function App() {
    const {isApiAvailable} = useContext(ApiContext);


    if (!isApiAvailable) return <div>Błąd: nie można połączyć się z Api</div>;

    return (
        <>
            <div className="grid grid-cols-2 h-full">
                <div className="flex flex-col h-full">
                    <h1 className="underline">123</h1>
                </div>
                <div className="flex flex-col map justify-center p-2">
                    <Map/>
                </div>
            </div>
        </>
    )
}

export default App
