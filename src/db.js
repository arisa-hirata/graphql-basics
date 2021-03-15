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

const db = {
  users,
  posts,
  comments
}

export { db as default }
