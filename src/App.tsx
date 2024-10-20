import {useContext, useState} from 'react'
import './App.css'
import Map from "./components/Map/Map.tsx";
import {ApiContext} from "./components/Contexts/ApiProvider.tsx";
import TemporarySwitch from './components/Map/TemporarySwitch.tsx';
import SecondTemporarySwitch from "./components/Map/SecondTemporarySwitch.tsx";

function App() {
    const isApiAvailable:boolean = useContext(ApiContext);
    const [senateState, setSenateState] = useState<string>(()=>{
        const savedSenateState = localStorage.getItem('senateCurrentState');
        return savedSenateState ? savedSenateState : 'Pakt Senacki';
    })
    const [popularityState, setPopularityState] = useState<string>(()=>{
        const savedPopularityState = localStorage.getItem('popularityCurrentState');
        return savedPopularityState ? savedPopularityState : 'Pakt Senacki';
    })
    const handleSenateStateChange = (newState :string) => {
        setSenateState(newState);
    }
    const handlePopularityStateChange = (newState :string) => {
        setPopularityState(newState);
    }

    if (!isApiAvailable) return <div>Błąd: nie można połączyć się z Api</div>;

    return (
        <>
            <div className="grid grid-cols-2 h-full">
                <div className="">
                    <TemporarySwitch onChange={handleSenateStateChange}/>
                    <SecondTemporarySwitch onChange={handlePopularityStateChange}/>
                </div>
                <div className="flex flex-col map justify-center p-2">
                    <Map senateState={senateState} popularityState={popularityState}/>
                </div>
            </div>
        </>
    )
}

export default App
