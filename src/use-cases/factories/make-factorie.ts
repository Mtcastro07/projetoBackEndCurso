import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repositories.js'
import { RegisterUserUseCase } from '../users/register.js'

export function makeRegisterUseCase() {
  const userRepository = new PrismaUsersRepository()
  const registerUserUseCase = new RegisterUserUseCase(userRepository)

  return registerUserUseCase
}
