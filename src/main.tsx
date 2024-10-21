import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ApiProvider} from "./components/Contexts/ApiProvider.tsx";
import { SenateOptionsProvider } from './components/Contexts/SenateOptionsContext.tsx';
import { MapOptionsProvider } from './components/Contexts/MapPaintingOptionsContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ApiProvider>
            <SenateOptionsProvider>
                <MapOptionsProvider>
                    <App/>
                </MapOptionsProvider>
            </SenateOptionsProvider>
        </ApiProvider>
    </StrictMode>,
)