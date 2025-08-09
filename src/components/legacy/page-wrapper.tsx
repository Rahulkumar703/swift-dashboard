import {type FC, type ReactNode} from 'react';

const PageWrapper: FC<{ children: ReactNode, className?:string }> = ({children,className}) => {
    return (
        <div className={`w-full flex h-[calc(100vh-80px)] ${className || ''}`}>
            <div className={'max-w-6xl w-full mx-auto p-4 flex flex-col gap-6'}>
                {children}
            </div>
        </div>
    );
}

export default PageWrapper;