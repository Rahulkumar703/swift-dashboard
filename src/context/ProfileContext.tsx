import {createContext, type ReactNode, useContext, useEffect, useState} from "react";
import type {ProfileType} from "../types";

const initialContext = {
    profile: null,
    loading: false,
    error: null
}
const ProfileContext = createContext<{
    profile: ProfileType | null;
    loading: boolean;
    error: string | null;
}>(initialContext);

export const ProfileProvider = ({children}: { children: ReactNode }) => {
    const [profile, setProfile] = useState<ProfileType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const abortController = new AbortController();
        const fetchProfile = async () => {
            try {
                setError(null);
                setLoading(true);
                const response = await fetch('https://jsonplaceholder.typicode.com/users/1', {signal: abortController.signal});

                if (!response.ok) {
                    setError('Please check your internet connection or try again later.');
                    return;
                }
                const data: ProfileType = await response.json();
                setProfile(data);
                localStorage.setItem('profile', JSON.stringify(data));
            } catch (error) {
                if (error instanceof Error) {
                    if (error.name !== 'AbortError')
                        setError(error.message);
                    return;
                }
                setError('An unexpected error occurred. Please try again later.');
            } finally {
                setLoading(false);
            }
        }
        const storedProfile = localStorage.getItem('profile');
        if (storedProfile) {
            setProfile(JSON.parse(storedProfile));
        } else {
            fetchProfile();
        }

        return () => {
            abortController.abort();
        }

    }, []);

    const value = {
        profile,
        loading,
        error
    }


    return (<ProfileContext.Provider value={value}>
        {children}
    </ProfileContext.Provider>)
}

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (context === null) {
        throw new Error("useProfile must be used within a ProfileProvider");
    }
    return context;
}