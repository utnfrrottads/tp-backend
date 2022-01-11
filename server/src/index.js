const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const { authenticate } = require('./middlewares/auth');
const { PORT, MONGO_ATLAS_URI } = require('../config');

//initializations
const app = express();

//middlewares
app.use(morgan('dev'));
app.use(cors());

//routes
app.use('/graphql', authenticate, graphqlHTTP({
    schema,
    graphiql: true
}));

//socket
require('./socket');

//starting the server
app.listen(PORT, () => {
    console.log('Server on port: ' + PORT);

    //connect to db
    mongoose.connect(MONGO_ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('--> Atlas DB Connected ✅.');

            //connect to elasticsearch
            require('./elasticsearch');
            require('../configElasticsearch');
        })
        .catch(err => console.log(err));
});
