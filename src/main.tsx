import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {OptionsProvider} from './components/Contexts/OptionsContext.tsx';
import {ElectionsProvider} from "./components/Contexts/ElectionsContext.tsx";
import {ElectionResultsProvider} from "./components/Map/Contexts/ElectionsResultsContext.tsx";
import {FormProvider} from "./components/Contexts/FormContext.tsx";
import {CurrentMapProvider} from "./components/Map/Contexts/CurrentMapContext.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <OptionsProvider>
            <ElectionsProvider>
                <FormProvider>
                    <ElectionResultsProvider>
                        <CurrentMapProvider>
                            <App/>
                        </CurrentMapProvider>
                    </ElectionResultsProvider>
                </FormProvider>
            </ElectionsProvider>
        </OptionsProvider>
    </StrictMode>,
)