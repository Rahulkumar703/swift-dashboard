import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ProfileProvider} from "./context/ProfileContext.tsx";
import {DashboardProvider} from "./context/DashboardContext.tsx";
import {ThemeProvider} from "./context/ThemeContext.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <ProfileProvider>
                <DashboardProvider>
                    <App/>
                </DashboardProvider>
            </ProfileProvider>
        </ThemeProvider>
    </StrictMode>,
)
