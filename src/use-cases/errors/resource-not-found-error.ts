export class ResourceNotFoundError extends Error {
  constructor(message?: string) {
    const errorMessage = message ?? 'Resource not found.'
    super(errorMessage)
  }
}
