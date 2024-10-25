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
            <div className="flex lg:flex-row flex-col lg:flex-rows-1">
                <div className="flex basis-1/2">
                    <Controls/>
                </div>
                <div className="flex flex-col lg:aspect-square map justify-center p-4 lg:h-auto flex-grow space-y-2"
                     style={{height: 'calc(100vh - 60px)'}}>
                    <Map/>
                </div>
            </div>
            <div>
                123
            </div>

        </>
    )
}

export default App
