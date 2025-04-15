#!/bin/bash

# Nome do container
CONTAINER_NAME="frontend-avaliacao"

# Nome da imagem
IMAGE_NAME="frontend-avaliacao"

# Atualiza o repositório
echo "Atualizando código do repositório..."
git pull

# Faz o build da nova imagem
echo "Buildando nova imagem..."
docker build -t $IMAGE_NAME .

# Para e remove o container antigo (se ele existir)
echo "Parando e removendo o container antigo..."
docker stop $CONTAINER_NAME || true
docker rm $CONTAINER_NAME || true

# Sobe o novo container com a nova imagem
echo "Subindo novo container..."
docker run -d --restart always -p 3102:3102 --name $CONTAINER_NAME $IMAGE_NAME

echo "Deploy concluído!"
