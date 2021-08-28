enum ErrorNames {
  FileInputError = 'FileInputError'
}

export class FileInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ErrorNames.FileInputError;
  }
}

export const handleError = (error: Error | any, defaultMsg: string) => {
  switch (error.name) {
    case ErrorNames.FileInputError:
      console.error(error.message);
      break;
    default:
      console.error(defaultMsg);
  }
}