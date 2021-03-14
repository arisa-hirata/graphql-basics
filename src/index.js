import { GraphQLServer } from 'graphql-yoga';

//  Scalar types - String, Boolean, Int, Float, ID

//  Type definitions (schema)
const typeDefs = `
    type Query {
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
    }
`

//  Resolvers
const resolvers = {
    Query: {
        title() {
            return 'dress'
        },
        price() {
            return 99.9
        },
        releaseYear() {
            return 2021
        },
        rating() {
            return 4.8
        },
        inStock() {
            return true
        }

    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log('The server is up!');
});
