export class MaxNumberOfCheckInsError extends Error {
  constructor(message?: string) {
    const errorMessage = message ?? 'Max number of check-ins reached.'
    super(errorMessage)
  }
}
