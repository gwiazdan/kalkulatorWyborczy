import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ApiProvider} from "./components/Contexts/ApiProvider.tsx";
import {OptionsProvider} from './components/Contexts/OptionsContext.tsx';
import {ElectionsProvider} from "./components/Contexts/ElectionsContext.tsx";
import {ElectionResultsProvider} from "./components/Map/Contexts/ElectionsResultsContext.tsx";
import {FormProvider} from "./components/Contexts/FormContext.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ApiProvider>
            <OptionsProvider>
                <ElectionsProvider>
                    <FormProvider>
                        <ElectionResultsProvider>
                            <App/>
                        </ElectionResultsProvider>
                    </FormProvider>
                </ElectionsProvider>
            </OptionsProvider>
        </ApiProvider>
    </StrictMode>,
)