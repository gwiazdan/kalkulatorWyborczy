import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ApiProvider} from "./components/Contexts/ApiProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ApiProvider>
            <App/>
        </ApiProvider>
    </StrictMode>,
)