module.exports = class ApiError extends Error {
    status;
    message;
    errors;

    constructor(status, message, errors) {
        super();
        this.status = status;
        this.message = message;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'user is not authorized')
    }

    static NotFoundError() {
        return new ApiError(404, 'Page is not found')
    }

    static BadRequest(message, errors = []) {
        return new ApiError(404, message, errors)
    }

    static Internal(message, errors = []) {
        return new ApiError(500, message, errors)
    }

    static Forbidden(message, errors = []) {
        return new ApiError(403, message, errors)
    }

    static ServiceUnavailableError(message, errors = []) {
        return new ApiError(503, message, errors)
    }

    static BadGatewayError(message, errors = []) {
        return new ApiError(502, message, errors)
    }
}