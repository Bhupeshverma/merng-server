const { ApolloServer , PubSub} = require('apollo-server');
const gql = require(`graphql-tag`);
const mongoose = require('mongoose');


const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const { MONGODB }  = require('./config.js')

const pubsub = new PubSub();
const PORT = process.env.PORT || 5000;
const server = new ApolloServer({
    cors: {
        origin: '*'
    },
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub })
})

mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDb connected');
        return server.listen({ port: PORT });
    })
    .then(res => {
        console.log(`Server running at ${res.url}`);
    })
    .catch(err => {
        console.error(err);
    })

    
