import type { FC, SelectHTMLAttributes } from "react";

type PropsType = SelectHTMLAttributes<HTMLSelectElement> & {
    variant?: 'outline' | 'primary' | 'secondary' | 'ghost';
};

const Select: FC<PropsType> = ({
                                   children,
                                   className,
                                   variant = 'outline',
                                   disabled,
                                   ...props
                               }) => {
    const baseStyle =
        'glass cursor-pointer p-2 min-h-8 transition-all duration-200 focus:outline-none';

    const variantStyle = disabled
        ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-500'
        : variant === 'primary'
            ? 'bg-primary text-white hover:bg-primary/90'
            : variant === 'secondary'
                ? 'bg-secondary text-white hover:bg-secondary/90'
                : variant === 'outline'
                    ? 'border border-accent text-foreground hover:bg-accent/30'
                    : 'hover:bg-accent/30';

    return (
        <select
            className={`${baseStyle} ${variantStyle} ${className || ''}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </select>
    );
};

export default Select;
