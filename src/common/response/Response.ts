export class Response<T = undefined> {
  status: number;
  message: string;
  data: T;

  constructor(status: number, message: string, data?: T) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  public static of<T>(status: number, message: string, data?: T) {
    return new Response(status, message, data);
  }

  public static ok<T>(message: string, data?: T) {
    return this.of(200, message, data);
  }
}
