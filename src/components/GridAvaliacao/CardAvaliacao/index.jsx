
export default function CardAvaliacao({ data, children, onClick, className = "" }) {
    return (
        <div
            data-teste={data?.resolvido}
            className={`group flex flex-col items-center justify-center bg-zinc-100/70 rounded-lg p-5 transition-all cursor-pointer min-h-[155px] max-h-[155px] border-2 border-transparent hover:border-green-500 ${className}`}
            onClick={() => onClick(data)}
        >
            {children}
            <span className="mt-2 text-sm">{data?.label}</span>
        </div>
    );
}