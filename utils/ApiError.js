class ApiError extends Error {
    constructor(status, publicMessage, ...params) {
        super(...params)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }

        this.name = 'ApiError';
        this.status = status;
        this.publicMessage = publicMessage;
    }
}

module.exports = ApiError;