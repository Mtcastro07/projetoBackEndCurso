import type { FastifyInstance } from 'fastify'
import { usersRoutes } from './user/users.routes.js'

// Junta todas as rotas da aplicacao em um unico ponto
export async function routes(app: FastifyInstance) {
  // ERRO: `usersRoutes` era registrado sem prefixo. Como o arquivo
  // `users.routes.ts` declara os handlers em '/', a rota final ficava em
  // `POST /` e uma chamada a `POST /users` (usada no endpoint.rest) retornava 404.
  // CORRECAO: registrar o plugin sob o prefixo '/users'.
  app.register(usersRoutes, { prefix: '/users' })
}
