import {
  ValidationError,
  NotFoundError,
  ServerError,
  UnauthorizedError,
  ForbiddenError,
  CustomError,
} from '@throws/errors';

/**
 * Создает ошибку 400 Bad Request
 * @param {string} message Сообщение об ошибке
 * @returns {ValidationError} Ошибка валидации
 */
function createValidationError(message: string): ValidationError {
  return new ValidationError(message);
}

/**
 * Создает ошибку 404 Not Found
 * @param {string} message Сообщение об ошибке
 * @returns {NotFoundError} Ошибка 404 Not Found
 */
function createNotFoundError(message: string): NotFoundError {
  return new NotFoundError(message);
}

/**
 * Создает ошибку 500 Internal Server Error
 * @param {string} message Сообщение об ошибке
 * @param {Error|null} originalError Оригинальная ошибка
 * @returns {ServerError|Error} Ошибка сервера или оригинальная ошибка
 */
function createServerError(
  message: string,
  originalError: Error | null = null,
): ServerError | Error {
  // Если оригинальная ошибка уже имеет код статуса, возвращаем её
  if (originalError && 'statusCode' in originalError) {
    return originalError;
  }
  return new ServerError(message, originalError);
}

/**
 * Создает ошибку 401 Unauthorized
 * @param {string} message Сообщение об ошибке
 * @returns {UnauthorizedError} Ошибка 401 Unauthorized
 */
function createUnauthorizedError(message: string): UnauthorizedError {
  return new UnauthorizedError(message);
}

/**
 * Создает ошибку 403 Forbidden
 * @param {string} message Сообщение об ошибке
 * @returns {ForbiddenError} Ошибка 403 Forbidden
 */
function createForbiddenError(message: string): ForbiddenError {
  return new ForbiddenError(message);
}

export {
  createValidationError,
  createNotFoundError,
  createServerError,
  createUnauthorizedError,
  createForbiddenError,
  CustomError,
};
