import type { Prisma, User } from '@prisma/client'

export interface UsersRepositories {
  // `UserCreatedInput` não existe: o Prisma gera `UserCreateInput` a partir do model `User`.
  create(data: Prisma.UserCreateInput): Promise<User>

  // Estes contratos evitam que a implementação tenha métodos sem tipo de retorno compatível.
  findByEmailOrUsername(email: string, username: string): Promise<User | null>
  findBy(where: Prisma.UserWhereInput): Promise<User | null>
}
