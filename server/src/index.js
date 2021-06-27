const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const { authenticate } = require('./middlewares/auth');
const { MONGO_ATLAS_URI } = require('../config');

//initializations
const app = express();
require('dotenv').config();

//settings
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(morgan('dev'));
app.use(cors());

//routes
app.use('/graphql', authenticate, graphqlHTTP({
    schema,
    graphiql: true
}));

//starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port: ' + app.get('port'));

    //connect to db
    mongoose.connect(MONGO_ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('--> Atlas DB Connected ✅.'))
      .catch(err => console.log(err));
});
