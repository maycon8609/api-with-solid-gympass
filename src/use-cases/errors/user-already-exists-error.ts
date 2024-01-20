export class UserAlreadyExistsError extends Error {
  constructor(message?: string) {
    const errorMessage = message ?? 'E-mail already exists.'
    super(errorMessage)
  }
}
