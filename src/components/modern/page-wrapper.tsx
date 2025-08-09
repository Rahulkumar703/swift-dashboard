import {type FC, type ReactNode} from 'react';
import bg from '../../assets/bg.jpg';
const PageWrapper: FC<{ children: ReactNode, className?:string }> = ({children,className}) => {
    return (
        <div style={{ backgroundImage: `url(${bg})` }} className={`w-full flex min-h-screen bg-cover bg-fixed ${className || ''}`}>
            <div className={'glassmorphism max-w-6xl w-full mx-auto p-4 flex flex-col gap-6 pt-24'}>
                {children}
            </div>
        </div>
    );
}

export default PageWrapper;