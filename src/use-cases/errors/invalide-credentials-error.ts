export class InvalideCredentialsError extends Error {
  constructor(message?: string) {
    const errorMessage = message ?? 'Invalide credentials.'
    super(errorMessage)
  }
}
