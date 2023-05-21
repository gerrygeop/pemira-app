export default function Select({ children, className, ...props }) {
    return (
        <select
            {...props}
            className={`focus:bg-slate-50 border-slate-300 focus:border-slate-500 focus:ring-slate-500 rounded-md shadow-sm
            ${className}
        `}
        >
            {children}
        </select>
    );
}
