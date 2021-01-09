import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import bodyParser = require('body-parser');
import * as fireorm from 'fireorm';

admin.initializeApp(functions.config().firebase);
export const db = admin.firestore();
fireorm.initialize(db);

export const app = express();

// support json encoded bodies
app.use(bodyParser.json()); 
// support encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors({ origin: true }));