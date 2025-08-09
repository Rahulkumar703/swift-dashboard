import type {FC} from "react";

const Skeleton: FC<{ className: string }> = ({className}) => {
    return (
        <div className={`bg-gray-300 animate-pulse ${className || ''}`}/>
    );
}

export default Skeleton;