import { VALIDATION } from '../config/constants';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validateNoteTitle = (title: string): void => {
  if (!title || typeof title !== 'string') {
    throw new ValidationError('El título es requerido');
  }

  const trimmedTitle = title.trim();
  
  if (trimmedTitle.length < VALIDATION.TITLE_MIN_LENGTH) {
    throw new ValidationError(
      `El título debe tener al menos ${VALIDATION.TITLE_MIN_LENGTH} caracteres`
    );
  }

  if (trimmedTitle.length > VALIDATION.TITLE_MAX_LENGTH) {
    throw new ValidationError(
      `El título no puede exceder ${VALIDATION.TITLE_MAX_LENGTH} caracteres`
    );
  }
};

export const validateNoteContent = (content: string): void => {
  if (!content || typeof content !== 'string') {
    throw new ValidationError('El contenido es requerido');
  }

  const trimmedContent = content.trim();

  if (trimmedContent.length < VALIDATION.CONTENT_MIN_LENGTH) {
    throw new ValidationError('El contenido no puede estar vacío');
  }

  if (trimmedContent.length > VALIDATION.CONTENT_MAX_LENGTH) {
    throw new ValidationError(
      `El contenido no puede exceder ${VALIDATION.CONTENT_MAX_LENGTH} caracteres`
    );
  }
};