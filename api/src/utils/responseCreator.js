const responseCreator = (data) => {
    if (data instanceof Array) {
        return {
            status: 200,
            errors: [],
            data: data
        };
    }

    return {
        status: 200,
        errors: [],
        data: [data]
    };
};


module.exports = responseCreator;