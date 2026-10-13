import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
});

export type Env = z.infer<typeof envSchema>;

let env: Env;

try {
  env = envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    const messages = error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join("; ");
    console.error("Invalid environment configuration:", messages);
    process.exit(1);
  }
  throw error;
}

export { env };