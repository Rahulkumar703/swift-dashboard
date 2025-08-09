import {type FC, lazy, Suspense} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useTheme} from "./context/ThemeContext.tsx";

// Legacy
const LegacyHeader = lazy(() => import('./components/legacy/header.tsx'));
const LegacySkeleton = lazy(() => import('./components/legacy/skeleton.tsx'));
const LegacyDashboard = lazy(() => import('./pages/legacy/Dashboard.tsx'));
const LegacyProfile = lazy(() => import('./pages/legacy/Profile.tsx'));
const LegacyNotFound = lazy(() => import('./pages/legacy/NotFound.tsx'));

// Modern
const ModernHeader = lazy(() => import('./components/modern/header.tsx'));
const ModernSkeleton = lazy(() => import('./components/legacy/skeleton.tsx'));
const ModernDashboard = lazy(() => import('./pages/modern/Dashboard.tsx'));
const ModernProfile = lazy(() => import('./pages/modern/Profile.tsx'));
const ModernNotFound = lazy(() => import('./pages/modern/NotFound.tsx'));


const App: FC = () => {

    const {theme} = useTheme();

    const Header = theme === 'legacy' ? LegacyHeader : ModernHeader;
    const Skeleton = theme === 'legacy' ? LegacySkeleton : ModernSkeleton;


    return (
        <BrowserRouter>
            <Suspense fallback={<Skeleton className={'w-full h-20 bg-primary'}/>}>
                <Header/>
            </Suspense>
            <main className={'relative'}>
                <Suspense fallback={<Skeleton className={'w-full flex-1 bg-background'}/>}>
                    <AppRoutes/>
                </Suspense>
            </main>
        </BrowserRouter>
    )
}


const AppRoutes: FC = () => {
    const {theme} = useTheme();

    const isLegacy = theme === 'legacy';

    return (
        <Routes>
            <Route index path='/' element={isLegacy ? <LegacyDashboard/> : <ModernDashboard/>}/>
            <Route path='/profile' element={isLegacy ? <LegacyProfile/> : <ModernProfile/>}/>
            <Route path='*' element={isLegacy ? <LegacyNotFound/> : <ModernNotFound/>}/>
        </Routes>
    );

}

export default App
