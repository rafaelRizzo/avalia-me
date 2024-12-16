import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";

const useAvaliacao = (uuid, router) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isVerify, setIsVerify] = useState(true);
    const [gridClass, setGridClass] = useState("grid-cols-1");
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
            await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/validate/${uuid}`);
            setIsVerify(false);
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
    }, [uuid, router]);

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

    const handleSubmit = useCallback(async () => {
        try {
            const { data: { ip } } = await axios.get("https://api.ipify.org?format=json");
            if (!ip) throw new Error("IP não encontrado");
            const payload = {
                nota_atendimento: answers[0],
                nota_empresa: answers[1],
                ip_client: ip,
                obs: observacao,
            };
            await axios.put(`${process.env.NEXT_PUBLIC_URL_API}/avaliacao/${uuid}`, payload);
            router.push("/agradecimento");
        } catch (error) {
            console.error(error);
            toast.error("Erro ao enviar sua avaliação. Tente novamente mais tarde.");
        }
    }, [answers, observacao, router, uuid]);

    useEffect(() => {
        if (!isVerify) loadQuestions();
    }, [isVerify, loadQuestions]);

    useEffect(() => {
        verifyUUID();
    }, [verifyUUID]);

    useEffect(() => {
        setGridClass(
            currentQuestion === 0 ? "grid-cols-2" : currentQuestion === 3 ? "grid-cols-1" : "lg:grid-cols-5"
        );
    }, [currentQuestion]);

    return {
        questions,
        currentQuestion,
        isVerify,
        progress: ((currentQuestion + 1) / questions.length) * 100,
        gridClass,
        question: questions[currentQuestion],
        handleAnswer,
        handleSubmit,
        setObservacao,
    };
};

export default useAvaliacao;
