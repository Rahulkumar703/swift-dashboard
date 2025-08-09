import {createContext, type ReactNode, useContext, useEffect, useState} from "react";
import type {CommentType} from "../types";

const initialContext = {
    comments: null,
    loading: false,
    error: null
}

const DashboardContext = createContext<{
    comments: CommentType[] | null;
    loading: boolean;
    error: string | null;
}>(initialContext);


export const DashboardProvider = ({children}: { children: ReactNode }) => {
    const [comments, setComments] = useState<CommentType[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const abortController = new AbortController();
        const fetchComments = async () => {
            try {
                setError(null);
                setLoading(true);
                const response = await fetch('https://jsonplaceholder.typicode.com/comments', {signal: abortController.signal});

                if (!response.ok) {
                    setError('Please check your internet connection or try again later.');
                    return;
                }
                const data: CommentType[] = await response.json();
                setComments(data);
                localStorage.setItem('comments', JSON.stringify(data));
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
        const storedComments = localStorage.getItem('comments');
        if (storedComments) {
            setComments(JSON.parse(storedComments));
        } else {
            fetchComments();
        }

        return () => {
            abortController.abort();
        }
    }, []);

    const value = {
        comments,
        loading,
        error
    }

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    )
}

export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
}