const errorMiddleware = (error, request, response, next) => {
    const status = error.status || 500;
    const message = error.message || 'BACKEND ERROR';
    const success = error.success || false;
    const extraDetails = error.extraDetails || 'Error From Backend';

    return response.status(status).send({ success, message, extraDetails });

}

module.exports = errorMiddleware;