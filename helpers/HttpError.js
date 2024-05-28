const messageList = {
  400: "Bad Request",
  401: "Not authorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

class HttpError extends Error {
  constructor(status, message = messageList[status]) {
    super(message);
    this.status = status;
  }
}

export { HttpError };
