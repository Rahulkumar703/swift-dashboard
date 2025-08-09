import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

type SortOrder = 'asc' | 'desc' | null;

export const useFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [sortBy, setSortBy] = useState<{
        field: string | null;
        order: SortOrder;
    }>({
        field: searchParams.get('sort') || null,
        order: searchParams.get('by') as SortOrder,
    });

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        searchQuery ? params.set('search', searchQuery) : params.delete('search');
        setSearchParams(params);
    }, [searchQuery]);

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (sortBy.field && sortBy.order) {
            params.set('sort', sortBy.field);
            params.set('by', sortBy.order);
        } else {
            params.delete('sort');
            params.delete('by');
        }
        setSearchParams(params);
    }, [sortBy]);

    const cycleSort = useCallback((field: string) => {
        setSortBy(prev => {
            if (prev.field !== field) return { field, order: 'asc' };
            if (prev.order === 'asc') return { field, order: 'desc' };
            return { field: null, order: null };
        });
    }, []);

    return {
        searchQuery,
        setSearchQuery,
        sortBy,
        cycleSort,
    };
};
