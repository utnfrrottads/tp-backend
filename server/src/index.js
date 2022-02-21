const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const { authenticate } = require('./middlewares/auth');

const dotenv = require('dotenv');
dotenv.config();

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

//starting the server
app.listen(process.env.PORT, () => {
    console.log('Server on port: ' + process.env.PORT);

    //sockets
    require('./sockets/socketMessages');

    //connect to db
    mongoose.connect(process.env.MONGO_ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('--> Atlas DB Connected ✅.');

            //elasticsearch
            require('./elasticsearch/configElasticsearch');
        })
        .catch(err => console.log(err));
});
