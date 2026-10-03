import "server-only";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/generated/prisma/client";

/**
 * One PrismaClient per server process.
 * In dev, Next.js hot-reloads modules, so we keep the instance on globalThis
 * to avoid opening a new connection pool on every save.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.warn("⚠️ DATABASE_URL environment variable is missing. Please configure DATABASE_URL in .env");
  }
  // Neon serverless driver adapter: works over HTTP/WebSocket, ideal for serverless hosts.
  const adapter = new PrismaNeon({ connectionString: connectionString ?? "" });
  return new PrismaClient({ adapter });
}

export const db = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
