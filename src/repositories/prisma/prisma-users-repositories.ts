import type { Prisma, User } from '@prisma/client'
import { prisma } from '@/libs/prisma.js'
import type { UsersRepositories } from '../users-repositories.js'

/**
 * Implementacao concreta de `UsersRepositories` usando o Prisma.
 *
 * Problemas que estavam quebrando este arquivo:
 * 1. Faltava a chave `{` que abre o corpo da classe. Sem ela o TypeScript lia
 *    `UsersRepositories async create(...)` como continuacao da clausula
 *    `implements`, gerando "A class can only implement an identifier/
 *    qualified-name" e "Unexpected token. A constructor, method... was expected".
 * 2. As assinaturas dos metodos estavam sem os parenteses e sem os `:` dos
 *    parametros (ex.: `async create(data Prisma.UserCreateInput)`), o que
 *    disparava varios "',' expected" e "Cannot find name 'async'".
 * 3. Como a classe ficava sintaticamente invalida, ela nao "implementava" mais
 *    a interface -> por isso o `register.controller.ts` recusava
 *    `new PrismaUsersRepository()` ("missing properties create, findBy...").
 */
export class PrismaUsersRepository implements UsersRepositories {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data })
  }

  async findByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<User | null> {
    return prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    })
  }

  async findBy(where: Prisma.UserWhereInput): Promise<User | null> {
    return prisma.user.findFirst({ where })
  }
}
