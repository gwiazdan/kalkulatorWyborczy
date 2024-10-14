import {useEffect, useState} from 'react'
import './App.css'
import './css/municipalities.css'
import {fetchData} from './api/api.ts';
import Map from "./components/Map.tsx";

function App() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const result = await fetchData();
            if (result) {
                setData(result);
            } else {
                setError('Nie udało się pobrać danych');
            }
            setLoading(false);
        };

        getData();
    }, []);

    if (loading) return <div>Ładowanie...</div>;
    if (error) return <div>Błąd: {error}</div>;

    return (
        <>
            <div className="grid grid-cols-2 h-full">
                <div className="flex flex-col h-full">
                    <h1 className="underline">123</h1>
                </div>
                <div className="flex flex-col map justify-center p-2">
                    <Map municipalitiesResults={data}/>
                </div>
            </div>
        </>
    )
}

export default App
