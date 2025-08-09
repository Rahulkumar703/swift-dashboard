import type {FC, ReactNode} from "react";
import type {CommentType} from "../../types";

export const ListLayout: FC<{ comments: CommentType[], children: ReactNode }> = ({comments, children}) => {

    return (
        <div className={'flex flex-col gap-10 flex-1'}>
            <div className="glass overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead className="bg-accent/40 backdrop-blur-2xl">
                    <tr>
                        <th className="p-4 text-left text-sm font-semibold whitespace-nowrap">Post ID</th>
                        <th className="p-4 text-left text-sm font-semibold whitespace-nowrap">Name</th>
                        <th className="p-4 text-left text-sm font-semibold whitespace-nowrap">Email</th>
                        <th className="p-4 text-left text-sm font-semibold whitespace-nowrap">Comment</th>
                    </tr>
                    </thead>
                    <tbody>
                    {comments.length ? comments.map((comment, index) => (
                            <tr
                                key={comment.id}
                                className={`border-t border-accent/30 ${
                                    index % 2 === 0 ? 'backdrop-blur-2xl' : ''
                                }`}
                            >
                                <td className="p-4 text-sm whitespace-nowrap">{comment.postId}</td>
                                <td className="p-4 text-sm">{comment.name}</td>
                                <td className="p-4 text-sm">{comment.email}</td>
                                <td className="p-4 text-sm" title={comment.body}>
                                    {comment.body.length > 50 ? comment.body.slice(0, 50) + '...' : comment.body}
                                </td>
                            </tr>
                        )) :
                        <tr>
                            <td colSpan={4} className="p-4 text-center text-sm text-red-500">
                                No comments found
                            </td>
                        </tr>
                    }
                    </tbody>
                </table>
            </div>
            {children}
        </div>)
}

