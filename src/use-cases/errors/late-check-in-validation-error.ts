export class LateCheckInValidationError extends Error {
  constructor(message?: string) {
    const errorMessage =
      message ??
      'The check-in can only be validated until 20 minutes of its creation.'
    super(errorMessage)
  }
}
