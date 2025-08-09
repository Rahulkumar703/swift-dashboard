import {createContext, type ReactNode, useContext, useEffect, useState} from "react";
import type {ThemeType} from "../types";


type ThemeContextType = {
    mode: 'light' | 'dark';
    theme: 'legacy' | 'modern';
    changeTheme: (theme: ThemeType) => void;
};

const initialTheme: ThemeContextType = {
    mode: 'light',
    theme: 'legacy',
    changeTheme: () => {
    },
};


const ThemeContext = createContext<ThemeContextType>(initialTheme);

const getInitialMode = (): 'light' | 'dark' => {
    const stored = localStorage.getItem('mode') as 'light' | 'dark' | null;
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getInitialTheme = (): 'legacy' | 'modern' => {
    return (localStorage.getItem('theme') as 'legacy' | 'modern') ?? 'legacy';
};

export const ThemeProvider = ({children}: { children: ReactNode }) => {
    const [mode, setMode] = useState<'light' | 'dark'>(() => getInitialMode());
    const [theme, setTheme] = useState<'legacy' | 'modern'>(() => getInitialTheme());

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(mode);
        localStorage.setItem('mode', mode);
    }, [mode]);

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    const changeTheme = (theme: ThemeType) => {
        if (theme.mode) setMode(theme.mode);
        if (theme.theme) setTheme(theme.theme);
    };

    return (
        <ThemeContext.Provider value={{mode, theme, changeTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}