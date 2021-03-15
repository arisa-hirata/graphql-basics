const Query = {
    users(parent, args, { db }, info) {
        if (!args.query) {
            return db.users
        }

        return db.users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase())
        })
    },
    posts(parent, args, { db }, info) {
        if (!args.query) {
            return db.posts
        }

        return db.posts.filter((post) => {
            const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
            const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());

            return isTitleMatch || isBodyMatch;
        })
    },
    comments(parents, args, { db }, info) {
        return db.comments
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
}

export { Query as default }
