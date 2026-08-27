import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from './libs/prisma.js'

export const app = fastify()

app.post('/users', async (request, reply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    username: z.string(),
    email: z.email().max(100),
    password: z.string().min(8).regex(/[a-z]/),
  })

  const { name, username, email, password } = registerBodySchema.parse(
    request.body,
  )

  const user = await prisma.user.create({
    data: {
      name,
      username,
      email,
      passwordHash: password,
    },
  })
  return reply.status(201).send(user)
})
