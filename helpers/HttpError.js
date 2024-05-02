const messageList = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
}

export default class HttpError extends Error {
    constructor(status, message) {
        super()
        this.status = status;
        this.message = message || messageList[status] || "Server error";
    }
}