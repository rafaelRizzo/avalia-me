"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Inexistente() {
  const [randomImage, setRandomImage] = useState("");

  useEffect(() => {
    // Lista de imagens disponíveis
    const images = [
      "/404/cat.svg",
      "/404/dinosaur.svg",
      "/404/dragon.svg",
      "/404/lion.svg",
      "/404/mammoth.svg",
      "/404/robot.svg",
      "/404/troll.svg",
      "/404/witch.svg"
    ];

    // Seleciona uma imagem aleatória
    const random = images[Math.floor(Math.random() * images.length)];
    setRandomImage(random);
  }, []); // Executa apenas uma vez no carregamento

  return (
    <div className="flex items-center justify-center min-h-screen p-5">

      <div className="min-h-[250px] max-h-[250px] min-w-[250px] max-w-[250px] flex flex-col items-center justify-center">

        {randomImage && (
          <Image
            src={randomImage}
            alt="Not Found"
            width="250"
            height="250"
          />
        )}

        <h1>Ops! Avaliação não encontrada</h1>
        <p className="text-muted-foreground text-xs text-center">
          Geralmente isso ocorre por conta que a avaliação que você entrou já expirou ou já foi avaliada, o tempo de uma avaliação é de até 24 horas!
        </p>

      </div>
    </div>
  );
}
