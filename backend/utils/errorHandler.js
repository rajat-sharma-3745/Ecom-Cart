class ApiError extends Error {
    constructor(message = "Something went wrong", statusCode, stack = "", errors = []) {
        super(message);
        this.errors = errors;
        this.message = message;
        this.statusCode = statusCode;
        this.data = null;
        this.success = false
    
    if(stack) {
        this.stack = stack;
    }
    else{
    Error.captureStackTrace(this, this.constructor);
    }
}
}

export {ApiError}