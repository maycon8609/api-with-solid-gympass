export class MaxDistanceError extends Error {
  constructor(message?: string) {
    const errorMessage = message ?? 'Max distance reached.'
    super(errorMessage)
  }
}
