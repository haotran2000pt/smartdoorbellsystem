import { StatusCodes } from "http-status-codes";

class ApiError extends Error {
  status: StatusCodes;
  constructor(status = StatusCodes.INTERNAL_SERVER_ERROR, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default ApiError;
