const errorMessageFormatter = (error) => {
    let errorArray = [];

    error.forEach(error => {
        let errorObject = {};
        errorObject.field = error.param;
        errorObject.message = error.msg;
        errorArray.push(errorObject);
    });

    return {
        status: 400,
        errors: errorArray,
        data: {}
    };
};


module.exports = {
    errorMessageFormatter
};