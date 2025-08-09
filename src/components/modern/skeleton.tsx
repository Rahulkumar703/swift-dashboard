import type {FC} from "react";

const Skeleton: FC<{ className: string }> = ({className}) => {
    return (
        <div className={`glass animate-pulse ${className || ''}`}/>
    );
}

export default Skeleton;