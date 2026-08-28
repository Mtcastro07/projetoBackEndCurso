import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { env } from '@/env/index.js'

// Pool de conexoes do Postgres usando a URL do .env
const pool = new Pool({ connectionString: env.DATABASE_URL })

// Adapter que liga o Prisma ao driver "pg" (nesta versao o PrismaPg espera o Pool)
const adapter = new PrismaPg(pool)

// Cliente unico do Prisma usado em toda a aplicacao
export const prisma = new PrismaClient({
  adapter,
  log: env.NODE_ENV === 'development' ? ['query', 'info'] : [],
})
