import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import type { CommentType } from "../types";

export const useFilteredComments = (comments: CommentType[]) => {
    const [searchParams] = useSearchParams();

    const [page, setPage] = useState(0);
    const [commentsPerPage, setCommentsPerPage] = useState(10);
    const [filteredComments, setFilteredComments] = useState<CommentType[]>([]);

    const searchQuery = useMemo(() => searchParams.get('search')?.toLowerCase() || '', [searchParams]);
    const sortField = useMemo(() => searchParams.get('sort'), [searchParams]);
    const sortOrder = useMemo(() => searchParams.get('by') as 'asc' | 'desc' | null, [searchParams]);

    useEffect(() => {
        let filtered = comments.filter(comment => {
            const nameMatch = comment.name?.toLowerCase().includes(searchQuery);
            const emailMatch = comment.email?.toLowerCase().includes(searchQuery);
            const postIdMatch = comment.postId?.toString().includes(searchQuery);
            return nameMatch || emailMatch || postIdMatch;
        });

        if (sortField && sortOrder) {
            filtered.sort((a, b) => {
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

        setFilteredComments(filtered);
        setPage(0); // reset to first page on filter change
    }, [comments, searchQuery, sortField, sortOrder]);

    const start = page * commentsPerPage;
    const end = Math.min(start + commentsPerPage, filteredComments.length);
    const totalPages = Math.ceil(filteredComments.length / commentsPerPage);
    const paginatedComments = filteredComments.slice(start, end);

    return {
        paginatedComments,
        page,
        setPage,
        commentsPerPage,
        setCommentsPerPage,
        totalPages,
        start,
        end,
        totalItems: filteredComments.length,
    };
};
