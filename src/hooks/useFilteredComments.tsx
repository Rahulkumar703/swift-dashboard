import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import type { CommentType } from "../types";

export const useFilteredComments = (comments: CommentType[]) => {
    const [searchParams] = useSearchParams();

    const [page, setPage] = useState(0);
    const [commentsPerPage, setCommentsPerPage] = useState(10);
    const [paginatedComments, setPaginatedComments] = useState<CommentType[]>([]);

    const searchQuery = useMemo(() => searchParams.get('search')?.toLowerCase() || '', [searchParams]);
    const sortField = useMemo(() => searchParams.get('sort'), [searchParams]);
    const sortOrder = useMemo(() => searchParams.get('by') as 'asc' | 'desc' | null, [searchParams]);

    const filteredComments = useMemo(() => {
        return comments.filter(comment => {
            const nameMatch = comment.name?.toLowerCase().includes(searchQuery);
            const emailMatch = comment.email?.toLowerCase().includes(searchQuery);
            const postIdMatch = comment.postId?.toString().includes(searchQuery);
            return nameMatch || emailMatch || postIdMatch;
        });
    }, [comments, searchQuery]);

    const totalItems = filteredComments.length;
    const totalPages = Math.ceil(totalItems / commentsPerPage);
    const start = page * commentsPerPage;
    const end = Math.min(start + commentsPerPage, totalItems);

    useEffect(() => {
        const pageSlice = filteredComments.slice(start, end);

        if (sortField && sortOrder) {
            pageSlice.sort((a, b) => {
                const valA = a[sortField as keyof CommentType];
                const valB = b[sortField as keyof CommentType];
                if (valA == null || valB == null) return 0;

                if (sortField === 'postId') {
                    return sortOrder === 'asc' ? +valA - +valB : +valB - +valA;
                }

                const strA = valA.toString().toLowerCase();
                const strB = valB.toString().toLowerCase();
                return sortOrder === 'asc' ? strA.localeCompare(strB) : strB.localeCompare(strA);
            });
        }

        setPaginatedComments(pageSlice);
    }, [filteredComments, start, end, sortField, sortOrder]);

    useEffect(() => {
        setPage(0); // reset to first page on filter change
    }, [searchQuery]);

    return {
        paginatedComments,
        page,
        setPage,
        commentsPerPage,
        setCommentsPerPage,
        totalPages,
        start,
        end,
        totalItems,
    };
};
