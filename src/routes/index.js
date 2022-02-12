module.exports = app =>{
    app.get('/', (req, res)=>{
        res.json({status: 'E-commerce API'});
    });
};