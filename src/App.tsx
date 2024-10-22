import {useContext} from 'react'
import './App.css'
import Map from "./components/Map/Map.tsx";
import {ApiContext} from "./components/Contexts/ApiProvider.tsx";
import {Controls} from "./components/Controls/Controls.tsx";
import {AppHeader} from "./components/AppHeader.tsx";

function App() {
    const isApiAvailable:boolean = useContext(ApiContext);

    if (!isApiAvailable) return <div>Błąd: nie można połączyć się z Api</div>;

    return (
        <>
            <AppHeader/>
            <div className="grid lg:grid-cols-2 h-full">
                <div>
                    <Controls/>
                </div>
                <div className="flex flex-col map justify-center p-3">
                    <Map/>
                </div>
            </div>

        </>
    )
}

export default App
