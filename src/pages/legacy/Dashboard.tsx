import {type Dispatch, type FC, type SetStateAction} from 'react';
import PageWrapper from "../../components/legacy/page-wrapper.tsx";
import {useDashboard} from "../../context/DashboardContext.tsx";
import Skeleton from "../../components/legacy/skeleton.tsx";
import Button from "../../components/legacy/button.tsx";
import type {CommentType} from "../../types";
import {ChevronLeft, ChevronRight, RefreshCcw, ChevronDown, ChevronUp, Search, X} from "lucide-react";
import Select from "../../components/legacy/select.tsx";
import {useFilteredComments} from "../../hooks/useFilteredComments.tsx";
import {useFilters} from "../../hooks/useFilters.tsx";
import {ListLayout} from "../../components/common/list-layout.tsx";

const Dashboard: FC = () => {
    const {loading, comments, error} = useDashboard();


    if (error) {
        return <ErrorScreen error={error}/>
    }

    if (loading || !comments) {
        return <LoadingScreen/>
    }

    return (
        <DashboardContent comments={comments}/>
    );
}


const LoadingScreen: FC = () => {
    return (
        <PageWrapper>
            <div className={'flex flex-col items-center gap-4'}>
                <Skeleton className={'sm:ml-auto w-full sm:w-md h-12 rounded-full shadow'}/>
                <div className={'flex flex-row gap-2 sm:mr-auto w-full'}>
                    <Skeleton className={'w-full sm:w-32 h-8 rounded-xl'}/>
                    <Skeleton className={'w-full sm:w-32 h-8 rounded-xl'}/>
                    <Skeleton className={'w-full sm:w-32 h-8 rounded-xl'}/>
                </div>
            </div>
            <div className={'flex flex-col gap-10 shadow-lg border border-accent/30 rounded-xl p-6 flex-1'}>

                <div className={'grid grid-cols-1 gap-6'}>
                    <div className={'flex items-center justify-between gap-6'}>
                        <Skeleton className={'w-full h-11 rounded-xl'}/>
                        <Skeleton className={'w-full h-11 rounded-xl'}/>
                        <Skeleton className={'w-full h-11 rounded-xl'}/>
                        <Skeleton className={'w-full h-11 rounded-xl'}/>
                    </div>
                    <Skeleton className={'w-full h-11 rounded-xl'}/>
                    <Skeleton className={'w-full h-11 rounded-xl'}/>
                    <Skeleton className={'w-full h-11 rounded-xl'}/>
                    <Skeleton className={'w-full h-11 rounded-xl'}/>
                    <Skeleton className={'w-full h-11 rounded-xl'}/>
                    <Skeleton className={'w-full h-11 rounded-xl'}/>
                    <Skeleton className={'w-full h-11 rounded-xl'}/>
                    <Skeleton className={'w-full h-11 rounded-xl'}/>
                </div>
                <Skeleton className={'ml-auto w-48 h-8 rounded-xl'}/>

            </div>
        </PageWrapper>
    )
}


const ErrorScreen: FC<{ error: string }> = ({error}) => {

    const reload = () => {
        window.location.reload();
    }

    return (
        <PageWrapper>
            <div
                className={'max-w-md text-center bg-accent/30 rounded-xl items-center w-full mx-auto p-4 flex flex-col gap-6 py-6'}>
                <h1 className={'text-3xl font-bold'}>
                    Failed to load dashboard
                </h1>
                <p className={'text-lg text-red-500'}>
                    {error}
                </p>
                <Button className={"flex items-center gap-2"} onClick={reload}>
                    <RefreshCcw className={'size-5'}/>
                    Reload
                </Button>
            </div>
        </PageWrapper>
    )
}


