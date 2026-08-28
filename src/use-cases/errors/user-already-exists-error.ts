export class UserAlreadyExistsError extends Error {
  constructor() {
    super('Esse usuáro já existe com nome ou email no banco de dados.')
  }
}
