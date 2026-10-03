import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: {
    // Neon: use the DIRECT (non-pooled) URL for CLI commands like db push / migrate.
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "",
  },
});
