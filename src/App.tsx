import {useContext} from 'react'
import './App.css'
import Map from "./components/Map/Map.tsx";
import {ApiContext} from "./components/Contexts/ApiProvider.tsx";
import Options from "./components/Options.tsx";

function App() {
    const isApiAvailable:boolean = useContext(ApiContext);

    if (!isApiAvailable) return <div>Błąd: nie można połączyć się z Api</div>;

    return (
        <>
            <div className="grid grid-cols-2 h-full">
                <div>
                    <Options/>
                </div>
                <div className="flex flex-col map justify-center p-2">
                    <Map/>
                </div>
            </div>
        </>
    )
}

export default App
