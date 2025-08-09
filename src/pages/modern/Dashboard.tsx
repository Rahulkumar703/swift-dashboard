import {type Dispatch, type FC, type SetStateAction, useState} from 'react';
import PageWrapper from "../../components/modern/page-wrapper.tsx";
import {useDashboard} from "../../context/DashboardContext.tsx";
import Skeleton from "../../components/modern/skeleton.tsx";
import Button from "../../components/modern/button.tsx";
import type {CommentType} from "../../types";
import {
    ChevronLeft,
    ChevronRight,
    RefreshCcw,
    ArrowDown,
    ArrowUp,
    Search,
    X,
    LayoutGrid,
    LayoutList,
    Mail,
} from "lucide-react";
import Select from "../../components/modern/select.tsx";
import {useFilters} from "../../hooks/useFilters.tsx";
import {useFilteredComments} from "../../hooks/useFilteredComments.tsx";
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
            <div className={'flex-1 items-center justify-center flex'}>
                <div
                    className={'glass max-w-md text-center items-center w-full mx-auto p-4 flex flex-col gap-6 py-6'}>
                    <h1 className={'text-3xl font-bold text-foreground'}>
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
            </div>
        </PageWrapper>
    )
}


const DashboardContent: FC<{ comments: CommentType[] }> = ({comments}) => {
    const [layout, setLayout] = useState<'grid' | 'list'>('grid');
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

            <DashboardFilterBar layout={layout} setLayout={setLayout}/>
            {
                layout === 'grid' ? <GridLayout comments={comments}/> : <ListLayout comments={paginatedComments}>
                    <Pagination {...{
                        page, setPage, commentsPerPage, setCommentsPerPage, totalPages, start, end, totalItems
                    }}/> </ListLayout>
            }

        </PageWrapper>
    )
}

const DashboardFilterBar: FC<{
    layout: 'grid' | 'list',
    setLayout: Dispatch<SetStateAction<"grid" | "list">>
}> = ({layout, setLayout}) => {

    const {searchQuery, setSearchQuery, sortBy, cycleSort} = useFilters();

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="sm:ml-auto w-full sm:max-w-md relative">
                <input
                    className="glass w-full p-3 px-4 text-sm font-normal rounded-xl pr-6 focus:outline-none"
                    placeholder="Search by email or name"
                    autoComplete={"off"}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                {
                    searchQuery.length ?
                        <X className="size-5 absolute right-4 cursor-pointer hover:text-foreground text-muted top-1/2 -translate-y-1/2"
                           onClick={() => {
                               setSearchQuery('')
                           }}/> :
                        <Search
                            className="size-5 absolute right-4 text-muted pointer-events-none top-1/2 -translate-y-1/2"/>
                }
            </div>
            <div className={'flex justify-between flex-col sm:flex-row sm:items-center gap-4 w-full'}>
                <div className="flex flex-wrap gap-2">
                    {['postId', 'name', 'email'].map(field => (
                        <Button
                            key={field}
                            variant="outline"
                            className={`flex items-center gap-2 ${sortBy.field === field ? 'text-foreground' : 'text-muted'}`}
                            onClick={() => cycleSort(field)}
                        >
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                            <span className="flex">
                              <ArrowUp
                                  className={`size-4 transition ${
                                      sortBy.field === field && sortBy.order === 'asc' ? 'text-foreground' : 'text-muted'
                                  }`}
                              />
                              <ArrowDown
                                  className={`size-4 transition ${
                                      sortBy.field === field && sortBy.order === 'desc' ? 'text-foreground' : 'text-muted'
                                  }`}
                              />
                        </span>
                        </Button>
                    ))}
                </div>
                <div className={'flex gap-2 ml-auto'}>
                    <Button onClick={() => setLayout('grid')}>
                        <LayoutGrid
                            className={`transition size-5 ${layout === 'grid' ? 'text-foreground' : 'text-muted'}`}/>
                    </Button>
                    <Button onClick={() => setLayout('list')}>
                        <LayoutList
                            className={`transition size-5 ${layout === 'list' ? 'text-foreground' : 'text-muted'}`}/>
                    </Button>
                </div>
            </div>
        </div>
    );
};


const GridLayout: FC<{ comments: CommentType[] }> = ({comments}) => {
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
        <div className={'flex flex-col gap-10 flex-1'}>
            <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1'}>
                {paginatedComments.map((comment) => (
                    <div key={comment.id} className={'glass p-4 rounded-lg shadow-md flex flex-col h-full'}>
                        <h3 className={'text-lg font-semibold'}>{comment.name}</h3>
                        <p className={'text-sm text-muted flex items-center gap-1'}><Mail
                            className={'size-4'}/>{comment.email}</p>
                        <p className={'mt-2 text-sm my-6 overflow-hidden text-ellipsis line-clamp-3 w-full h-15'}
                           title={comment.body}>
                            {comment.body}
                        </p>
                        <span className={'mt-auto ml-auto text-muted'}>PostID:{comment.postId}</span>
                    </div>
                ))}
            </div>

            <Pagination {...{
                page, setPage, commentsPerPage, setCommentsPerPage, totalPages, start, end, totalItems
            }}/>
        </div>
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
            <span className={'select-none text-muted'}>{start + 1} to {end} of {totalItems} items</span>
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

export default Dashboard;