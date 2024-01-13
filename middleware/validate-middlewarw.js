const validate = (schema) => async (request, response, next) => {
    try {
        const parseBody = await schema.parseAsync(request.body);
        request.body = parseBody;
        next();
    } catch (err) {
        // response.status(400).send({ msg: err.errors[0].message });
        const errors = {
            status: 422,
            message: err.errors[0].message,
        };
        next(errors);
    }
}

module.exports = validate;