import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ApiProvider} from "./components/Contexts/ApiProvider.tsx";
import {OptionsProvider} from './components/Contexts/OptionsContext.tsx';
import {ElectionsProvider} from "./components/Contexts/ElectionsContext.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ApiProvider>
            <OptionsProvider>
                <ElectionsProvider>
                    <App/>
                </ElectionsProvider>
            </OptionsProvider>
        </ApiProvider>
    </StrictMode>,
)