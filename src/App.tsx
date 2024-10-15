import {useEffect, useState} from 'react'
import './App.css'
import {fetchData} from './api/api.ts';
import Map from "./components/Map/Map.tsx";


type ElectionResultsProps = {
    municipalitiesResults: any[];
    countiesResults: any[];
    voivodeshipsResults: any[];
};


function App() {
    const [data, setData] = useState<ElectionResultsProps | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);

            const cachedData = sessionStorage.getItem('fetchedData');
            if (cachedData) {
                setData(JSON.parse(cachedData));
                setLoading(false);
                return;
            }
            try {
                const result: ElectionResultsProps | null = await fetchData();
                if (result) {
                    setData(result);
                    sessionStorage.setItem('fetchedData', JSON.stringify(result));
                } else {
                    setError('Nie udało się pobrać danych');
                }
            }  catch (error) {
                setError("Błąd pobierania danych!");
            } finally {
                setLoading(false);
            }
        };
        getData().catch(err => console.error(err));

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
                    <Map data={data}/>
                </div>
            </div>
        </>
    )
}

export default App
