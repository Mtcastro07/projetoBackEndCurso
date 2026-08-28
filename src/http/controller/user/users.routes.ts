import type { FastifyInstance } from 'fastify'
import { register } from './register.controller.js'

export async function usersRoutes(app: FastifyInstance) {
  // O caminho e '/' de proposito: o prefixo '/users' vem do register() em routes.ts,
  // entao a rota efetiva e `POST /users`.
  app.post('/', register)
}
