import type {FC} from "react";

const Avatar:FC<{name:string,className?:string}> = ({name,className}) =>{
    const firstChar = name.charAt(0).toUpperCase();
    const lastChar = name.split(' ')[1]?.charAt(0).toUpperCase() || '';
    return (
        <div className={`glass w-10 h-10 rounded-full text-foreground bg-accent flex items-center justify-center text-lg font-semibold ${className || ''}`}>
            {firstChar}{lastChar}
        </div>
    );
}

export default Avatar;