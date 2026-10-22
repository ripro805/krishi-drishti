import { app } from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase, prisma } from "./config/db.js";
import { logger } from "./utils/logger.js";

async function bootstrap() {
  const server = app.listen(env.PORT, () => {
    logger.info(`🌾 KrishiDrishti Backend running on http://localhost:${env.PORT}`);
    logger.info(`📡 API Version 1 endpoints available at http://localhost:${env.PORT}/api/v1`);
    logger.info(`🌱 Environment: ${env.NODE_ENV}`);
  });

  // Attempt database connection
  await connectDatabase();

  // Graceful shutdown handling
  const shutdown = async (signal: string) => {
    logger.info(`Received ${signal}. Gracefully shutting down...`);
    server.close(async () => {
      await prisma.$disconnect();
      logger.info("Database connection closed. Process terminated.");
      process.exit(0);
    });

    // Force shutdown after timeout
    setTimeout(() => {
      logger.error("Forced shutdown due to timeout.");
      process.exit(1);
    }, 10000);
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

bootstrap().catch((err) => {
  logger.error("Failed to start KrishiDrishti backend server:", err);
  process.exit(1);
});
