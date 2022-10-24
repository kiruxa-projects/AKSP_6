const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors');
const { buildSchema } = require('graphql');
const { readFileSync } = require('fs');

const schemaString = readFileSync('./schema.graphql', { encoding: 'utf8' });

const schema = buildSchema(schemaString);

const allBooks = [
    {
        id: '0',
        title: 'KGBT+',
        description: '"Вбойщик KGBT+ (автор классических стримов «Катастрофа», «Летитбизм» и других) известен всей планете как титан перформанса и духа.',
        author: "Виктор Пелевин"
    },
    {
        id: '1',
        title: 'Doctor Who: Placebo Effect',
        description: '123',
        author: "Gary Russell"
    }
];

const root = {
    getAllBooks: () => {
        return allBooks;
    },
    getBook: params => {
        return allBooks.find(({ id }) => params.id == id);
    },
    createBook: ({input}) => {
        let book = {
            id: allBooks.length + 1,
            description:  input.description,
            title: input.title,
            author: input.author
        }
        allBooks.push(book);

        return book;
    }
};


const app = express();
app.use(cors());
app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
    })
);

app.listen(5000,()=>{
    console.log('Сервер заработал на порту 5000');
});

