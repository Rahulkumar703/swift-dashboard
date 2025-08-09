import {type FC, type InputHTMLAttributes} from 'react';

type PropType = InputHTMLAttributes<HTMLInputElement> & {
    label:string
}

const Input :FC<PropType> = ({label,...props})=> {
    return (
        <div className={'flex flex-col gap-2 w-inherit'}>
            <label className={'text-foreground/80'}>{label}</label>
            <input {...props} className={'p-3 px-4 text-sm font-normal rounded-xl backdrop-blur-xl shadow-md'}/>
        </div>
    );
}

export default Input;