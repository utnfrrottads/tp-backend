module.exports = app =>{
    app.db.sequelize.sync({alter:true})
        .then(()=>{
            app.listen(app.get('port'),()=>{
                console.log('Server on port', app.get('port'));
            });
        })
        .catch(error =>{
            console.log('ERROR AL INICIAR EL SERVIDOR',error);
        });
};
