"use client";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import GridAvaliacao from "@/components/GridAvaliacao";
import CardAvaliacao from "@/components/GridAvaliacao/CardAvaliacao";
import useAvaliacao from "@/hooks/use-avaliacao";

export default function Home() {
    const { uuid } = useParams();
    const router = useRouter();

    const {
        questions,
        currentQuestion,
        isVerify,
        progress,
        question,
        handleAnswer,
        handleSubmit,
        setObservacao,
    } = useAvaliacao(uuid, router);

    if (isVerify) {
        return (
            <div className="flex flex-col min-h-screen items-center justify-center text-center">
                <div className="border min-w-8 min-h-8 rounded-full border-t-zinc-200 border-l-green-500 border-r-green-500 border-b-green-500 animate-spin"></div>
                <span>Carregando sua avaliação...</span>
            </div>
        );
    }

    // Calculando a gridClass no page.jsx
    const gridClass = (() => {
        switch (currentQuestion) {
            case 0:
                return "grid-cols-1 lg:grid-cols-2";
            case questions.length - 1:
                return "grid-cols-1";
            default:
                return "lg:grid-cols-5";
        }
    })();

    return (
        <div className="flex flex-col min-h-screen max-w-4xl mx-auto p-5">
            <div className="flex flex-col flex-1">
                <div className="h-[50px] flex flex-col justify-center">
                    <span className="text-sm font-light text-zinc-500 text-right">
                        {questions.length > 0 && `${currentQuestion + 1} de ${questions.length}`}
                    </span>
                    {questions.length > 0 && (
                        <Progress value={progress} className="w-full bg-green-100 [&>div]:bg-green-500 my-2" />
                    )}
                </div>
                <GridAvaliacao key={question?.id} title={question?.title} subtitle={question?.subtitle}>
                    <div className={`grid ${gridClass} gap-2 mb-2`}>
                        {question?.answers?.length > 0 ? (
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
                                        className={`transition-transform duration-300 group-hover:scale-110`}
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
    );
}
