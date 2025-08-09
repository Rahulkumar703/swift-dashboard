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
        'glass cursor-pointer p-2 px-3 min-w-8 min-h-8 rounded-lg transition-all duration-200 focus:outline-none';

    const variantStyle = disabled
        ? 'opacity-50 cursor-not-allowed'
        : variant === 'primary'
            ? 'bg-primary text-foreground hover:bg-primary/90'
            : variant === 'secondary'
                ? 'bg-secondary text-foreground hover:bg-secondary/90'
                : variant === 'outline'
                    ? 'border border-accent text-foreground'
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
