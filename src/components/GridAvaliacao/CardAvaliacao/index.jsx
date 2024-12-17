import { toast } from "sonner";

export default function CardAvaliacao({ data, children, onClick }) {
    // Função para alterar a cor do card de acordo com o label
    const handlerColorCard = (label) => {
        if (label) {
            if (label === "Não resolveu") {
                return "bg-red-500 text-zinc-50 hover:border-red-600";
            } else if (label === "Resolveu") {
                return "bg-green-500 text-zinc-50 hover:border-green-600";
            } else {
                return "bg-zinc-100/70"
            }
        } else {
            toast.error("Erro ao validar avaliação")
        }

    }
    return (
        <div
            data-teste={data?.resolvido}
            className={`group flex flex-col items-center justify-center  rounded-lg p-5 transition-all cursor-pointer min-h-[155px] max-h-[155px] border-2 border-transparent hover:border-green-500  ${handlerColorCard(data.label)}`}
            onClick={() => onClick(data)}
        >
            {children}
            <span className="mt-2 text-sm">{data?.label}</span>
        </div>
    );
}