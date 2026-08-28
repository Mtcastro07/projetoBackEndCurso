import fastify from 'fastify'
import { routes } from './http/controller/routes.js'
import { ZodError } from 'zod'

export const app = fastify()

// Registra todas as rotas da aplicacao
app.register(routes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'validation error',
      issues: error.format(),
    })
  }
})
