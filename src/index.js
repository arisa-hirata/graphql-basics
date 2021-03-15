import { GraphQLServer } from 'graphql-yoga';
import { v4 as uuidv4 } from 'uuid';

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
    id: '11',
    title: 'Happy Feet',
    body: 'It is a movie about penguins',
    published: true,
    author: '1'
}, {
    id: '12',
    title: 'Frozen',
    body: 'Disney Movie created by Pixar',
    published: true,
    author: '1'
}, {
    id: '13',
    title: 'Lion King',
    body: 'Disney Movie about lion',
    published: true,
    author: '2'
}]

const comments = [
    {
        id: '21',
        text: 'This is great!!',
        author: '1',
        post: '11'
    },
    {
        id: '22',
        text: "It's not bad.",
        author: '3',
        post: '11'
    },
    {
        id: '23',
        text: "It's the worst.",
        author: '2',
        post: '13'
    },
    {
        id: '24',
        text: "Amazing!!!!",
        author: '1',
        post: '12'
    },
]



//  Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments(query: String): [Comment!]!
        me: User!
        post: Post!
        comment: Comment!
    }

    type Mutation {
        createUser(name: String!, email: String!, age: Int) : User!
        createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
        createComment(text: String!, author: ID!, post: ID!): Comment!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
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
        comments(parents, args, ctx, info) {
            return comments
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
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some((user) => user.email === args.email)

            if (emailTaken) {
                throw new Error('Email taken');
            }

            const user = {
                id: uuidv4(),
                ...args
            }

            users.push(user)

            return user
        },
        createPost(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.author)

            if (!userExists) {
                throw new Error('User not found')
            }

            const post = {
                id: uuidv4(),
                ...args
            }

            posts.push(post)

            return post;
        },
        createComment(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.author)
            const postExists = posts.some((post) => post.id === args.post && post.published)

            if (!userExists || !postExists) {
                throw new Error('Unable to fin user and post')
            }

            const comment = {
                id: uuidv4(),
                ...args
            }

            comments.push(comment)

            return comment;
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.post === parent.id
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => {
                return post.id === parent.post
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.author === parent.id
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
