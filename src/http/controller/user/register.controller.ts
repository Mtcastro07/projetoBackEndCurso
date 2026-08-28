import z from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'

import { RegisterUserUseCase } from '@/use-cases/users/register.js'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repositories.js'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error.js'
import { makeRegisterUseCase } from '@/use-cases/factories/make-factorie.js'
import { UserPresenter } from '../presenters/user-presenter.js'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const registerBodySchema = z.object({
      name: z.string(),
      username: z.string(),
      email: z.email().max(100),
      password: z.string().min(8).regex(/[a-z]/),
    })

    const { name, username, email, password } = registerBodySchema.parse(
      request.body,
    )

    const registerUserUseCase = makeRegisterUseCase()

    const { user } = await registerUserUseCase.execute({
      name,
      username,
      email,
      password,
    })

    return reply.status(201).send(UserPresenter.toHTTP(user))
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
  }
}
