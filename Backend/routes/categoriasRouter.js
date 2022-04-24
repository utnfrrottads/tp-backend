var express = require('express');
var router  = express.Router();

/* GET categorias */
router.get('', function(req, res, next){
    res.json({categorias : [
        {
            id: 1,
            descripcion: 'categoria 1'
        },
        {
            id: 2,
            descripcion: 'categoria 2',
        },
    ]});
});

module.exports = router;