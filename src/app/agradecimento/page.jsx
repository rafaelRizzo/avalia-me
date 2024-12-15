import Image from "next/image";
import Link from "next/link";

export default function Agradecimento() {
    return (
        <section className="agradecimento flex flex-col items-center justify-center min-h-screen p-5 relative text-center selection:bg-green-400">

            <h1 className="text-4xl font-bold text-green-950">Obrigado pelo seu feedback!</h1>
            <p className="text-green-800 text-sm">Agradecemos por dedicar seu tempo para nos ajudar a melhorar.</p>

            <div className="flex items-center mt-2 min-h-[420px] max-h-[420px] min-w-[200px] max-w-[200px]">
                <Image src={"/crongats/woman.svg"} width={200} height={500} alt="Pessoa feliz sorrindo para frente, simbolizando que o feedback foi enviado com sucesso." />
            </div>

            <footer className="text-muted-foreground text-xs absolute bottom-1 left-1">
                <span className="text-green-700">
                    &copy; 2024 - Powered <Link href={"https://www.linkedin.com/in/rafael-rizzo-breschi-b02547216/"} target="_blank">Rafael Rizzo</Link>
                </span>
            </footer>
        </section>

    )
}