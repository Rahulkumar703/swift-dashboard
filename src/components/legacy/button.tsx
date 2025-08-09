import type { FC, ButtonHTMLAttributes } from "react";

type PropsType = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'outline' | 'primary' | 'secondary' | 'ghost';
};

const Button: FC<PropsType> = ({
                                   children,
                                   className,
                                   variant = 'primary',
                                   disabled,
                                   ...props
                               }) => {
    const baseStyle =
        'cursor-pointer p-1 px-3 rounded-lg transition-all duration-200 focus:outline-none';

    const variantStyle = disabled
        ? 'opacity-50 cursor-not-allowed'
        : variant === 'primary'
            ? 'bg-primary text-white hover:bg-primary/90'
            : variant === 'secondary'
                ? 'bg-secondary text-white hover:bg-secondary/90'
                : variant === 'outline'
                    ? 'border border-accent text-foreground/50 hover:bg-accent/30'
                    : 'hover:bg-accent/30';

    return (
        <button
            className={`${baseStyle} ${variantStyle} ${className || ''}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
