import { GraphQLServer } from 'graphql-yoga';

//  Scalar types - String, Boolean, Int, Float, ID

// Demo user data
const users = [{
    id: '1',
    name: 'Arisa',
    email: 'arisa@example.com',
    age: 31
}, {
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com',
}, {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com',
}]

// Dummy posts data
const posts = [{
    id: '1',
    title: 'Happy Feet',
    body: 'It is a movie about penguins',
    published: true,
    author: '1'
}, {
    id: '2',
    title: 'Frozen',
    body: 'Disney Movie created by Pixar',
    published: true,
    author: '1'
}, {
    id: '3',
    title: 'Lion King',
    body: 'Disney Movie about lion',
    published: true,
    author: '2'
}]



//  Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }
`

//  Resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            }

            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts
            }

            return posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());

                return isTitleMatch || isBodyMatch;
            })
        },
        me() {
            return {
                id: '1234456',
                name: 'Mike',
                email: 'mike@gmail.com',
                age: 28
            }
        },
        post() {
            return {
                id: '999999',
                title: 'My First Post',
                body: 'This is a body',
                published: false
            }
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
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
