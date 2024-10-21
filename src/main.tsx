import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ApiProvider} from "./components/Contexts/ApiProvider.tsx";
import { OptionsProvider } from './components/Contexts/OptionsContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ApiProvider>
            <OptionsProvider>
                <App/>
            </OptionsProvider>
        </ApiProvider>
    </StrictMode>,
)