class ApiError extends Error {
    constructor(status, publicMessage, ...params) {
        super(...params)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }
        // Log this.stack
        this.name = 'ApiError';
        this.status = status;
        this.publicMessage = publicMessage;
    }
}

module.exports = ApiError;