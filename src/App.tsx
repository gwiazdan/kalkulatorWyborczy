import './App.css'
import Map from "./components/Map/Map.tsx";
import {Controls} from "./components/Controls/Controls.tsx";
import {AppHeader} from "./components/AppHeader.tsx";
import {DetailsWindow} from "./components/Details/DetailsWindow.tsx";

function App() {

    return (
        <>
            <AppHeader/>
            <div className="flex lg:flex-row flex-col lg:flex-rows-1 ">
                <div className="flex basis-1/2">
                    <Controls/>
                </div>
                <div className="flex flex-col lg:aspect-square map justify-center p-4 lg:h-auto flex-grow space-y-2"
                     style={{height: 'calc(100vh - 60px)'}}>
                    <Map/>
                </div>
            </div>
            <div className="flex lg:flex-row flex-col lg:flex-rows-1">
                <div className="flex basis-1/2 h-full">
                    <DetailsWindow/>
                </div>
                <div className="p-4">
                    1234
                </div>
            </div>

        </>
    )
}

export default App
