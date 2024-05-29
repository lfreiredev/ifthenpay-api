export class ApiResponseException<T> extends Error {
  data: T;

  constructor(message: string, data: T) {
    super(message);
    this.data = data;
  }
}