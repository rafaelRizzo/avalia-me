import winston from "winston";

// Configuração do logger
export const logger = winston.createLogger({
  level: "info", // Nível de log padrão
  format: winston.format.json(), // Formato de log
  defaultMeta: { service: "avaliacao-service" }, // Metadata para os logs
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }), // Logs de erro
    new winston.transports.File({ filename: "combined.log" }), // Logs gerais
  ],
});

// Se não for em produção, adicionar o transporte para o console
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(), // Formato simples no console
    })
  );
}
