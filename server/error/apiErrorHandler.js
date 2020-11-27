const ApiError = require("./ApiError");

function apiErrorHandler(err, req, res, next){
    if(err instanceof ApiError){
        res.status(err.code).json({error: err.msg});
        return;
    }
    if(err.message.includes('validation failed:')){
        res.status(400).json({error: 'Hay un campo obligatorio incompleto o un dato erróneo.'});
        return;
    }
    if(err.message.includes('Cast to ObjectId failed for value')){
        res.status(404).json({error:'Objeto no encontrado.'});
        return;
    }
    console.log(err);
    res.status(500).json({error: 'Algo salió mal.'});
    return;
}

module.exports = apiErrorHandler;