const DashboardContent: FC<{ comments: CommentType[] }> = ({comments}) => {

    const {
        paginatedComments,
        page,
        setPage,
        commentsPerPage,
        setCommentsPerPage,
        totalPages,
        start,
        end,
        totalItems,
    } = useFilteredComments(comments);

    return (
        <PageWrapper className={'h-auto'}>
            <DashboardFilterBar/>
            <ListLayout comments={paginatedComments}>
                <Pagination  {...{
                    page, setPage, commentsPerPage, setCommentsPerPage, totalPages, start, end, totalItems
                }} />
            </ListLayout>
        </PageWrapper>
    )
}


const Pagination: FC<{
    page: number,
    setPage: Dispatch<SetStateAction<number>>,
    commentsPerPage: number,
    setCommentsPerPage: Dispatch<SetStateAction<number>>,
    totalPages: number,
    start: number,
    end: number,
    totalItems: number
}> = ({page, setPage, commentsPerPage, setCommentsPerPage, totalPages, start, end, totalItems}) => {

    return (
        <div className={'flex sm:flex-row flex-col items-center gap-4 sm:ml-auto'}>
            <span className={'select-none'}>{start + 1} to {end} of {totalItems} items</span>
            <div className={'flex gap-2 items-center sm:flex-row flex-col'}>
                <div className={'flex gap-2 items-center'}>
                    <Button variant={'outline'} className={'py-3'} disabled={page === 0}
                            onClick={() => setPage(page - 1)}
                    >
                        <ChevronLeft className={'size-4'}/>
                    </Button>

                    <div className="flex gap-2">
                        {
                            page > 0 ? <Button
                                variant="ghost"
                                onClick={() => setPage(page === 0 ? 0 : page - 1)}
                            >
                                {page}
                            </Button> : null
                        }

                        <Button variant="primary" onClick={() => setPage(page)}>
                            {page + 1}
                        </Button>
                        {
                            page < totalPages - 1 ?
                                <Button variant="ghost" onClick={() => setPage(page + 1)}>
                                    {page === 0 ? page + 2 : page + 2}
                                </Button> : null
                        }
                    </div>

                    <Button variant={'outline'} className={'py-3'} disabled={page >= totalPages - 1}
                            onClick={() => setPage(page + 1)}
                    >
                        <ChevronRight className={'size-4'}/>
                    </Button>
                </div>
                <Select value={commentsPerPage} variant={'outline'}
                        onChange={(e) => setCommentsPerPage(Number(e.target.value))}>
                    <option className={'py-3'} value={10}>10 / Page</option>
                    <option className={'py-3'} value={20}>20 / Page</option>
                    <option className={'py-3'} value={50}>50 / Page</option>
                </Select>
            </div>
        </div>
    )
}


const DashboardFilterBar: FC = () => {

    const {searchQuery, setSearchQuery, sortBy, cycleSort} = useFilters();

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="ml-auto w-full max-w-md relative">
                <input
                    className="w-full shadow-md bg-input p-3 px-4 text-sm font-normal rounded-xl pr-6 focus:outline-none"
                    placeholder="Search by email or name"
                    autoComplete={"off"}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                {
                    searchQuery.length ?
                        <X className="size-5 absolute right-4 cursor-pointer hover:text-primary text-accent top-1/2 -translate-y-1/2"
                           onClick={() => {
                               setSearchQuery('')
                           }}/> :
                        <Search
                            className="size-5 absolute right-4 text-accent pointer-events-none top-1/2 -translate-y-1/2"/>
                }
            </div>

            <div className="flex flex-wrap flex-row gap-2 sm:mr-auto w-full">
                {['postId', 'name', 'email'].map(field => (
                    <Button
                        key={field}
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => cycleSort(field)}
                    >
                        Sort {field.charAt(0).toUpperCase() + field.slice(1)}
                        <span className="flex flex-col">
              <ChevronUp
                  className={`size-4 mt-0 ${
                      sortBy.field === field && sortBy.order === 'desc' ? 'text-primary' : 'text-accent'
                  }`}
              />
              <ChevronDown
                  className={`size-4 -mt-1.5 ${
                      sortBy.field === field && sortBy.order === 'asc' ? 'text-primary' : 'text-accent'
                  }`}
              />
            </span>
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;