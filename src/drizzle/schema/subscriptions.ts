import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

// todaas as vezes que eu criar uma tabela nova ou fazer alguma alteração. basta rodar o  npx drizzle-kit generate para gerar os arquivos sql e depois rodar  npx drizzle-kit migration

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
