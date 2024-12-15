export default function GridAvaliacao({ title, subtitle, children }) {
    return (
        <div className="flex-1 flex flex-col justify-center opacity-0 translate-y-5 grid-section-effect transition-all">
            {/* Subtítulo */}
            <h3 className="text-muted-foreground text-sm">{subtitle}</h3>

            {/* Título principal */}
            <h2 className="font-medium text-xl mb-5">
                {title}
            </h2>

            {/* Avaliações dinâmicas */}
            {children}
        </div>

    )
}