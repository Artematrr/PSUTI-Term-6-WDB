class CustomError extends Error {
  name: string;
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 404);
  }
}

class ServerError extends CustomError {
  originalError: Error | null;

  constructor(message: string, originalError: Error | null = null) {
    super(message, 500);
    this.originalError = originalError;
  }
}

class ValidationError extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}

class UnauthorizedError extends CustomError {
  constructor(message: string = 'Не авторизован') {
    super(message, 401);
  }
}

class ForbiddenError extends CustomError {
  constructor(message: string = 'Доступ запрещен') {
    super(message, 403);
  }
}

export {
  CustomError,
  NotFoundError,
  ServerError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
};
