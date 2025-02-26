import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333), // estou convertendo para numero, porque o env por padrão é em string
  POSTGRES_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  WEB_URL: z.string().url(),
  OPENAI_API_KEY: z.string(),
})

export const env = envSchema.parse(process.env)

// Estou validando nesse arquivo, se o .env existe a variavel port
