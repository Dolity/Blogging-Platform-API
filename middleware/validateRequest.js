const validateRequest = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error, value} = schema.validate(req[property]);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        } else {
            req[property] = value;
            next();
        }
    }
}

module.exports = validateRequest