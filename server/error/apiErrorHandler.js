const ApiError = require("./ApiError");

function apiErrorHandler(err, req, res, next){
    if(err instanceof ApiError){
        res.status(err.code).json({error: err.msg});
        return;
    }
    if(err.message.includes('User validation failed')){
        res.status(400).json({error: 'Hay un campo obligatorio incompleto o un dato erróneo.'});
        return;
    }
    if(err.message.includes('Cast to ObjectId failed for value')){
        res.status(404).json({error:'Objeto no encontrado.'})
    }
    console.log(err);
    res.status(500).json({error: 'Algo salió mal.'});
}

function apiErrorHandler(req, res, next){
    res.status(404).json({error: 'La dirección solicitada no se encuentra. Cominíquese con un administrador'});
}

module.exports = apiErrorHandler;