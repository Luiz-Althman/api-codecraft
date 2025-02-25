import type { Config } from 'drizzle-kit'
import { env } from './src/env'

export default {
  schema: './src/drizzle/schema/*', // o caminho da pasta onde estão as tabelas
  out: './src/drizzle/migrations', // Os arquivos sql que vão ser gerados pelo drizzle e que serão responsaveis pela criação das tabelas no banco de dados. (migrations)
  dialect: 'postgresql',
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
} satisfies Config
