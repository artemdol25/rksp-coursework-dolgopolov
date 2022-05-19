require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');
const path = require('path');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();

const publicPath = path.join(__dirname, './frontend', 'build');

const port = process.env.PORT || 8000;
const mongodbUri = process.env.MONGODB_URI || 'mongodb+srv://artemdol:4sAZ1emHfSsUHkr0@cluster0.l6zpr.mongodb.net/events-react-dev?retryWrites=true&w=majority';

app.use(bodyParser.json());

app.use(express.static(publicPath));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
});

app.use(isAuth);

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
 });

app.use(
    '/graphql', 
    graphqlHTTP({
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
        graphiql: true
    })
);

mongoose.connect(mongodbUri)
.then(() => {
    app.listen(port);
})
.catch(err => {
    console.log(err);
});