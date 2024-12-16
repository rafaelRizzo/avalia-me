"use client";

import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import GridAvaliacao from "@/components/GridAvaliacao";
import CardAvaliacao from "@/components/GridAvaliacao/CardAvaliacao";
import axios from "axios";
import { toast } from "sonner";

export default function Home() {
    const router = useRouter();
    const { uuid } = useParams(); // Obtém o uuid da URL

    const questions = [
        {
            id: 0,
            title: "Conseguiu resolver o seu problema?",
            subtitle: "Sua opinião é importante!",
            answers: [
                { value: false, label: "Não resolveu", imgSrc: "/avaliations/not-resolved.webp", alt: "Emoji polegar para baixo" },
                { value: true, label: "Resolveu", imgSrc: "/avaliations/resolved.webp", alt: "Emoji polegar para cima" },
            ],
        },
        {
            id: 1,
            title: "Qual o seu nível de satisfação com o atendimento prestado?",
            subtitle: "Sobre o atendente!",
            answers: [
                { value: 1, label: "Insatisfeito", imgSrc: "/avaliations/1.webp", alt: "Emoji insatisfeito" },
                { value: 2, label: "Pouco satisfeito", imgSrc: "/avaliations/2.webp", alt: "Emoji pouco satisfeito" },
                { value: 3, label: "Neutro", imgSrc: "/avaliations/3.webp", alt: "Emoji neutro" },
                { value: 4, label: "Satisfeito", imgSrc: "/avaliations/4.webp", alt: "Emoji satisfeito" },
                { value: 5, label: "Muito satisfeito", imgSrc: "/avaliations/5.webp", alt: "Emoji muito satisfeito" },
            ],
        },
        {
            id: 2,
            title: "Você está satisfeito com os serviços prestados pela empresa?",
            subtitle: "Sobre a empresa!",
            answers: [
                { value: 1, label: "Insatisfeito", imgSrc: "/avaliations/1.webp", alt: "Emoji insatisfeito" },
                { value: 2, label: "Pouco satisfeito", imgSrc: "/avaliations/2.webp", alt: "Emoji pouco satisfeito" },
                { value: 3, label: "Neutro", imgSrc: "/avaliations/3.webp", alt: "Emoji neutro" },
                { value: 4, label: "Satisfeito", imgSrc: "/avaliations/4.webp", alt: "Emoji satisfeito" },
                { value: 5, label: "Muito satisfeito", imgSrc: "/avaliations/5.webp", alt: "Emoji muito satisfeito" },
            ],
        },
        {
            id: 3,
            title: "Tem algo a nos dizer?",
            subtitle: "Sua opinião é importante!",
            answers: [], // Pergunta sem opções de resposta
        },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0); // Controle das perguntas
    const [answers, setAnswers] = useState([]); // Armazena as respostas
    const [isLastStep, setIsLastStep] = useState(false);
    const [isVerify, setIsVerify] = useState(true);
    const [gridClass, setGridClass] = useState("grid-cols-1");
    const [observacao, setObservacao] = useState(""); // Para capturar o valor do textarea
    const [ipClient, setIpClient] = useState(null);

    const question = questions[currentQuestion]; // Pergunta atual
    const progress = ((currentQuestion + 1) / questions.length) * 100; // Cálculo do progresso

    const handleAnswer = (answer) => {
        setAnswers((prevAnswers) => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[currentQuestion] = answer; // Atualiza a resposta da pergunta atual
            return updatedAnswers;
        });
        if (currentQuestion === questions.length - 1) {
            setIsLastStep(true); // Última pergunta
        } else {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handleSubmit = async () => {
        // Fazendo a requisição para pegar o IP
        await axios.get('https://api.ipify.org?format=json')
            .then(response => {
                setIpClient(response.data.ip); // Armazena o IP do cliente
            })
            .catch(error => {
                console.error("Erro ao pegar o IP: ", error);
            });

        if (!ipClient) {
            toast.error("Não foi possivel identificar o seu ip, por esse motivo sua avaliação não foi enviada!");
        } else {
            if (answers) {
                // Monta o payload com base nas respostas
                const payload = {
                    nota_atendimento: answers[0], // Resposta da primeira pergunta
                    nota_empresa: answers[1], // Resposta da segunda pergunta
                    ip_client: ipClient,
                    obs: observacao, // Observação do usuário no textarea
                };

                try {
                    const response = await axios.put(`${process.env.NEXT_PUBLIC_URL_API}/avaliacao/${uuid}`, payload);
                    console.log(response.data);
                    router.push("/agradecimento");
                } catch (error) {
                    console.error(error);
                }
            }
        }

    };

    useEffect(() => {
        const verifyUUID = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/validate/${uuid}`);
                console.log(response.data);
                setIsVerify(false);
            } catch (error) {
                console.error(error.response.data.message || error);

                // Possiveis retornos do back:
                // Avaliação não encontrada
                // UUID avaliado
                // UUID expirado
                // JWT inválido
                // JWT expirado
                // JWT expirado ou inválido
                // fazendo um if para validar cada retorno

                const message = error.response.data.message || error;

                switch (message) {
                    case 'Avaliação não encontrada':
                        console.log("Avaliação não encontrada.");
                        router.push("/inexistente");
                        break;
                    case 'UUID avaliado':
                        console.log("UUID já foi avaliado.");
                        router.push("/expirado");
                        break;
                    case 'UUID expirado':
                        console.log("UUID expirado.");
                        router.push("/expirado");
                        break;
                    case 'JWT inválido':
                        console.log("JWT inválido.");
                        router.push("/expirado");
                        break;
                    case 'JWT expirado':
                        console.log("JWT expirado.");
                        router.push("/expirado");
                        break;
                    case 'JWT expirado ou inválido':
                        console.log("Token expirado ou inválido.");
                        router.push("/expirado");
                        break;
                    default:
                        console.log("Erro desconhecido:", message);
                        router.push("/error/404");
                        break;
                }
            }
        };

        verifyUUID();
    }, [uuid]);

    useEffect(() => {
        if (currentQuestion === 0) {
            setGridClass("grid-cols-2"); // Para a primeira pergunta
        } else if (currentQuestion === 3) {
            setGridClass("grid-cols-1"); // Para a última pergunta
        } else {
            setGridClass("lg:grid-cols-5"); // Para as outras perguntas
        }
    }, [currentQuestion]);

    return (
        <>
            {isVerify ? (
                <div className="flex flex-col min-h-screen items-center justify-center text-center">
                    <div className="border min-w-8 min-h-8 rounded-full border-t-zinc-200 border-l-green-500 border-r-green-500 border-b-green-500 animate-spin"></div>
                    <span>Carregando sua avaliação...</span>
                </div>
            ) : (
                <div className="flex flex-col min-h-screen max-w-4xl mx-auto p-5">
                    <div className="flex flex-col flex-1">
                        <div className="h-[50px] flex flex-col justify-center">
                            <span className="text-sm font-light text-zinc-500 text-right">
                                {currentQuestion + 1} de {questions.length}
                            </span>
                            <Progress value={progress} className="w-full bg-green-100 [&>div]:bg-green-500 my-2" />
                        </div>

                        <GridAvaliacao key={question.id} title={question.title} subtitle={question.subtitle}>
                            <div className={`grid ${gridClass} gap-2 mb-2`}>
                                {question.answers.length > 0 ? (
                                    question.answers.map((answer, index) => (
                                        <CardAvaliacao
                                            key={answer.label || index}
                                            data={answer}
                                            questions={questions}
                                            onClick={() => handleAnswer(answer.value)}
                                        >
                                            <img
                                                src={answer.imgSrc}
                                                alt={answer.alt}
                                                width={80}
                                                height={80}
                                                className="transition-transform duration-300 group-hover:scale-110"
                                            />
                                        </CardAvaliacao>
                                    ))
                                ) : (
                                    <div className="col-span-full">
                                        <textarea
                                            placeholder="Digite aqui se gostaria de deixar alguma sugestão ou reclamação... (opcional)"
                                            maxLength={1000}
                                            className="min-h-32 border rounded-lg p-2 px-3 focus:border-green-500 focus-visible:border-green-500 focus:outline-none focus:ring-0 outline-none w-full"
                                            onChange={(e) => setObservacao(e.target.value)}
                                        />
                                        <Button
                                            className="bg-green-600 hover:bg-green-700 mt-5 text font-semibold text-white"
                                            onClick={handleSubmit}
                                        >
                                            Enviar avaliação
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </GridAvaliacao>
                    </div>
                </div>
            )}
        </>
    );
}
