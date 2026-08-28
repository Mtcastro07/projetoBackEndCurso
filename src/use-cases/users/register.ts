import type { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { env } from '../../env/index.js'
import type { UsersRepositories } from '../../repositories/users-repositories.js'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error.js'

interface RegisterUserUseCaseRequest {
  name: string
  username: string
  email: string
  password: string
}

type RegisterUserUseCaseResponse = {
  user: User
}

export class RegisterUserUseCase {
  // PROBLEMA: o use-case falava direto com o `prisma`, e o controller o
  // instanciava com `new RegisterUserUseCase()` (sem argumento). Agora ele
  // recebe a abstracao `UsersRepositories` pelo construtor (injecao de
  // dependencia): o `prisma` fica isolado na camada de repositorio e o
  // use-case passa a ser testavel com um repositorio em memoria.
  constructor(private usersRepository: UsersRepositories) {}

  async execute({
    username,
    email,
    password,
    name,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameEmailOrUsername =
      await this.usersRepository.findByEmailOrUsername(email, username)

    if (userWithSameEmailOrUsername) {
      throw new UserAlreadyExistsError()
    }

    const passwordHash = await hash(password, env.HASH_SALT_ROUNDS)

    const user = await this.usersRepository.create({
      name,
      username,
      email,
      passwordHash,
    })

    return { user }
  }
}
