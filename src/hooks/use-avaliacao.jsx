import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";

const useAvaliacao = (uuid, router) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isVerify, setIsVerify] = useState(true);
    const [observacao, setObservacao] = useState("");

    const loadQuestions = useCallback(async () => {
        try {
            const response = await axios.get("/questions.json");
            setQuestions(response.data);
        } catch (error) {
            console.error("Erro ao carregar as perguntas:", error);
            toast.error("Erro ao carregar as perguntas.");
        }
    }, []);

    const verifyUUID = useCallback(async () => {
        try {
            await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/api/validate/${uuid}`);
            setIsVerify(false);
            loadQuestions(); // Carrega as perguntas após a verificação bem-sucedida
        } catch (error) {
            const message = error.response?.data?.message || error;
            const routes = {
                "Avaliação não encontrada": "/inexistente",
                "UUID avaliado": "/expirado",
                "UUID expirado": "/expirado",
                "JWT inválido": "/expirado",
                "JWT expirado": "/expirado",
                "JWT expirado ou inválido": "/expirado",
            };
            router.push(routes[message] || "/error/interno");
        }
    }, [uuid, router, loadQuestions]);

    const handleAnswer = (answer) => {
        setAnswers((prev) => {
            const updated = [...prev];
            updated[currentQuestion] = answer;
            return updated;
        });
        if (currentQuestion === questions.length - 1) {
            setIsLastStep(true);
        } else {
            setCurrentQuestion((prev) => prev + 1);
        }
    };

    useEffect(() => {
        verifyUUID();
    }, [verifyUUID]);

    return {
        answers,
        questions,
        currentQuestion,
        isVerify,
        progress: ((currentQuestion + 1) / questions.length) * 100,
        question: questions[currentQuestion],
        observacao,
        handleAnswer,
        setObservacao,
    };
};

export default useAvaliacao;
