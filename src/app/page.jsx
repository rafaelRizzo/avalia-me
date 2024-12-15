"use client";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import GridAvaliacao from "@/components/GridAvaliacao";
import CardAvaliacao from "@/components/GridAvaliacao/CardAvaliacao";
import { useQuestion, QuestionProvider } from "../context/QuestionContext.js";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { userAgentFromString } from "next/server.js";

// Wrapper para QuestionProvider
function App() {
  return (
    <QuestionProvider>
      <Home />
    </QuestionProvider>
  );
}

function Home() {
  const cookie = new Cookies();
  const [validUUID, setValidUUID] = useState(false);

  useEffect(() => {
    const uuid_cookie = cookie.get('uuid')

    if (!uuid_cookie) {
      router.push('/inexistente')
    } else {
      setValidUUID(true);
    }

  }, [])

  const router = useRouter();

  const polegar = [
    { resolvido: false, label: "Não resolveu", imgSrc: "/avaliations/not-resolved.webp", alt: "Emoji polegar para baixo, não resolvido" },
    { resolvido: true, label: "Resolveu", imgSrc: "/avaliations/resolved.webp", alt: "Emoji polegar para cima, resolvido" },
  ];

  const avaliacoes = [
    { nota: 1, label: "Insatisfeito", imgSrc: "/avaliations/1.webp", alt: "Emoji insatisfeito" },
    { nota: 2, label: "Pouco satisfeito", imgSrc: "/avaliations/2.webp", alt: "Emoji pouco satisfeito" },
    { nota: 3, label: "Neutro", imgSrc: "/avaliations/3.webp", alt: "Emoji neutro" },
    { nota: 4, label: "Satisfeito", imgSrc: "/avaliations/4.webp", alt: "Emoji satisfeito" },
    { nota: 5, label: "Muito satisfeito", imgSrc: "/avaliations/5.webp", alt: "Emoji muito satisfeito" },
  ];

  const { currentQuestion, nextQuestion, setAnswer, answers } = useQuestion();

  const progress = (currentQuestion + 1) * 25;

  const handleCardClick = (answer) => {
    setAnswer(answer);
    nextQuestion();
  };

  const handleTextareaChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleFinalSubmit = () => {
    console.log("Respostas selecionadas: " + JSON.stringify(answers));
    router.push("/agradecimento");
  };

  return (
    <>
      {validUUID &&
        (
          <div className="flex flex-col min-h-screen max-w-4xl mx-auto p-5 selection:bg-green-400">
            <div className="flex flex-col flex-1">
              <div className="h-[50px] flex flex-col justify-center">
                <span className="text-sm font-light text-zinc-500 text-right">
                  {currentQuestion + 1} de 4
                </span>
                <Progress value={progress} className="w-full bg-green-100 [&>div]:bg-green-500 my-2" />
              </div>

              {currentQuestion === 0 && (
                <GridAvaliacao
                  key="question-0"
                  title="Conseguiu resolver o seu problema?"
                  subtitle="Sua opinião é importante!"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-2">
                    {polegar.map((item) => (
                      <CardAvaliacao data={item} key={item.label} onClick={() => handleCardClick(item.resolvido)}>
                        <Image
                          src={item.imgSrc}
                          alt={`${item.alt}`}
                          width={80}
                          height={80}
                          className="transition-transform duration-300 group-hover:scale-110"
                        />
                      </CardAvaliacao>
                    ))}
                  </div>
                </GridAvaliacao>
              )}

              {currentQuestion === 1 && (
                <GridAvaliacao
                  key="question-1"
                  title="Qual o seu nível de satisfação com o atendimento prestado?"
                  subtitle="Sobre o atendente!"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 mb-2">
                    {avaliacoes.map((item, index) => (
                      <CardAvaliacao
                        data={item}
                        key={item.label}
                        onClick={() => handleCardClick(item.nota)}
                        className={`lg:order-${index} order-${4 - index}`}
                      >
                        <Image
                          src={item.imgSrc}
                          alt={`${item.alt}`}
                          width={80}
                          height={80}
                          className="transition-transform duration-300 group-hover:scale-110"
                        />
                      </CardAvaliacao>
                    ))}
                  </div>
                </GridAvaliacao>
              )}

              {currentQuestion === 2 && (
                <GridAvaliacao
                  key="question-2"
                  title="Você está satisfeito com os serviços prestados pela empresa?"
                  subtitle="Sobre a empresa!"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 mb-2">
                    {avaliacoes.map((item, index) => (
                      <CardAvaliacao
                        data={item}
                        key={item.label}
                        onClick={() => handleCardClick(item.nota)}
                        className={`lg:order-${index} order-${4 - index}`}
                      >
                        <Image
                          src={item.imgSrc}
                          alt={`${item.alt}`}
                          width={80}
                          height={80}
                          className="transition-transform duration-300 group-hover:scale-110"
                        />
                      </CardAvaliacao>
                    ))}
                  </div>
                </GridAvaliacao>
              )}

              {currentQuestion === 3 && (
                <GridAvaliacao
                  key="question-3"
                  title="Tem algo a nos dizer?"
                  subtitle="Sua opinião é importante!"
                >
                  <textarea
                    placeholder="Digite aqui se gostaria de deixar alguma sugestão ou reclamação... (opcional)"
                    maxLength={1000}
                    className="min-h-32 border rounded-lg p-2 px-3 focus:border-green-500 focus-visible:border-green-500 focus:outline-none focus:ring-0 outline-none"
                    onChange={handleTextareaChange}
                  />
                  <Button
                    className="bg-green-600 hover:bg-green-700 mt-5 text font-semibold text-white"
                    onClick={handleFinalSubmit}
                  >
                    Enviar avaliação
                  </Button>
                </GridAvaliacao>
              )}
            </div>
          </div>
        )}
    </>

  );
}

export default App;
